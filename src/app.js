const express = require('express')
const ejs = require('ejs')
const path = require('path')
const commonFunctions = require('./utils/commonFunctions')


const app = express()
const port = process.env.port || 3000

const basePath = path.join(__dirname, '../public')
app.use(express.static(basePath))

app.set('view engine', 'ejs') 


app.get('/', (req, res) => {
    commonFunctions.getAllProjects()
    .then((projects)=>{
        let array = new Array()
        projects.forEach((data, index)=>{
            array[index] = data.launch_year
        })
        let uniqueYears = Array.from(new Set(array))
        //render ejs template
        res.render('index', {projects:{projects,uniqueYears}, error: ''})
    }).catch((error)=>{
        res.render('index', {projects: '', error})
    })  
})

app.get('/filters', (req, res)=>{
    
    var prms = new URLSearchParams(req.query)
    commonFunctions.getFilteredProjects(prms.toString())
    .then((projects)=>{
        //render ejs template
        res.render('filtered', {projects, error: ''})
    }).catch((error)=>{
        res.render('filtered', {projects: '', error})
    })  
})



//Express Server
app.listen(port, ()=>{
    console.log('Server running on port '+ port)
})