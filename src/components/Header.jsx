import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () =>{
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          手のひらに和を
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
