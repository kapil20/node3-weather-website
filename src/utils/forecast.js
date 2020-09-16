const request = require('request')
const chalk = require('chalk')

const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a9065f9cd23de10ad3b495490873bf96&query=pleasanton&units=f'
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('error in the network', undefined); 
        } else if(response.body.error){
            callback('somthing is wrong>', undefined); 
        }
        else {
            const data = response.body.current;
            const currentTemp = data.temperature
            const feelslike = data.feelslike
            const current = "Its currently "+currentTemp + " degree out.";
            const feels = "It feels like "+feelslike;
            //callback(chalk.green.underline(current) + ' '+ chalk.red.underline.inverse(feels));
            console.log(current + feels)
            const forecastData = current + feels
            //callback(current + feels);
            
            callback(undefined, forecastData)           
        }
    })
}

module.exports = forecast;

