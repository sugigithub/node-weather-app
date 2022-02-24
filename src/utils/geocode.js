const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3VnYW55YTExNTUiLCJhIjoiY2t6dTBvaXA2MXY4MDJ3cGV6bjkxNHZ6byJ9.RCyzmlbryU_KKpL6uqcFNw&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect to loction services");
        }
        else if (!response.body.features.length) {
            callback("unable to find location");
        }
        else {
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitute:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;