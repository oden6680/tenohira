import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import TraditionalCraftsData from "../../TraditionalCrafts.json";
import {
  Button,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const colorMarker = (color) => {
  return L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    className: `default-marker ${color}`,
  });
};

const categories = {
  stonework: { name: "石工品", color: "light-blue" },
  ceramics: { name: "陶磁器", color: "aqua" },
  dyedproducts: { name: "染色品", color: "green" },
  craftmaterials: { name: "工芸材料・工芸用品", color: "lime-green" },
  dolls: { name: "人形・こけし", color: "light-yellow" },
  buddhist: { name: "仏壇・仏具", color: "yellow" },
  metalwork: { name: "金工品", color: "gold" },
  dyedwovenproducts: { name: "染織品", color: "orange" },
  stationery: { name: "文具", color: "red-orange" },
  paper: { name: "和紙", color: "red" },
  woodwork: { name: "木工品・竹工品", color: "dark-pink" },
  lacquerware: { name: "漆器", color: "pink" },
  preciousstonework: { name: "貴石細工", color: "magenta" },
  fabric: { name: "織物", color: "purple" },
  other: { name: "その他", color: "deep-purple" },
};

export const Map = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    Object.values(categories).map((c) => c.name)
  );

  const position = [35.5, 136.5];
  const zoom = 6;

  const handleCategoryChange = (event, newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleSelectAll = () => {
    setSelectedCategories(Object.values(categories).map((c) => c.name));
  };

  const handleDeselectAll = () => {
    setSelectedCategories([]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: "95vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {TraditionalCraftsData.features
            .filter((craft) =>
              selectedCategories.includes(
                categories[craft.properties.category].name
              )
            )
            .map((craft) => (
              <Marker
                key={craft.properties.ID}
                position={[
                  craft.geometry.coordinates[1],
                  craft.geometry.coordinates[0],
                ]}
                icon={colorMarker(categories[craft.properties.category].color)}
              >
                <Popup>
                  {craft.properties.name} <br /> {craft.properties.overview}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </Grid>
      <Grid item xs={12} md={2}>
        <Box sx={{ margin: 2 }}>
          <Button
            variant="contained"
            onClick={handleSelectAll}
            sx={{ margin: 1 }}
          >
            全て選択
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeselectAll}
            sx={{ margin: 1 }}
          >
            選択解除
          </Button>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedCategories}
            onChange={handleCategoryChange}
            sx={{
              display: "block",
              "& .MuiToggleButton-root": {
                margin: "5px",
                borderRadius: "16px",
                textTransform: "none",
                justifyContent: "flex-start",
                color: "black",
                backgroundColor: "#e0e0e0",
                "&:hover": {
                  backgroundColor: "#aeaeae",
                },
              },
            }}
          >
            {Object.values(categories).map((category) => (
              <ToggleButton
                key={category.name}
                value={category.name}
                sx={{ textTransform: "none", justifyContent: "flex-start" }}
              >
                {category.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
};
