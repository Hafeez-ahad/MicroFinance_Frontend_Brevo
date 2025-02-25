import { useState, useRef } from "react";
import "./status_id.css";
import { Button } from "@mui/material";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { getReq } from "../../Api/axios.js";

const Status_Id = () => {
  const [getResponce, setGetResponce] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [noData, setNoData] = useState("");
  const cardRef = useRef(); // Ref for capturing the user-card div

  const callApi = async (id) => {
    console.log(id);
    const response = await getReq("/proceed/");
    // console.log(response);
    const findById = response?.data?.data.filter((val) => val._id == id);
    console.log(findById[0]);
    setGetResponce(findById[0]);


    if (!findById.length) {
      setGetResponce('');

      setNoData("No Data Found");
      return;
    }

    setInputValue("");
  };

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
    <div className="main-checkkById">
      <div className="input_id">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Enter Your ID"
          value={inputValue}
        />
        <Button className="btn" onClick={() => callApi(inputValue)}>
          Search
        </Button>
      </div>

      {getResponce ? (
        <div>
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
          </div>
         <div  className="download-btn" >
           {/* ✅ Download Button */}
           <button onClick={handleDownloadPDF}>
            Download PDF
          </button>
         </div>
           

          {/* QR CODE  */}
          <div className="qr-code">
            <div>
              <p>Scan Your ID</p>
              <p>
                <QRCode
                  value={getResponce._id}
                  style={{ height: "150px", width: "150px" }}
                />
              </p>
            </div>
          </div>

         
        </div>
      ) : (
        <div className="no-data">{noData}</div>
      )}
    </div>
  );
};

export default Status_Id;
