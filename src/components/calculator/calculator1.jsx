import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./calculator1.css";
import { loanData } from "../../utils/constant/loanData";

const Calculator1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [Subcategory, setSubcategory] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const onSubmit = (data) => {
    const { subCategory, initialDeposit, numberMonths } = data;

    // Find the loan amount based on the selected subcategory
    const getData = loanData.find((value) =>
      value.subcategories.includes(subCategory)
    );

    if (!getData) {
      alert("Invalid Subcategory Selected!");
      return;
    }

    const loanAmount = getData.loan;
    const calculatedMonthlyPayment = (loanAmount - initialDeposit) / numberMonths;

    // Update state to show the monthly payment
    setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
  };

  const getSelection = (data) => {
    const getData = loanData.find((value) => value.category === data);
    if (getData) {
      setSubcategory(getData.subcategories);
    } else {
      setSubcategory([]);
    }
  };

  return (

   <div className="cal-body">

    <div className="calculator-container">
      <h2 className="calculator-title">Loan Calculator</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       {/* Initial Deposit */}
<div className="form-field">
  <label>Initial Deposit:</label>
  <input
    {...register("initialDeposit", {
      required: "Initial Deposit is required",
      min: { value: 0, message: "Cannot be negative" }, // Prevents negative numbers
      pattern: { value: /^\d+$/, message: "Only whole numbers allowed" }, // Ensures only digits
    })}
    type="number"
    placeholder="Enter Amount"
  />
  {errors.initialDeposit && (
    <p className="error-message">{errors.initialDeposit.message}</p>
  )}
</div>

{/* Number of Months */}
<div className="form-field">
  <label>Number of Months:</label>
  <input
    {...register("numberMonths", {
      required: "Number of Months is required",
      min: { value: 1, message: "Must be at least 1 month" }, // Prevents zero & negatives
      pattern: { value: /^\d+$/, message: "Only whole numbers allowed" }, // Ensures only digits
    })}
    type="number"
    placeholder="Enter No of Months"
  />
  {errors.numberMonths && (
    <p className="error-message">{errors.numberMonths.message}</p>
  )}
</div>


        {/* Category Selection */}
        <div className="form-field">
          <label>Category:</label>
          <select
            {...register("category", { required: "Category is required" })}
            onChange={(e) => getSelection(e.target.value)}
          >
            <option value="">Select Category</option>
            {loanData.map((value, index) => (
              <option key={index} value={value.category}>
                {value.category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>

        {/* Subcategory Selection */}
        <div className="form-field">
          <label>Sub category</label>
          <select
            {...register("subCategory", {
              required: "SubCategory is required",
            })}
            disabled={Subcategory.length === 0}
          >
            <option value="">Select SubCategory</option>
            {Subcategory.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="error-message">{errors.subCategory.message}</p>
          )}
        </div>

        <button type="submit">Calculate Loan</button>
      </form>

      {/* Monthly Loan Payment Display */}
      {monthlyPayment !== null && (
        <div className="result">
          <p>Your Monthly Loan Payment <br /> {monthlyPayment} RS</p>
          <p></p>
        </div>
      )}
    </div>

   </div>

  );
};

export default Calculator1;
