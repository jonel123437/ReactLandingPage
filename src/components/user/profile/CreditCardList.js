import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  Stack
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreditCardList = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const fetchCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/cards", { withCredentials: true });
      setCards(res.data.cards || []);
      if (res.data.cards.length > 0) setSelectedCard(res.data.cards[0]._id);
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to load cards", severity: "error" });
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSelect = (e) => setSelectedCard(e.target.value);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/cards/${id}`, { withCredentials: true });
      setToast({ open: true, message: "Card removed successfully", severity: "success" });
      fetchCards();
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to remove card", severity: "error" });
    }
  };

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom textAlign="left">Saved Credit Cards</Typography>

      <RadioGroup value={selectedCard} onChange={handleSelect}>
        <Stack spacing={1}>
          {cards.length === 0 && <Typography>No saved cards found.</Typography>}
          
          {cards.map((card, index) => (
            <React.Fragment key={card._id}>
              <Card sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <CardContent sx={{ display: "flex", alignItems: "center", width: "100%", padding: 1 }}>
                  <FormControlLabel
                    value={card._id}
                    control={<Radio />}
                    label={`**** **** **** ${card.last4}`}
                    sx={{ flexGrow: 1 }}
                  />
                  <IconButton onClick={() => handleRemove(card._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
              {index < cards.length - 1 && <Divider />}
            </React.Fragment>
          ))}

          {/* Add New Card Row */}
          <Card 
            sx={{ cursor: "pointer", width: "100%" }}
            onClick={() => navigate("/profile/add-card")}
          >
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1">Add New Card</Typography>
              <ArrowForwardIosIcon fontSize="small" color="action" />
            </CardContent>
            <Divider />
          </Card>

        </Stack>
      </RadioGroup>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} sx={{ width: "100%" }}>{toast.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default CreditCardList;
