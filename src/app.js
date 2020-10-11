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
    commonFunctions.getProjects()
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

app.get('/filtered', (req, res)=>{
    var prms = new URLSearchParams(req.query)
    commonFunctions.getProjects(prms.toString())
    .then((projects)=>{
        //render ejs template
        res.render('filtered', {projects, error: ''})
    }).catch((error)=>{
        res.render('filtered', {projects: '', error})
    })  
})

//if the link with filters is shared or is the first point of contact to app
app.get('/filters', async (req, res)=>{
    var prms = new URLSearchParams(req.query)
    const uniqueYears = await commonFunctions.getYears()
    commonFunctions.getFilteredProjects(prms.toString())
    .then((projects)=>{
        //render ejs template
        res.render('shared', {projects:{projects,uniqueYears}, error: ''})
    }).catch((error)=>{
        res.render('shared', {projects: '', error})
    })  
})



//Express Server
app.listen(port, ()=>{
    console.log('Server running on port '+ port)
})