import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getReq, postReq } from "../../Api/axios";
import CustomizedTables from "./muiTable/MuiTable1";
import { passwordGenerator } from "../../../../Backend/Helper/randomPassword";
import { ThreeDots } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router";

const AdminC = () => {
  const [users, setUsers] = useState(""); // State to store the array of user objects
  const navigate = useNavigate()
  // for loader  
  const [loader1,setLoader1] = useState(true)
  

  const apiCall = async () => {
  
    try {
      const response = await getReq("/proceed/");
      (response && setLoader1(false))
      console.log(response)
      const allData = response?.data?.data; // Array of user objects
      setUsers(allData); // Store the data in state

      
    } 
    catch (e) {
      toast.error(e.message);
    }
  };
//  for approve 
  const getingDataForApprove = async (data, row) => {
    const inputObject = data;
    const allData = row;
    console.log(allData,'approve')
    const tokenGenerate = passwordGenerator()
    const forSend = {
      id:row._id,
      slotDetails: data.slotDetails,
      token:tokenGenerate



    }
    const responce = await postReq("/proceed/admin", forSend);
    console.log(responce.data);
( (responce.status == 201)     &&     apiCall())

  };
  // for reject
  const getingDataFoReject = async (data, row) => {
    console.log('reject')
    const forSend = {
      id:row._id,
    }

    const responce = await postReq('/proceed/adminReject',forSend);
    console.log(responce.data);
   ( (responce.status == 201)     &&     apiCall())

    
  };
// FOR TOKEN 
  const getTokenLocalStorage = ()=>{
    const getToken = localStorage.getItem('token');
    console.log(getToken)
    if(!getToken){
      toast.error(`Admin Athorization Invalid`  )
      navigate('/adminLogin')
    }
    else{
      apiCall()
    }
  }

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  // logoutfun 
  const logoutfun = () =>{
    console.log('logout');
    localStorage.removeItem('token');
    navigate('/')
  }
  return (

    <div>
    {loader1 ? (
      <ThreeDots
        visible={true}
        height="150"
        width="150"
        color="blue"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperClass="loader-div3"
      />
    ) : users ? (
      <CustomizedTables 
        rows={users} 
        onApproveData={getingDataForApprove} 
        onRejectData={getingDataFoReject} 
        logoutFunction={logoutfun}
      />
    ) : (
      <div className="No-data-div">No Data Record</div>
    )}
  </div>
  
   
  );
};

export default AdminC;
