// api key : 82005d27a116c2880c8f0fcb866998a0

const $notification = document.querySelector('.notification')
const $weatherIcon = document.querySelector('.weather-icon')
const $tempElement = document.querySelector('.temperature-value p')
const $descrElement = document.querySelector('.temperature-description p')
const $locationElement = document.querySelector('.location p')


const weather = {}

weather.temperature = {
  unit: 'celsius'
}

const KELVIN = 273
const key = '82005d27a116c2880c8f0fcb866998a0'


if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
  $notification.style.display = 'block'
  $notification.innerHTML = '<p>Браузеру не удалось определить Ваше местоположение</p>'
}

function setPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  getWeather(latitude, longitude)
}

function showError() {
  $notification.style.display = 'block'
  $notification.innerHTML = `<p>${error.message}</p>`
}

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
  
  fetch(api)
    .then(function(response) {
      let data = response.json()
      return data
    })
    .then(function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN)
      weather.description = data.weather[0].description
      weather.iconId = data.weather[0].icon
      weather.city = data.name
      weather.country = data.sys.country
    })
    .then(function(){
      displayWeather()
    })
}

function displayWeather() {
  $weatherIcon.innerHTML = `<img src = 'icons/${weather.iconId}.png'/>`
  $tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`
  $descrElement.innerHTML = weather.description
  $locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

function celsiusToFarenheit(temperature) {
  return (temperature*9/5)+32
}

$tempElement.addEventListener('click', function(){
if(weather.temperature.value === undefined) return
if (weather.temperature.unit === 'celsius') {
  let farenheit = celsiusToFarenheit(weather.temperature.value)
  farenheit = Math.floor(farenheit)
  $tempElement.innerHTML = `${farenheit} °<span>F</span>`
  weather.temperature.unit = 'farenheit'

} else {
  $tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`
  weather.temperature.unit = 'celsius'
}
})