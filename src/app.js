const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: ' Andreas Vargas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andreas Vargas'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Hello, this is some helpful message',
        title: 'Help',
        name: 'Andreas Vargas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location='sovata' } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
            })
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article is not available, please come back later!',
        title: '404',
        name: 'Andreas Vargas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'The page you have requested doesn\'t exist',
        title: '404',
        name: 'Andreas Vargas'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

