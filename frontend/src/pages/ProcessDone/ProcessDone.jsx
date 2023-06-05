import React,{useState} from "react";
import './css/processdone.css'


const ProcessDone=()=>{
    const[image,setImage]=useState("")
    const submitImage=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","vkgzvauu");
        data.append("cloud_name","dmomonuiu");

        fetch("https://api.cloudinary.com/v1_1/dmomonuiu/image/upload",{method:"post",body:data})
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        });
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission or navigate to a different page here
  };
    return (
        <div class="form-container">
    <h2>Upload Proof and Enter Date</h2>
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="proof">Proof</label>
        <input type="file" id="profile-pic" name="profile-pic" onChange={(e)=>setImage(e.target.files[0])}/>
        <button onClick={submitImage}>Upload</button>
      </div>
      <div class="form-group">
        <label for="date">Date of Completion:</label>
        <input type="date" id="birthdate" name="birthdate"/>
      </div>
      <div class="form-group">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  </div>
	);
}

export default ProcessDone;

