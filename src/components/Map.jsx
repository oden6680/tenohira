import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import TraditionalCraftsData from "../../TraditionalCrafts.json";
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
  const zoom = 5;

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectedCategories(Object.values(categories).map((c) => c.name));
  };

  const handleDeselectAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div>
      <button onClick={handleSelectAll}>全て選択</button>
      <button onClick={handleDeselectAll}>選択解除</button>
      {Object.keys(categories).map((categoryKey) => (
        <div key={categoryKey}>
          <input
            type="checkbox"
            id={categoryKey}
            value={categories[categoryKey].name}
            onChange={handleCategoryChange}
            checked={selectedCategories.includes(categories[categoryKey].name)}
          />
          <label htmlFor={categoryKey}>{categories[categoryKey].name}</label>
        </div>
      ))}

      <MapContainer center={position} zoom={zoom}>
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
    </div>
  );
};
