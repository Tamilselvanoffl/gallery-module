import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload(){

 const [file,setFile] = useState(null);

 const navigate = useNavigate();

 const uploadImage = async()=>{

  if(!file){
   alert("Please select image");
   return;
  }

  const formData = new FormData();
  formData.append("image",file);

  await axios.post("http://localhost:5000/api/upload",formData);

  alert("Image Uploaded");

  navigate("/gallery");

 };

 return(

  <div>

   <h2>Upload Image</h2>

   <input
    type="file"
    onChange={(e)=>setFile(e.target.files[0])}
   />

   <br/>

   <button onClick={uploadImage}>
    Upload
   </button>

  </div>

 );

}

export default Upload;