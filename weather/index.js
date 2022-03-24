const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const URL = 'https://api.openweathermap.org/data/2.5/weather?q='

const fetchWeather = async searchText => {
  const url = `${URL}${searchText}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    return { Error: error.message }
  }
}

router.get('/', (req, res) => {
  res.json({ success: 'Hello Weather!' })
})

router.get('/:searchText', async (req, res) => {
  const { searchText } = req.params
  const data = await fetchWeather(searchText)
  res.json(data)
})

module.exports = router
