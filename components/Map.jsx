import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import TradisionalClaftsData from "../TraditionalCrafts.json";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

//defaultMarker
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
  stonework: "light-blue",
  ceramics: "aqua",
  dyedproducts: "green",
  craftmaterials: "lime-green",
  dolls: "light-yellow",
  buddhist: "yellow",
  metalwork: "gold",
  dyedwovenproducts: "orange",
  stationery: "red-orange",
  paper: "red",
  woodwork: "dark-pink",
  lacquerware: "pink",
  preciousstonework: "magenta",
  fabric: "purple",
  other: "deep-purple",
};

export const Map = () => {
  const position = [35.5, 136.5];
  const zoom = 5;
  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {TradisionalClaftsData.features.map((craft) => (
        <Marker
          key={craft.properties.ID}
          position={[
            craft.geometry.coordinates[1],
            craft.geometry.coordinates[0],
          ]}
          icon={colorMarker(categories[craft.properties.category])}
        >
          <Popup>
            {craft.properties.name} <br /> {craft.properties.overview}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
