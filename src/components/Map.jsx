import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import {
  Button,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import TraditionalCraftsData from "../../data/TraditionalCrafts.json";
import { regions } from "../../data/regions";
import { categories } from "../../data/categories";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
const popupOffset = new L.Point(0, -30);

const colorMarker = (color) => {
  return L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    className: `default-marker ${color}`,
  });
};

const FlyToMarker = ({ position }) => {
  const maps = useMap();
  maps.flyTo(position, 13);
  return null;
};

const renderPopupContent = (craft) => (
  <div key={craft.properties.ID}>
    <Typography variant="h6" component="h2">
      {craft.properties.name}
    </Typography>
    <Typography color="textSecondary">
      {categories[craft.properties.category].name}
    </Typography>
    <Divider />
    <Typography>
      {craft.properties.postcode + "　" + craft.properties.address + "　"}
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(craft.properties.address)}`}
        target="_blank"
        rel="noopener"
      >
        Google Mapで見る
      </Link>
    </Typography>
    <Divider />
    <Typography variant="body2" component="p">
      {craft.properties.overview}
    </Typography>
    <Divider />
    <Typography variant="body2" component="p">
      {craft.properties.URL ? "参考URL: " : null}
      <Link href={craft.properties.URL} target="_blank" rel="noopener">
        {craft.properties.URL}
      </Link>
    </Typography>
  </div>
);

const ZoomToMarker = ({ position, icon, craft }) => {
  const maps = useMap();

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          maps.flyTo(position, 13);
        },
      }}
    >
      <Popup offset={popupOffset}>{renderPopupContent(craft)}</Popup>
    </Marker>
  );
};

const allCategories = Object.values(categories).map((c) => c.name);
const allPrefectures = Object.values(regions).flat();

export default function Map() {
  const [selectedCategories, setSelectedCategories] = useState(allCategories);
  const [selectedPrefectures, setSelectedPrefectures] =
    useState(allPrefectures);
  const [map, setMap] = useState(null);
  const [activeCraft, setActiveCraft] = useState(null);

  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [filteredCrafts, setFilteredCrafts] = useState([]);

  useEffect(() => {
    const sortedCrafts = TraditionalCraftsData.features
      .filter((craft) =>
        selectedCategories.includes(categories[craft.properties.category].name)
      )
      .filter((craft) =>
        selectedPrefectures.some((prefecture) =>
          craft.properties.address.includes(prefecture)
        )
      )
      .sort((a, b) => {
        let valA = a.properties[sortKey];
        let valB = b.properties[sortKey];
        if (sortKey === "coordinates") {
          valA = a.geometry.coordinates[1];
          valB = b.geometry.coordinates[1];
        }
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    setFilteredCrafts(sortedCrafts);
  }, [selectedCategories, selectedPrefectures, sortKey, sortOrder]);

  const position = [35.5, 136.5];
  const zoom = 6;

  const handleCategoryChange = (event, newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handlePrefectureToggle = (prefecture) => {
    setSelectedPrefectures((current) =>
      current.includes(prefecture)
        ? current.filter((p) => p !== prefecture)
        : [...current, prefecture]
    );
  };

  const handleSelectCategoriesAll = () => {
    setSelectedCategories(allCategories);
  };

  const handleDeselectCategoriesAll = () => {
    setSelectedCategories([]);
  };

  const handleSelectPrefecturesAll = () => {
    setSelectedPrefectures(allPrefectures);
  };

  const handleDeselectPrefecturesAll = () => {
    setSelectedPrefectures([]);
  };

  const handleCardClick = (craft) => {
    setActiveCraft({
      lat: craft.geometry.coordinates[1],
      lng: craft.geometry.coordinates[0],
    });
  };

  return (
    <Grid container spacing={2}>
      <Accordion defaultExpanded sx={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>品種別絞り込み</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Button
              variant="contained"
              onClick={handleSelectCategoriesAll}
              sx={{ margin: 1 }}
            >
              全て選択
            </Button>
            <Button
              variant="outlined"
              onClick={handleDeselectCategoriesAll}
              sx={{ margin: 1 }}
            >
              選択解除
            </Button>
            <ToggleButtonGroup
              orientation="vertical"
              value={selectedCategories}
              onChange={handleCategoryChange}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                "& .MuiToggleButton-root": {
                  flexGrow: 1,
                  m: 0.1,
                  borderRadius: 1,
                  textTransform: "none",
                  justifyContent: "center",
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
                      backgroundColor: category.colorcode,
                      "&.Mui-selected:hover": {
                        backgroundColor: `${category.colorcode}80`,
                      },
                    },
                  }}
                >
                  {category.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          都道府県別絞り込み
        </AccordionSummary>
        <Box sx={{ margin: 2 }}>
          <Button
            variant="contained"
            onClick={handleSelectPrefecturesAll}
            sx={{ margin: 1 }}
          >
            全て選択
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeselectPrefecturesAll}
            sx={{ margin: 1 }}
          >
            選択解除
          </Button>
          {Object.entries(regions).map(([regionName, prefectures]) => (
            <Accordion key={regionName}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{regionName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ToggleButtonGroup
                  orientation="vertical"
                  exclusive
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    "& .MuiToggleButton-root": {
                      flexGrow: 1,
                      m: 0.1,
                      borderRadius: 1,
                      textTransform: "none",
                      justifyContent: "center",
                    },
                  }}
                >
                  {prefectures.map((prefecture) => (
                    <ToggleButton
                      key={prefecture}
                      value={prefecture}
                      selected={selectedPrefectures.includes(prefecture)}
                      onChange={() => handlePrefectureToggle(prefecture)}
                    >
                      {prefecture}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Accordion>
      <Grid item xs={12} md={8}>
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: "95vh", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
          />
          {TraditionalCraftsData.features
            .filter((craft) =>
              selectedCategories.includes(
                categories[craft.properties.category].name
              )
            )
            .filter((craft) =>
              selectedPrefectures.some((prefecture) =>
                craft.properties.address.includes(prefecture)
              )
            )
            .map((craft) => (
              <ZoomToMarker
                key={craft.properties.ID}
                position={[
                  craft.geometry.coordinates[1],
                  craft.geometry.coordinates[0],
                ]}
                icon={colorMarker(categories[craft.properties.category].color)}
                craft={craft}
              ></ZoomToMarker>
            ))}
          {activeCraft && (
            <FlyToMarker position={[activeCraft.lat, activeCraft.lng]} />
          )}
        </MapContainer>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ margin: 1, height: "95vh", overflow: "hidden" }}>
          <Typography variant="subtitle1">
            全{filteredCrafts.length}件
          </Typography>
          <FormControl
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              displayEmpty
              sx={{ flexGrow: 1, mr: 1, mb: 1 }}
            >
              <MenuItem value="name">名前順</MenuItem>
              <MenuItem value="category">種類順</MenuItem>
              <MenuItem value="coordinates">緯度順</MenuItem>
            </Select>
            <Button
              variant="outlined"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              sx={{ height: "fit-content", mb: 1 }}
            >
              {sortOrder === "asc" ? "昇順" : "降順"}
            </Button>
          </FormControl>
          <Box sx={{ overflow: "auto", maxHeight: "88vh" }}>
            {filteredCrafts.map((craft) => (
              <Card
                key={craft.properties.ID}
                sx={{ marginBottom: 2 }}
                onClick={() => handleCardClick(craft)}
              >
                <CardContent
                  sx={{
                    backgroundColor: `${categories[craft.properties.category].colorcode}80`,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {craft.properties.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {categories[craft.properties.category].name}
                  </Typography>
                  <Divider />
                  <Typography>
                    {craft.properties.postcode +
                      "　" +
                      craft.properties.address +
                      "　"}
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(craft.properties.address)}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Google Mapで見る
                    </Link>
                  </Typography>
                  <Divider />
                  <Typography variant="body2" component="p">
                    {craft.properties.overview}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" component="p">
                    {craft.properties.URL ? "参考URL: " : null}
                    <Link
                      href={craft.properties.URL}
                      target="_blank"
                      rel="noopener"
                    >
                      {craft.properties.URL}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
