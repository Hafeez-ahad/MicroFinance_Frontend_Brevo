import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import './detailform.css'
import { ThreeDots } from "react-loader-spinner";

const UserDetailForm = ({ sendingData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // for loader 
const[loader,setloader] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate()

  // ==
  const onSubmit = async (data) => {
    // for loader 
    setloader(true)
    // console.log("Form Data:", data.file[0]); // ✅ Debugging
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("file", data.file[0]);
    formData.append("guarantor1Name", data.guarantor1Name);
    formData.append("guarantor1CNIC", data.guarantor1CNIC);
    formData.append("guarantor1Email", data.guarantor1Email);
    formData.append("guarantor1Location", data.guarantor1Location);
    formData.append("guarantor2Name", data.guarantor2Name);
    formData.append("guarantor2CNIC", data.guarantor2CNIC);
    formData.append("guarantor2Email", data.guarantor2Email);
    formData.append("guarantor2Location", data.guarantor2Location);
    formData.append("id", id);
    // console.log("Sending FormData:", formData); // ✅ Debugging


    try {
      const response = await axios.post(
        "https://micro-finance-backend.vercel.app",
        formData,
        {
          timeout:7000,
          headers: {
            "Content-Type": "multipart/form-data", // ✅ Ensure correct header
          },
        }
      );
      toast.success(response?.data?.message);
      // for closing form
      console.log(response.data.status)
      console.log(id)
      if(response.data.status==201){
        navigate(`/userstatus/${id}`);
      } 
      else{
        setloader(false)
      }

    }
    catch (error) {
      setloader(false)
      if (error.response) {
        toast.error(error.response.statusText);
        console.log(error.response.statusText)
        return error.response.data?.message;
      } else {
        toast.error(error?.message);
        return error.message;
      }
    }

   
  };

 
  return (
    <div className="form-container">
    <div className="form-card">
      <h2 className="form-title">Detail Form</h2>
      {
        (loader)
        ?
         <>
                    {/* loader  */}
                    <ThreeDots
                   visible={true}
                   height="80"
                   width="80"
                   color="blue"
                   radius="9"
                   ariaLabel="three-dots-loading"
                   wrapperStyle={{}}
                   wrapperClass="loader-div2"
                 />
                   </>
          :
          <>
           <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* Personal Information */}
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="form-input"
          />
          {errors.address && (
            <p className="form-error">{errors.address.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className="form-input"
          />
          {errors.phone && (
            <p className="form-error">{errors.phone.message}</p>
          )}
        </div>

        {/* Statement & Salary Sheet */}
        <div className="form-group">
          <label className="form-label">Statement</label>
          <input
            type="file"
            name="file"
            {...register("file", { required: "Statement is required" })}
            className="form-input"
          />
          {errors.statement && (
            <p className="form-error">{errors.statement.message}</p>
          )}
        </div>

        {/* Guarantor 1 */}
        <h3 className="form-subtitle">Guarantor 1 Information</h3>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            {...register("guarantor1Name", {
              required: "Guarantor 1 name is required",
            })}
            className="form-input"
          />
          {errors.guarantor1Name && (
            <p className="form-error">{errors.guarantor1Name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            {...register("guarantor1Email", {
              required: "Guarantor 1 email is required",
            })}
            className="form-input"
          />
          {errors.guarantor1Email && (
            <p className="form-error">{errors.guarantor1Email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            {...register("guarantor1Location", {
              required: "Guarantor 1 location is required",
            })}
            className="form-input"
          />
          {errors.guarantor1Location && (
            <p className="form-error">
              {errors.guarantor1Location.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">CNIC</label>
          <input
            type="text"
            {...register("guarantor1CNIC", {
              required: "Guarantor 1 CNIC is required",
            })}
            className="form-input"
          />
          {errors.guarantor1CNIC && (
            <p className="form-error">{errors.guarantor1CNIC.message}</p>
          )}
        </div>

        {/* Guarantor 2 */}
        <h3 className="form-subtitle">Guarantor 2 Information</h3>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            {...register("guarantor2Name", {
              required: "Guarantor 2 name is required",
            })}
            className="form-input"
          />
          {errors.guarantor2Name && (
            <p className="form-error">{errors.guarantor2Name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            {...register("guarantor2Email", {
              required: "Guarantor 2 email is required",
            })}
            className="form-input"
          />
          {errors.guarantor2Email && (
            <p className="form-error">{errors.guarantor2Email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            {...register("guarantor2Location", {
              required: "Guarantor 2 location is required",
            })}
            className="form-input"
          />
          {errors.guarantor2Location && (
            <p className="form-error">
              {errors.guarantor2Location.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">CNIC</label>
          <input
            type="text"
            {...register("guarantor2CNIC", {
              required: "Guarantor 2 CNIC is required",
            })}
            className="form-input"
          />
          {errors.guarantor2CNIC && (
            <p className="form-error">{errors.guarantor2CNIC.message}</p>
          )}
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
          </>
      }
     
    </div>
  </div>
  );
};

export default UserDetailForm;
