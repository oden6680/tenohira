import * as React from "react";
import { Box, Typography, Container } from "@mui/material";

export const Footer = ()=> {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          フッタータイトル
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          フッターに関する情報やリンクなど
        </Typography>
      </Container>
    </Box>
  );
}
