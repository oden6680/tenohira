import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import NavigationBar from "./NavigationBar";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          手のひらに和を
        </Typography>
        <Box sx={{ display: "flex" }}>
          <NavigationBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
