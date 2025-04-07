


import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import "./MuiTable1.css";

// Styled Table Cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    whiteSpace: "nowrap",
    fontSize: 16,
    height: "20px",
    width: "150px",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "nowrap",
    height: "40px",
    width: "150px",
    border: "1px solid lightgrey",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ rows, onApproveData,onRejectData,logoutFunction }) {
  return (

    
   <>
   <div className="parent-admintable" >
    <div className="admin-heading">
      <h1>Admin panel</h1> <Button onClick={()=>logoutFunction()} >Logout</Button>


    </div>

<div>
  
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell>CNIC</StyledTableCell>
            <StyledTableCell>EMAIL</StyledTableCell>
            <StyledTableCell>PHONE</StyledTableCell>
            <StyledTableCell>ADDRESS</StyledTableCell>
            <StyledTableCell>GUARANTOR 1 NAME</StyledTableCell>
            <StyledTableCell>GUARANTOR 1 CNIC</StyledTableCell>
            <StyledTableCell>GUARANTOR 1 EMAIL</StyledTableCell>
            <StyledTableCell>GUARANTOR 1 LOCATION</StyledTableCell>
            <StyledTableCell>GUARANTOR 2 NAME</StyledTableCell>
            <StyledTableCell>GUARANTOR 2 CNIC</StyledTableCell>
            <StyledTableCell>GUARANTOR 2 EMAIL</StyledTableCell>
            <StyledTableCell>GUARANTOR 2 LOCATION</StyledTableCell>
            <StyledTableCell>SLIP URL</StyledTableCell>
            <StyledTableCell>STATUS</StyledTableCell>
            <StyledTableCell>ADMIN ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            // Each row has its own form instance
            const {
              register,
              handleSubmit,
              reset,
              formState: { errors },
            } = useForm();

            // Handle form submission for a specific row
            const onApprove = (data) => {
              onApproveData(data, row);
              reset()
            };

            const onReject = (data) => {
              onRejectData(data, row);
              
            };

            return (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center">{row._id}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.cnic}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor1Name}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor1CNIC}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor1Email}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor1Location}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor2Name}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor2CNIC}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor2Email}</StyledTableCell>
                <StyledTableCell align="center">{row.guarantor2Location}</StyledTableCell>
                <StyledTableCell align="center">{row.pictureId}</StyledTableCell>
                <StyledTableCell
                  style={{
                    color: "white",
                    background:
                      row.status === "Pending"
                        ? "orange"
                        : row.status === "Approved"
                        ? "blue"
                        : row.status === "Rejected"
                        ? "red"
                        : "gray", // Default gray color
                  }}
                  align="center"
                >
                  {(row.status || 'pending')}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {/* Form for each row */}
                  <form>
                    <div>
                      <Input
                        {...register("slotDetails", {
                         
                        })}
                        placeholder="Add Slot Details"
                        style={{
                          padding: "5px 10px",
                          marginBottom: "5px",
                          width: "100%",
                          outline: "none",
                          border: "none",
                          boxShadow: "none" // Remove focus boundary
                        }}
                      />
                     
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onApprove)}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={handleSubmit(onReject)}
                      >
                        Reject
                      </Button>
                    </div>
                  </form>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
</div>
   </div>
   </>
  );
}

