const path = require('path')
const express = require('express')
const app = express() // express is not an object, it is a function
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(path.join(__dirname, '../public'))
//console.log(__filename)


app.set('view engine', 'hbs')

//define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'created by Kapil Kumar'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about',
        name: 'Created by Kapil Kumar+'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'This is the help page',
        title:'help',
        name:'Created by kapil kumar++'
    });
})


app.get('/weather', (req, res)=>{
    if(!req.query.address)
    return res.send({
        error: 'address is missing!!!!'
    })

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        console.log(latitude, longitude, location)
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
             if(error){
                console.log("kapil");
                 return res.send({error})
             }
            console.log("<<<<"+location)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})


app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'please provide search, its must'
        })
    }
    res.send({products: []})
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 help',
        name: 'Kapil Kumar',
        errorMessage: 'Help article not found'
    });
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: 404,
        name: 'Kapil Kumar',
        errorMessage: 'Page not found'
    });
})
app.listen(3000, ()=>{
    console.log('My server has started at port 3000');
})