import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getReq, postReq } from "../../Api/axios.js";
import CustomizedTables from "./muiTable/MuiTable1";
import { ThreeDots } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router";
import { passwordGenerator } from "../../utils/function/randomPassword.js";
import AdminDeleteSetup from "../../pages/AdminDeleteSetup/AdminDeleteSetup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { aprroveddata, deleteData, getAllData } from "../../redux/slices/reduxSlice1.js";

const AdminC = () => {
  const navigate = useNavigate();
  // State to store the array of user objects
  const [users, setUsers] = useState("");
  // for loader
  const [loader1, setLoader1] = useState(true);

  // redux
  const dispatch = useDispatch();
  const dataFromRedux = useSelector((state) => state.reducer1.data);
  // console.log(dataFromRedux) 
  const reduxData = dataFromRedux
  
  useEffect(()=>{
    (reduxData.length>0) && setUsers(reduxData) 
  },[reduxData])

  const apiCall = async () => {
    try {
      const response = await getReq("/proceed/");
      response && setLoader1(false);
      const allData = response?.data?.data; // Array of user objects
      // sending to redux 
      dispatch(getAllData(allData));
    
    } catch (e) {
      toast.error(e.message);
    }
  };
  //  for approve
  const getingDataForApprove = async (data, row) => {
    const inputObject = data;
    const allData = row;
    // console.log(allData, "approve");
    const tokenGenerate = passwordGenerator();
    const forSend = {
      id: row._id,
      slotDetails: data.slotDetails,
      token: tokenGenerate,
    };

   

    const responce = await postReq("/proceed/admin", forSend);
    // console.log(responce.data);

    // ( (responce.status == 201)     &&     apiCall())
    if (responce.status == 201) {
      dispatch(aprroveddata(allData._id));
    }
  };
  // for reject
  const getingDataFoReject = async (data, row) => {
    // console.log('reject')
    const forSend = {
      id: row._id,
    };
    const responce = await postReq("/proceed/adminReject", forSend);
    // console.log(responce.data);
    responce.status == 201 && dispatch(deleteData(row._id));
  };
  // FOR TOKEN
  const getTokenLocalStorage = () => {
    const getToken = localStorage.getItem("token");
    // console.log(getToken)
    if (!getToken) {
      toast.error(`Admin Athorization Invalid`);
      navigate("/adminLogin");
    } else {
      apiCall();
    }
  };

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  // logoutfun
  const logoutfun = () => {    localStorage.removeItem("token");
    navigate("/");
  };
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
      ) : users.length == 0 ? (
        <div className="No-data-div2">
         <div>No Data Record Now</div>
         <div><button onClick={()=> navigate('/') } >Go Home</button></div>
          
           </div>
      ) : (
        <>
          <CustomizedTables
            rows={users}
            onApproveData={getingDataForApprove}
            onRejectData={getingDataFoReject}
            logoutFunction={logoutfun}
          />
          <AdminDeleteSetup  />
        </>
      )}
    </div>
  );
};

export default AdminC;
