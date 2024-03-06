import * as React from "react";
import { IconButton, Badge, Tooltip } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import GroupsIcon from "@mui/icons-material/Groups";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";

export default function NavigationBar() {
  return (
    <React.Fragment>
      <Tooltip title="伝統工芸マップ">
        <IconButton color="inherit">
          <MapIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="「手のひらに和を」とは">
        <IconButton color="inherit">
          <GroupsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="お知らせ">
        <IconButton color="inherit">
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="写真">
        <IconButton color="inherit">
          <InsertPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="SNS">
        <IconButton color="inherit">
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
