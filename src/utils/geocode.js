const request = require('request')
const geocode = (address, callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+'.json?access_token=pk.eyJ1Ijoia2FwaWwyMCIsImEiOiJja2YydndhcDMxNWN5MzJwNHprNnhsMnM4In0.jZ4ZZdoMIiy6n7OK2uyAZA&limit=1'
    
    request({url: geocodeURL, json: true}, (error, response)=>{
        if(error){
            callback('error in the network', undefined); 
        }
        else if(response.body.features.length == 0){
            callback('somthing is wrong>', undefined); 
        }
        else{
            const responseData = response.body.features[0].center;
            callback(undefined, {
                latitude:responseData[0],
                longitude: responseData[1],
                location: response.body.features[0].place_name
            })
        }
    })
 }
 module.exports = geocode