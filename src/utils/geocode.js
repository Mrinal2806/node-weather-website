const request = require("postman-request")

const geocode = (address, callback) => {
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibXJpbmFsOTEiLCJhIjoiY2tjcDl3ZXVmMHI4YTJ5bzJqZnUweTg2MyJ9.57_E5T8QVnvbBzR-soJ-IQ"

request({url: url, json: true}, (error, response) => {
    if(error){
        callback("unable to connect to location services", undefined)
    }else if (response.body.features.length === 0){
        callback("unable to find location, try another search", undefined)
    }else{
       callback(undefined, {
           latitude: response.body.features[0].center[0],
           longitude: response.body.features[0].center[1],
           location: response.body.features[0].place_name
       })
    }

})
}

module.exports = geocode