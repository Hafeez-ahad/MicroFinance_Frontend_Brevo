import React, { useState } from "react";
import "./loancat.css";
import { loanData } from "../../utils/constant/loanData.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ModalUnstyled from "../modal/modal1.jsx";

const LoanCategories = () => {
  // for categories on one page 
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 2; // Show only 2 categories per page
  const totalPages = Math.ceil(loanData.length / itemsPerPage); // Total pages

  // Slice categories based on page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCategories = loanData.slice(startIndex, endIndex);

  // for modal 
   const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
    <div className="loan-container">
      <h1 className="loan-title">Sylani Micro Finance App</h1>

      {visibleCategories.map((category, index) => (
        <div key={index} className="loan-section">
          <h2 className="loan-category">{category.category}</h2>

          <div className="loan-grid">
            {category.subcategories.map((sub, i) => (
              <div key={i} className="loan-card">
                {category.image && <img src={category.image} alt={sub} className="loan-image" />}
                <h3>{sub}</h3>
                <p className="loan-details">
                  <span className="loan-amount">Loan Amount:</span> PKR {category.loan}
                </p>
                <div className="parent-loan-period">
                <p className="loan-period"  onClick={()=>handleOpen()} >Proceed for Loan</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* MUI Pagination Component */}
      <div className="pagination-parent">
      <Stack spacing={2} className="pagination-container">
        <Pagination
          count={totalPages} // Total pages
          page={page} // Current page
          onChange={(event, value) => setPage(value)} // Update page state
          color="primary"
        />
      </Stack>
      </div>
    </div>

< ModalUnstyled open={open} handleClose={handleClose}/>
    </>
  );
};

export default LoanCategories;
