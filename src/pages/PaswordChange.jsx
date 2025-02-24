  import React, { useEffect } from 'react'
  import PasswordForm from '../components/newPassform/Newpass.jsx'
  import { postReq } from '../Api/axios.js';
  import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

  const PaswordChange = () => {
    const navigate = useNavigate();
    // for loader 
      const [loader1,setLoader1]  = useState(false)
    


    const getDatafromComponent = async (sendingData) => {
      // forloader 
      setLoader1(true)

      if (sendingData) {
        const response = await postReq('/proceed/newpass', sendingData);
        const idFromResponce = response?.data?.id 
        if (response?.data?.status == 200) {
          console.log(200)
          navigate(`/userdetail/${idFromResponce}`);
        }
        else{
          setLoader1(false)
        }
      }
    };
  return (
    <div>
     < PasswordForm loader1={loader1}  sendingData={getDatafromComponent} />
    </div>
  )
}

export default PaswordChange
