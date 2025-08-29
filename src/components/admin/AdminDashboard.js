// src/components/admin/AdminDashboard.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Optional welcome message */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Welcome to your dashboard!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">42</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards or sections as needed */}
      </Grid>
    </Box>
  );
}
