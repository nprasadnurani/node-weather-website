request = require('request')

const forecast = (long,lat,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3696d2e5dfac40a4cd7b024c48c26b00&query='+long+','+lat+'&units=f'
    
    request({url,json:true},(error,{body} ={}) => {
          
          if (error)
          {
              callback('unable to connect weather service!',undefined)
    
          } else if(body.error)
          {
              callback('Location not found, try another one', undefined)
    
          } else {
                callback(undefined, body.current.weather_descriptions[0] + '. Current temperature is:' + body.current.temperature + ' but feels like: ' + body.current.feelslike + '. The humidity for today is ' + body.current.humidity )
          }
    })
    }

    
module.exports = forecast