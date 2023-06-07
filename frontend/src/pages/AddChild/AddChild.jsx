
import React, { useState } from "react";
import "./css/addchild.css";
import axios from "axios";

const AddChild = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [keyCase, setKeyCase] = useState("");
  const [familyDetails, setFamilyDetails] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("Abandoned");
  const [images, setImages] = useState(null);
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
      console.log(response.data);
      // Store the image URL or handle other necessary tasks
    } catch (error) {
      console.log(error);
      // Handle image upload error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sendData = {
      name,
      category: category === "Abandoned" ? 1 : category === "Surrendered" ? 2 : 3,
      keyCase,
      DateOfBirth: dateOfBirth,
      familyDetails,
      gender,
      pinCode: parseInt(pinCode),
      images: images ? images.url : "", // Assuming the image URL is stored in the 'url' property
    };
    let childID = ""
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/child/new",
        sendData
      );
      console.log(response.data);
      childID = response.data.child._id;

      const response2 = await axios.post(
        "http://localhost:4000/api/v1/process/new",
        { child: childID, DateOfAdmission, EnrollmentDate}
      )
      console.log(response2.data)
      // Handle successful child creation
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
              <input
                type="text"
                placeholder="First Name"
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
              <input
                type="text"
                placeholder="Description"
                value={keyCase}
                onChange={(e) => setKeyCase(e.target.value)}
                required
              />

            </div>
            <div className="row">
              <label htmlFor="FamilyDetails">Family Details</label>
              <input
                type="text"
                placeholder="Family Details"
                value={familyDetails}
                onChange={(e) => setFamilyDetails(e.target.value)}
              />
            </div>
            <div className="row">
              <label htmlFor="PinCode">PinCode</label>
              <input
                type="text"
                placeholder="PinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="row dropdown">
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

            <div className="row dropdown">
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
            <input type="submit" value="Submit" disabled={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChild;
