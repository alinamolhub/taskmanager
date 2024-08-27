import React,{ useEffect, useState,useContext } from 'react';
import axios from '../api/axios';
export const useDataSource =(entity,fetch=true)=> {
  const path = 'api/'.concat(entity);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(path);
        setData(response.data);
      } catch (error) {
        setData({error:true,message:error.response.data.message});


        //console.error(error)
      }
      setLoading(false);
    };
    if( loading && fetch){
      fetchData();
    }
    

  },[loading]);
  const create = async(entityObj) => {
    const { data: response } = await axios.post(path,entityObj);
    return response.data;
  }
  const update = async(resorce_id,data)=>{
     const { data: response } = await axios.put(path.concat('/'+resorce_id),data);
     return response.data;
  }
  const destroy = async(resorce_id)=>{
    await axios.delete(path.concat('/'+resorce_id));
  }

  return {data,loading,setLoading,create,setData,update,destroy};
};

