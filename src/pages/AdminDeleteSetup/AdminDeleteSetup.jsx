import React, { useState } from "react";
import "./adminDeleteSetup.css";
import { postReq } from "../../Api/axios";
import { useDispatch, useSelector } from "react-redux";

const AdminDeleteSetup = () => {
  const [getData1, setGetData1] = useState("");
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.reducer1.data);

  const DeletRejected = async () => {
    const passObject = { password: getData1 };

    setGetData1("");

    const response = await postReq("/proceed/deleteRejected", passObject);

    if (response.data.status == 200) {
      // Trigger page reload after the operation
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="adminSetup-delete">
        <p>
          <input
            value={getData1}
            onChange={(e) => setGetData1(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button onClick={() => DeletRejected()}>Delete Rejected</button>
        </p>
        
      </div>
      <div className="adminSetup-delete"></div>
    </div>
  );
};

export default AdminDeleteSetup;
