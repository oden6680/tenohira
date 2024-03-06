import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import GroupsIcon from "@mui/icons-material/Groups";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";

export default function NavigationBar() {
  return (
    <React.Fragment>
      <Tooltip title="伝統工芸マップ">
        <IconButton color="inherit" component={RouterLink} to="/">
          <MapIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="「手のひらに和を」とは">
        <IconButton color="inherit" component={RouterLink} to="/about">
          <GroupsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="お知らせ">
        <IconButton color="inherit" component={RouterLink} to="/infomation">
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="写真">
        <IconButton color="inherit" component={RouterLink} to="/photo">
          <InsertPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="SNS">
        <IconButton color="inherit" component={RouterLink} to="/sociallinks">
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
