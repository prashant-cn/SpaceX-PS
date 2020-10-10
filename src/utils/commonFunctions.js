const axios = require('axios').default

const getAllProjects = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100')
        .then((result)=>{
            resolve(result.data)
        }).catch((error)=>{
            reject(error)
        })
    })  
}

const getFilteredProjects= (query)=> {
    return new Promise((resolve, reject) => {
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100&'+query)
        .then((result)=>{
            resolve(result.data)
        }).catch((error)=>{
            reject(error)
        })
    }) 
}

module.exports= {
    getAllProjects,
    getFilteredProjects
}