const request = require("postman-request");

const forcast = (lattitude,longtitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=d905c0a8af23ed54c850058bced66a18&query="+encodeURIComponent(lattitude)+","+encodeURIComponent(longtitude)
    request({url,json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect weather service ",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,
                "Temperature Description is "+ body.current.weather_descriptions[0]+". Current temperature is "+
                body.current.temperature
                )
        }
    })

}

module.exports = forcast;