const request = require('request')


const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHJhc2Fkbm4iLCJhIjoiY2xvaXI4bmduMG54MTJxcHFtdGZvZHQ4ZyJ9.Wpo3lpYZ8CqA6x2ySC7ktw&limit=1"
    request({url, json: true},(error,{body} ={}) => {
        if (error)
        {
            callback('unable to connect to location services!!',undefined)
        } else if (body.features.length === 0)  {
            callback('Location not found, Try another one',undefined)
        } else {
            callback(undefined,  {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
             
            })
        } 

    })
 

}






module.exports = geocode
    
