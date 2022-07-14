//import React, { useReducer, useEffect } from "react";
//import axios from "axios";
//import { Component } from "react";



//grabData (() => {
//   axios
//   .get('https://1qkgfpljs7.execute-api.ap-southeast-1.amazonaws.com/staging/getsurveylist')
//   .then(res => {
//       console.log(res)
//       dispatch({ type: 'FETCH_SUCCESS', payload: response.data})
//   })
//   .catch(error => {
//       dispatch({ type:'FETCH_ERROR'})
//   })

//}, [])



const initState = {
    surveys: [
        { "id": 1, "name": "Asif", "points":"2853 pts", "question":"10 Questions" }, 
        { "id": 2, "name": "Vatani",  "points":"1932 pts", "question":"10 Questions" }, 
        { "id": 3, "name": "Jonathan", "points":"1431 pts", "question":"10 Questions" },
        { "id": 4, "name": "Paul", "points":"1330 pts", "question":"10 Questions" }, 
        { "id": 5, "name": "Robert", "points":"1320 pts", "question":"10 Questions" },
        { "id": 6, "name": "Robert", "points":"1220 pts", "question":"10 Questions" },
        { "id": 7, "name": "Gwen", "points":"1190 pts", "question":"10 Questions" },
        { "id": 8, "name": "Emma", "points":"1020 pts", "question":"10 Questions" },
        { "id": 9, "name": "Sophia", "points":"950 pts", "question":"10 Questions" },
        { "id": 10, "name": "Mia", "points":"827 pts", "question":"10 Questions" }
    ]
}






const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                surveys: action.payload,
                error: ''
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                surveys: {},
                error: 'Something went wrong'

            }

        default:
            return state
    }
}

export default rootReducer;