import React,{useState} from "react";
import './css/addchild.css'


const AddChild=()=>{
    const[image,setImage]=useState("")
    const submitImage=()=>{
        const data=new FormData()
        data.append("file",image);
        data.append("upload_preset","vkgzvauu");
        data.append("cloud_name","dmomonuiu");

        fetch("https://api.cloudinary.com/v1_1/dmomonuiu/image/upload",{method:"post",body:data})
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission or navigate to a different page here
  };
        return (
        <div>
            <div id="registration-form">
  <div class='fieldset'>
    <legend>Add a Child</legend>
    <form onSubmit={handleSubmit}>
      <div class='row'>
        <label for='firstname'>Name</label>
        <input type="text" placeholder="First Name" name='firstname' id='firstname' data-required="true" data-error-message="Name is required"/>
      </div>
      <div class='row'>
        <label for="DOB">Date of Birth</label>
        <input type="date" placeholder="E-mail"  name='DOB' data-required="true" data-type="DOB" data-error-message="DOB is required"/>
      </div>
      <div class='row'>
        <label for="Description">Description</label>
        <input type="text" placeholder="Description" name='Description' data-required="true" data-error-message="Description is required"/>
      </div>
      <div class='row'>
        <label for="FamilyDetails">Family Details</label>
        <input type="text" placeholder="Family Details" name='FamilyDetails'/>
      </div>
      <div class='row'>
        <label for="City">Ciyt</label>
        <input type="text" placeholder="City" name='City'/>
      </div>
      <div class='row'>
        <label for="State">State</label>
        <input type="text" placeholder="State" name='State'/>
      </div>
      <div class='row dropdown'>
        <label for="Gender">Gender</label>
        <select name="Gender">
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
        </select>
      </div>
      <div class='row dropdown'>
        <label for="Category">Category</label>
        <select name="Category">
            <option>Abandoned</option>
            <option>Surrendered</option>
            <option>Orphan</option>
        </select>
      </div>
      <div class='row'>
        <label for="Photo">Photo</label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        <button onClick={submitImage}>Upload</button>
      </div>
      <br></br>
      <input type="submit" value="Submit" onclick={submitImage}/>
    </form>
    </div>
  </div>
</div>
 

	);
}

export default AddChild;

