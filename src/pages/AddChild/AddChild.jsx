import React, { useState } from "react";
import "./css/addchild.css";
import axios from "axios";
import { BASE_URL } from "../../services/helper";

const AddChild = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [keyCase, setKeyCase] = useState("");
  const [familyDetails, setFamilyDetails] = useState("");
  const [pinCode, setPinCode] = useState(0);
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("Abandoned");
  const [images, setImages] = useState("");
  const [publicId, setPublicId] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [EnrollmentDate, setEnrollmentDate] = useState("");
  const [DateOfAdmission, setDateOfAdmission] = useState("");

  const submitImage = async () => {
    const formData = new FormData();
    formData.append("file", images);
    formData.append("upload_preset", "vkgzvauu");
    formData.append("cloud_name", "dmomonuiu");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmomonuiu/image/upload",
        formData
      );
      setUrl(response.data.url);
      setPublicId(response.data.public_id);
      // Store the image URLa or handle other necessary tasks
    } catch (error) {
      console.log(error);
      // Handle image upload error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const createProcess = async (id) => {
      try{
        const response2 = await axios.post(
          `${BASE_URL}/api/v1/process/create/${id}`
        )
      }
      catch(e){
        console.log(e)
      }
      
      // Handle successful child creation
    }

    const sendData = {
      "name":name,
      "category": category === "Abandoned" ? 1 : category === "Surrendered" ? 2 : 3,
      "keyCase":keyCase,
      "DateOfBirth": dateOfBirth,
      "familyDetails":familyDetails,
      "gender":gender,
      "pincode": pinCode,
      "images": [{
        "public_id":publicId,
        "url":url 
      }]// Assuming the image URL is stored in the 'url' property
    };
    let childID = ""
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/admin/child/new`,
        sendData
      );
      createProcess(response.data.child._id)
      
    } catch (error) {
      console.log("API request error:", error);
      // Handle error case
    }
    setLoading(false);
  };

  return (
    <div>
      <div id="registration-form">
        <div className="fieldset">
          <h1 className="addChild">Enter the Child's Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="firstname">Name</label>
              <input className="inputText"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="Description">Description</label>
              <input className="inputText"
                type="text"
                placeholder="Description"
                value={keyCase}
                onChange={(e) => setKeyCase(e.target.value)}
                required
              />

            </div>
            <div className="row">
              <label htmlFor="FamilyDetails">Family Details</label>
              <input className="inputText"
                type="text"
                placeholder="Family Details"
                value={familyDetails}
                onChange={(e) => setFamilyDetails(e.target.value)}
              />
            </div>
            <div className="row">
              <label htmlFor="PinCode">PinCode</label>
              <input className="inputText"
                type="text"
                placeholder="PinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="row dropdown1">
              <label htmlFor="Gender">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="EnrollmentDate">Enrollment Date</label>
              <input
                type="date"
                placeholder="Enrollment Date"
                value={EnrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="DateOfAdmission">Date of Admission</label>
              <input
                type="date"
                placeholder="Date of Admission"
                value={DateOfAdmission}
                onChange={(e) => setDateOfAdmission(e.target.value)}
                required
              />
            </div>

            <div className="row dropdown1">
              <label htmlFor="Category">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Abandoned">Abandoned</option>
                <option value="Surrendered">Surrendered</option>
                <option value="Orphan">Orphan</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="Photo">Photo</label>
              <input
                type="file"
                onChange={(e) => setImages(e.target.files[0])}
              />
              <button type="button" onClick={submitImage}>
                Upload
              </button>
            </div>
            <br />
            <input class="submit-btn" type="submit" value="Submit" disabled={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChild;