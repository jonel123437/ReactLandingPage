import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import mapImage from "../assets/map.png"; // replace with your map image

export default function Contact() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        mt: 8,
      }}
    >
      <Grid
        container
        spacing={{ xs: 10, md: 40 }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Left Side - Contact Form */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              width: "100%",
              // ✅ remove side padding on mobile
              px: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 3, textAlign: { xs: "center", md: "left" } }}
            >
              Contact
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                // ✅ force form to take full width
                width: "100%",
              }}
            >
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                sx={{ width: { xs: "90vw", md: "200%" }, ml: { xs: -2, md: 0 } }} // 👈 extend to screen
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                sx={{ width: { xs: "90vw", md: "200%" }, ml: { xs: -2, md: 0 } }}
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ width: { xs: "90vw", md: "200%" }, ml: { xs: -2, md: 0 } }}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  width: { xs: "90vw", md: "50%" }, // 👈 button also full width on mobile
                  ml: { xs: -2, md: 0 },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Grid>


        {/* Right Side - Map */}
        <Grid item xs={12} md={5}> {/* 👈 controls map width */}
          <Box
            component="img"
            src={mapImage}
            alt="Map"
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 2,
              display: { xs: "none", md: "block" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
