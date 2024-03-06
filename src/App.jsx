import { Map } from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "leaflet/dist/leaflet.css";
import { CssBaseline, Box } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Map />
      </Box>
      <Footer />
    </>
  );
}
