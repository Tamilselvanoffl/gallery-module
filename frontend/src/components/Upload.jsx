import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://gallery-module.onrender.com";

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful ✅");

      // ✅ GO TO GALLERY PAGE
      navigate("/gallery");

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default Upload;