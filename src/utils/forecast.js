const request = require("request");


const forecast = (lng, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=de0ca6f594db8e611d2322626287206d&query=${lat},${lng}.4233&units=f`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            // error first callback
            callback("currently you dont have access to API");
        }
        else if (response.body.error) {
            callback("unable to find the place");
        }
        else {
            callback(undefined, { description: response.body.current.weather_descriptions[0], temp: response.body.current.temperature, feelslike: response.body.current.feelslike })
        }
    })
}

module.exports = forecast;