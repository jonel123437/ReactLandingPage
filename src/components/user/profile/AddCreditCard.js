import React from "react";
import { Card, CardContent, Typography, Stack, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCreditCard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Add Credit Card
      </Typography>
      
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Card Number" fullWidth />
            <TextField label="Cardholder Name" fullWidth />
            <TextField label="Expiry Date" fullWidth />
            <TextField label="CVV" fullWidth />
          </Stack>
        </CardContent>
      </Card>

      {/* Buttons outside the card */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button 
          variant="outlined" 
          color="secondary"
          onClick={() => navigate("/profile")} // go back to profile menu
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </div>
  );
};

export default AddCreditCard;
