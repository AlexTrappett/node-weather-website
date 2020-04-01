const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve express
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Brap Brap Pew Pew',
        name: 'Alex Trappett'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex Trappett'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to search'
        })
    }

    geocode(req.query.address, (error, { latitude , longitude, location } = {} ) => {
        //console.log('Error', error) 
        //console.log('Data', data)
        console.log(error) 
        if (error) { 
            return res.send({ error })  
        }  

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }        

            res.send({
                address:  req.query.address,
                location: location,
                forecast: forecastData
            })
        })    
    })
    

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:  []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alex Trappett',
        msg: 'Help message found here!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article not Found',
        name: 'Alex Trappett',
        msg: '404 - help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex Trappett',
        msg: '404 - ya noob get out of here'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})