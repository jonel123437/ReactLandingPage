import React from "react";
import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile Details", path: "/profile/details" },
    { label: "Add Credit Card", path: "/profile/add-card" },
  ];

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom textAlign="left">
        My Profile
      </Typography>

      <Stack spacing={2}>
        {menuItems.map((item, index) => (
          <Card 
            key={item.label} 
            sx={{ cursor: "pointer", width: "100%" }}
            onClick={() => navigate(item.path)}
          >
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1">{item.label}</Typography>
              <ArrowForwardIosIcon fontSize="small" color="action" />
            </CardContent>
            {index < menuItems.length - 1 && <Divider />}
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default ProfileMenu;
