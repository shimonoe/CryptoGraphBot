const axios = require('axios');
const endpoints = require('./endpoints');

async function getAPIAssets() {
    return await axios.get(endpoints.assets)
}

let res = await getAPIAssets()
    .then(function (response) {
        return response.data;
    })
    .catch(function (error){
        console.log(error);
        return error;
    });
console.log(res);
