import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://gallery-module-backend.onrender.com";

function Upload(){

 const [file,setFile] = useState(null);
 const navigate = useNavigate();   // ✅ missing line added

 const uploadImage = async()=>{

  if(!file){
   alert("Please select image");
   return;
  }

  const formData = new FormData();
  formData.append("image",file);

  try{

  await axios.post(
  "https://gallery-module-backend.onrender.com/api/upload",
  formData
);

   alert("Image Uploaded");

   navigate("/gallery");

  }catch(err){

   console.error(err);
   alert("Upload failed");

  }

 };

 return(

  <div>

   <h2>Upload Image</h2>

   <input
    type="file"
    onChange={(e)=>setFile(e.target.files[0])}
   />

   <br/><br/>

   <button onClick={uploadImage}>
    Upload
   </button>

  </div>

 );

}

export default Upload;