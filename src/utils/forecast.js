const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c97791c398ccb94f6068dddaf1d23e74&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        //const {error: error1, current} = response.body
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search..', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%, and the wind speed is ' + body.current.wind_speed + ' mph.')
        }
    })
}
module.exports = forecast