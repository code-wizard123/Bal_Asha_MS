import React, { useState, useEffect } from "react";
import "./css/processdone.css";

const ProcessDone = () => {
  const [image, setImage] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [actionLeftOptions, setActionLeftOptions] = useState([]);

  useEffect(() => {
    // Fetch the process details from the server to get the actionLeft options
    const fetchProcessDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/process/me"); // Update the API endpoint with your server URL
        const data = await response.json();
        const { actionLeft } = data.process;
        setActionLeftOptions(actionLeft);
        console.log(actionLeft);
      } catch (error) {
        console.log("API request error:", error);
      }
    };

    fetchProcessDetails();
  }, []);

  const submitImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "vkgzvauu");
    data.append("cloud_name", "dmomonuiu");

    fetch("https://api.cloudinary.com/v1_1/dmomonuiu/image/upload", { method: "post", body: data })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission or navigate to a different page here
  };

  return (
    <div className="form-container">
      <h2>Upload Proof and Enter Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date of Completion:</label>
          <input type="date" id="birthdate" name="birthdate" />
        </div>
        <div className="form-group">
          <label htmlFor="proof">Proof</label>
          <input type="file" id="profile-pic" name="profile-pic" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={submitImage}>Upload</button>
        </div>
        <div className="form-group">
          <label htmlFor="action">Action:</label>
          <select id="action" name="action" value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="">Select an action</option>
            {actionLeftOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ProcessDone;
