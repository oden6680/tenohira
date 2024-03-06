import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./components/Map";
import About from "./components/About";
import Infomation from "./components/Infomation";
import Photo from "./components/Photo";
import SocialLinks from "./components/SocialLinks";
import "leaflet/dist/leaflet.css";
import { CssBaseline, Box } from "@mui/material";

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/infomation" element={<Infomation />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/sociallinks" element={<SocialLinks />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
}
