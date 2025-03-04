import React, { useEffect, useState,useRef } from "react";
import "./User_status.css";
import { getReq } from "../../Api/axios.js";
import { useNavigate, useParams } from "react-router";
import QRCode from "react-qr-code";
// ==
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const User_status = () => {
  const { id } = useParams();
  const [getResponce, setGetResponce] = useState("");
  const cardRef = useRef(); // Ref for capturing the user-card div
  const navigate = useNavigate()

  const callApi = async () => {
    const response = await getReq("/proceed/");
    console.log(response);
    const finfById = response?.data?.data.filter((val, ind) => val._id == id);
    console.log(id, finfById[0]);
    setGetResponce(finfById[0]);
  };

  useEffect(() => {
    callApi();
  }, []);

  // ✅ Function to Download PDF
  const handleDownloadPDF = () => {
    const input = cardRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("user-detail.pdf");
    });
  };
  return (
    <>
      <div className="user-status">
        <>
       
          <div ref={cardRef} className="user-card">
            <div className="submission-message">
              Your response is submitted <br />
              Please wait for admin Approval
            </div>
            <h5 style={{ color: "red", textAlign: "center" }}>
              NOTE: Please Take a print And save your ID
            </h5>
            <p className="email">
              <span className="label">Your ID:</span> {getResponce._id}
            </p>
            <p className="email">
              <span className="label">Your Email:</span> {getResponce.email}
            </p>
            <p className="email">
              <span className="label">Your Name:</span> {getResponce.name}
            </p>
            <p className="email">
              <span className="label">Your CNIC:</span> {getResponce.cnic}
            </p>
            {getResponce.status === "Approved" && (
              <div>
                <p className="email">
                  <span className="label">Your Address:</span>{" "}
                  {getResponce.address}
                </p>
                <p className="email" style={{ color: "purple" }}>
                  <span className="label">Token No :</span> {getResponce.Token}
                </p>
                <p className="email" style={{ color: "purple" }}>
                  <span className="label">Slot Details :</span>{" "}
                  {getResponce.Slot}
                </p>
              </div>
            )}
            <p
              className={`${
                getResponce.status === "Approved"
                  ? "status-approved"
                  : getResponce.status === "Rejected"
                  ? "status-reject"
                  : "status-pending"
              }`}
            >
              <span> {getResponce.status || "Pending"}</span>
            </p>
            {/* <p className="download-btn"><p>DOWNLOAD SLIP</p></p> */}
          </div>
          <div className="download-btn">
            {/* ✅ Download Button */}
            <button onClick={handleDownloadPDF}>Download PDF</button>
          </div>
          {/* QR CODE  */}
          {getResponce && (
            <div className="qr-code">
              <div>
                <p>Scan Your ID</p>
                <p>
                  <QRCode
                    value={getResponce?._id} // Convert the object to a JSON string
                    style={{ height: "150px", width: "150px" }}
                  />
                </p>
                <p> <button className="btn-close" onClick={()=>navigate("/")} >Close</button></p>
              </div>
            </div>

           
          )}
        </>
      </div>
    </>
  );
};

export default User_status;
