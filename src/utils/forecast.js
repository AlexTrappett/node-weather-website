const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5c9b5e5d2ec643190b7221c8827fd644/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const currentTemp = body.currently.temperature
            const rainChance = body.currently.precipProbability
            const dailySummary = body.daily.data[0].summary
            const forecastStr = dailySummary + ' It is currently ' + currentTemp + ' degrees out. There is a ' + rainChance + '% chance of rain'
            
            callback(undefined, forecastStr)
        }
    })
}

module.exports = forecast