const axios = require('axios').default

const getProjects= (query)=> {
    return new Promise((resolve, reject) => {
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100&'+query)
        .then((result)=>{
            resolve(result.data)
        }).catch((error)=>{
            reject(error)
        })
    }) 
}

const getYears = () => {
    return new Promise((resolve, reject)=>{
        axios.get('https://api.spaceXdata.com/v3/launches')
        .then((result)=>{
            let array = new Array()
            result.data.forEach((data, index)=>{
                array[index] = data.launch_year
            })
            let uniqueYears = Array.from(new Set(array))
            resolve(uniqueYears)
        }).catch((error)=>{
            reject(error)
        })
    })
}

module.exports= {
    getProjects,
    getYears
}