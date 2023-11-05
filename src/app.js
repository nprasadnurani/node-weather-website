const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


hbs.registerPartials(path.join(__dirname,'../template/partials'))

//Define paths for Express config
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)






 app.get('',(req,res) =>{
     res.render('index',{
        title: 'Weather',
        name: ' Created by Prasad'
     })
 })
 app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Prasad'
    })
 })

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        message: " I am here to Help you",
        name: "Created by Prasad"
    })
})


 app.get('/weather', (req, res) => {
    console.log(req.query.location)
    if (!req.query.location)
    {
        return res.send({
            error: 'You must provide a location'
        })
    }
    
    geocode(req.query.location,(error,{lat,long,location} = {}) =>{
        if (error)
        {
           return res.send({
                error
           })
        }
        forecast(lat, long, (error, forecastdata) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                location: req.query.location,
                forecast: forecastdata
           
          })
    })

   
    })
 
 })

  app.get('/product',(req,res) => {
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
  })

 app.get('/help/*', (req,res) => {
    res.render('error', {
        title: "404",
        errMessage: "Help article not found",
         name: "Created by Prasad"
    })
   
 })

 app.get('*',(req,res) => {
    res.render('error',
    {
         title: "404",
         errMessage: "Page Not found ",
         name: "Created by Prasad"
    })
   })

 

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})