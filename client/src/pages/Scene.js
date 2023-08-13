import React, { useState } from 'react'
import QueryResult from '../components/query-results';
import { GET_ME, QUERY_USER,GET_STORY, GET_SCENE } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';


// import background from "../../client/public/assets/ocean.jpg"

const id = "64d90f23088412a44be28b6e"

const Scene = () => {
  
    const {sceneId} = useParams()
    const {loading, error, data } = useQuery(GET_SCENE,{
        varibles: {sceneId}
    })
   

       

    return (
        <>
        <QueryResult error={error} loading={loading} data={data}></QueryResult>
       <div style={{ backgroundImage: `url(/ocean.jpg)`, paddingBottom: "1000px" , backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <h2>{}</h2>

        <div className="card m-5" style={{width: "350px"}}>
  <div className="card-body">
     {}       
  </div>
</div>
</div> 
        </>
    )
}

export default Scene
