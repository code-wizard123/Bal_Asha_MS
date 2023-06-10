import React, { useState, useEffect } from "react";
import "./css/processdone.css";
import axios from 'axios'
import { useParams } from "react-router-dom";

const ProcessDone = () => {
  const { id } = useParams();
  const [processId, setProcessId] = useState("");
  const [image, setImage] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [actionLeftOptions, setActionLeftOptions] = useState([]);
  const [publicId, setPublicId] = useState("")
  const [url, setUrl] = useState("")
  const [date, setDate] = useState()

  useEffect(() => {
    // Fetch the process details from the server to get the actionLeft options
    const fetchProcessDetails = async () => {
      try {
        console.log(id)
        const response = await fetch(`http://localhost:4000/api/v1/process/${id}`); // Update the API endpoint with your server URL
        const data = await response.json();
        const { actionLeft, _id } = data.process[data.process.length - 1];
        setProcessId(_id)
        setActionLeftOptions(actionLeft);
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
        console.log(data)
        setPublicId(data.public_id)
        setUrl(data.url)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      child: id,
    };

    updateData[selectedAction] = {
      dateRegistered: date,
      public_id: publicId,
      url
    }

    if(url && publicId){
      try {
        const response = await axios.put(`http://localhost:4000/api/v1/admin/process/${processId}`, updateData);
        console.log(response.data) // Process the response data as needed
      } catch (error) {
        console.log("Axios PUT request error:", error);
      }
    }
  };

  const handleSelectAction = (e) => {
    const action = e.target.value;
    setSelectedAction(action);
  }

  return (
    <div className="form-container1">
      <h2>Upload Proof and Enter Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date of Completion:</label>
          <input type="date" id="birthdate" name="birthdate" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="proof">Proof</label>
          <input type="file" id="profile-pic" name="profile-pic" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={submitImage}>Upload</button>
        </div>
        <div className="form-group">
          <label htmlFor="action">Action:</label>
          <select
            id="action"
            name="action"
            value={selectedAction}
            onChange={handleSelectAction}
          >
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
