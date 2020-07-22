const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c2f7ac3d58deec50675fb76b487d8243&query=" + longitude + "," + latitude + "&units=m"

    request({/*url:*/ url, json: true}, (error, response) =>{
        if(error){
            callback("unable to connect to weather server", undefined)
        }else if(response.body.error){
            callback("cannot find the location", undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". it is currently " + response.body.current.temperature + " degrees out. and feels like " + response.body.current.feelslike + " degrees out")
        }

    })
}

module.exports = forecast