import axios from "axios";
import { useEffect, useState } from "react";

function Gallery() {

 const [images, setImages] = useState([]);

 const fetchImages = async () => {

  const res = await axios.get("http://localhost:5000/api/images");

  setImages(res.data);

 };

 useEffect(() => {
  fetchImages();
 }, []);

 return (

  <div>

   <h2>Resized Images</h2>

   {images.map((img) => (

    <div key={img._id}>

     {img.sizes.map((size, i) => (

      <div key={i} style={{ marginBottom: "20px" }}>

       <h4>{size.width} x {size.height}</h4>

       <img
        src={`http://localhost:5000${size.path}`}
        width="200"
        alt="resized"
       />

       <br />

       <a
        href={`http://localhost:5000/api/download?path=${size.path}`}
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