import { Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";

function App() {

  return (

    <div style={{ textAlign: "center", padding: "20px" }}>

      <h1>Gallery Module</h1>

      <Routes>

        <Route path="/" element={<Upload />} />

        <Route path="/gallery" element={<Gallery />} />

      </Routes>

    </div>

  );

}

export default App;