import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://gallery-module-backend.onrender.com";

function Gallery() {

 const [images, setImages] = useState([]);

 const fetchImages = async () => {

  try {

   const res = await axios.get(`${BASE_URL}/api/images`);
   setImages(res.data);

  } catch (err) {

   console.error(err);
   alert("Failed to load images");

  }

 };

 useEffect(() => {
  fetchImages();
 }, []);

 return (

  <div>

   <h2>Resized Images</h2>

   {images.map((img) => (

    <div key={img._id}>

     {img.sizes?.map((size, i) => (

      <div key={i} style={{ marginBottom: "20px" }}>

       <h4>{size.width} x {size.height}</h4>

       <img
        src={`${BASE_URL}${size.path}`}
        width="200"
        alt="resized"
       />

       <br />

       <a
        href={`${BASE_URL}/api/download?path=${size.path}`}
        download
       >
        <button>Download</button>
       </a>

      </div>

     ))}

    </div>

   ))}

  </div>

 );

}

export default Gallery;