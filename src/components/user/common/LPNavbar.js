import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function LPNavbar() {
  return (
    <AppBar position="static" sx={{ background: "linear-gradient(to right, #bb268c, #f0768c)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/lp"
          sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
        >
          Shopatos
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
          {/* Add any public links here if needed */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
