import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "black", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" color="white" gutterBottom>
          手のひらに和を
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Copyright © 2024 日本大学文理学部 次世代社会研究センター RINGS プロジェクト「手のひらに和を」
        </Typography>
      </Container>
    </Box>
  );
}
