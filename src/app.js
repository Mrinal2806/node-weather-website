const express = require('express')
const path = require('path')
const request = require('postman-request')
const hbs = require('hbs')
const { registerHelper } = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))


const app = express()

const port = process.env.PORT || 406


//define paths for express config
const publicdirpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')


// set up handle bars and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//use static directory to serve
app.use(express.static(publicdirpath))



// app.com
// app.com/help
// app.com/about

//what is shown on the browser

// app.get('', (req, res) => {
//     res.send('hello express')

// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Mrinal",
//         age: 27
//     },{
//         name: "Andrew"
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>about section</h1>')
   
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mrinal deep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Mrinal deep'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "help",
        name: 'Mrinal'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'})
     }
     geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
         if(error){
             return res.send({error})
         }
         forecast(latitude, longitude, (error, forecastdata) =>{
             if(error) {
                 return res.send({error})
             }
             res.send({
                 forecast: forecastdata,
                 location,
                 address: req.query.address
             })
         })
     })
     // res.send([{
    //     address: req.query.address
    // }])
})

app.get('/product', (req, res) =>{
    if(!req.query.search){
       return res.send({
           error: 'you must provide a search item'})
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'help article not found',
        name: 'Mrinal Deep'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found',
        name: 'Mrinal Deep'
    })
})

//turn the web server up

app.listen(port, () => {
    console.log('server is up on port', port)
})


