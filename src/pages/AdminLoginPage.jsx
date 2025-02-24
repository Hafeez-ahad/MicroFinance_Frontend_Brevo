import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminLoginC from "../components/adminLogin/adminLogin";
import { postReq } from "../Api/axios";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  // for loader
  const [loader1, setLoader1] = useState(false);
// for checking token inlocalStorage 
const checkToken = () =>{
  const checkToken = localStorage.getItem('token');
  if(checkToken){
    toast.success('Already Logged in as ADMIN');
    navigate('/adminpage')
  }

}

useEffect(()=>{
  checkToken()
},[])

// goHome
const goHome = () =>{
  navigate('/')
}

  const getDatafromComponent = async (sendingData) => {
    setLoader1(true);
   
    if (sendingData) {
      const response = await postReq("/proceed/adminlogin", sendingData);
      response && setLoader1(false);
      const token = response.data.token;

      if (token) {
        navigate('/adminpage');
        console.log(token);
        localStorage.setItem('token', token)
      } else {
        setLoader1(false);
      }
    }
  };

  return (
    <div>
<div className="btn-loginAdmin">
<Button onClick={()=>goHome()} >Go Home</Button>
</div>

      <AdminLoginC loader1={loader1} sendingData={getDatafromComponent} />
    </div>
  );
};

export default AdminLoginPage;
