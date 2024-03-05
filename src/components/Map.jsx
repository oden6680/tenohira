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
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
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
  stonework: { name: "石工品", color: "light-blue", colordode: "#267FCA" },
  ceramics: { name: "陶磁器", color: "aqua", colordode: "#0093AB" },
  dyedproducts: { name: "染色品", color: "green", colordode: "#009F82" },
  craftmaterials: {
    name: "工芸材料・工芸用品",
    color: "lime-green",
    colordode: "#009B4C",
  },
  dolls: { name: "人形・こけし", color: "light-yellow", colordode: "#38A332" },
  buddhist: { name: "仏壇・仏具", color: "yellow", colordode: "#458D00" },
  metalwork: { name: "金工品", color: "gold", colordode: "#828500" },
  dyedwovenproducts: { name: "染織品", color: "orange", colordode: "#AB7400" },
  stationery: { name: "文具", color: "red-orange", colordode: "#CD6B33" },
  paper: { name: "和紙", color: "red", colordode: "#E16165" },
  woodwork: {
    name: "木工品・竹工品",
    color: "dark-pink",
    colordode: "#E05088",
  },
  lacquerware: { name: "漆器", color: "pink", colordode: "#D14DB1" },
  preciousstonework: {
    name: "貴石細工",
    color: "magenta",
    colordode: "#B356D0",
  },
  fabric: { name: "織物", color: "purple", colordode: "#8B62DF" },
  other: { name: "その他", color: "deep-purple", colordode: "#5C75DE" },
};

export const Map = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    Object.values(categories).map((c) => c.name)
  );

  const position = [35.5, 136.5];
  const zoom = 6;

  const handleCategoryChange = (newCategories) => {
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
        <Box sx={{ margin: 2, height: "95vh", overflow: "hidden" }}>
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
                m: 0.5,
                borderRadius: 1,
                textTransform: "none",
                justifyContent: "flex-start",
              },
            }}
          >
            {Object.values(categories).map((category) => (
              <ToggleButton
                key={category.name}
                value={category.name}
                sx={{
                  "&.Mui-selected": {
                    color: "common.white",
                    backgroundColor: category.colordode,
                    "&.Mui-selected:hover": {
                      backgroundColor: `${category.colordode}80`,
                    },
                  },
                }}
              >
                {category.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Divider />
          <Box sx={{ overflow: "auto", maxHeight: "calc(95vh - 160px)" }}>
            {TraditionalCraftsData.features
              .filter((craft) =>
                selectedCategories.includes(
                  categories[craft.properties.category].name
                )
              )
              .map((craft) => (
                <Card key={craft.properties.ID} sx={{ marginBottom: 2 }}>
                  <CardContent
                    sx={{
                      backgroundColor: `${categories[craft.properties.category].colordode}80`,
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      {craft.properties.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {categories[craft.properties.category].name}
                    </Typography>
                    <Divider />
                    <Typography>{craft.properties.postcode}</Typography>
                    <Typography>{craft.properties.address}</Typography>
                    <Divider />
                    <Typography variant="body2" component="p">
                      {craft.properties.overview}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
