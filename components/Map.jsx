import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import TradisionalClaftsData from "../TraditionalCrafts.json";

L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

export const Map = () => {
  const position = [35.500, 136.500];
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
        >
          <Popup>
            {craft.properties.name} <br /> {craft.properties.overview}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
