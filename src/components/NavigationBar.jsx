import * as React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

export const NavigationBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ width: 500 }}
    >
      <BottomNavigationAction label="最近" icon={<RestoreIcon />} />
      <BottomNavigationAction label="お気に入り" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="アーカイブ" icon={<ArchiveIcon />} />
    </BottomNavigation>
  );
}
