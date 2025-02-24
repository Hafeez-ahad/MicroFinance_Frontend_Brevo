import React from "react";
import { useForm } from "react-hook-form";
import "./newpass.css"; // Import the CSS file
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

const PasswordForm = ({ sendingData,loader1 }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    sendingData(data);
    reset();
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Change Password</h2>
        {/* Loader  */}
        {
          ( loader1)
           ?
           <>
            {/* form  */}
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
           <div className="form-group">
             <label className="form-label">Enter Password</label>
             <input
               type="password"
               {...register("password", { required: "Password is required" })}
               className="form-input"
             />
             {errors.password && (
               <p className="form-error">{errors.password.message}</p>
             )}
           </div>
 
           <div className="form-group">
             <label className="form-label">New Password</label>
             <input
               type="password"
               {...register("newPassword", {
                 required: "New password is required",
               })}
               className="form-input"
             />
             {errors.newPassword && (
               <p className="form-error">{errors.newPassword.message}</p>
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

export default PasswordForm;
