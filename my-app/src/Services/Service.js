import React from 'react'
import axios from 'axios'
export default class ValidateServiceSingleton{


    static getImage = (image) => {
        const data = new FormData();
        data.append('file', image)
        axios.post("http://localhost:5000/upload", data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => {
            console.log(res)
            console.log(res.statusText)
        })
    }



}