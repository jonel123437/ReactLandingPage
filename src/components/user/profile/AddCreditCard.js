import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, TextField, Button, Box, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCreditCard = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const validateCardNumber = (num) => /^\d{16}$/.test(num.replace(/\s+/g, ""));
  const validateName = (name) => name.trim().length > 0;
  const validateExpiry = (month, year) => {
    if (!month || !year) return false;
    const now = new Date();
    const expiryDate = new Date(year, month - 1);
    return expiryDate >= new Date(now.getFullYear(), now.getMonth());
  };
  const validateCvv = (num) => /^\d{3,4}$/.test(num);

  const handleSave = async () => {
    if (!validateCardNumber(cardNumber)) {
      setToast({ open: true, message: "Invalid card number", severity: "error" });
      return;
    }
    if (!validateName(cardholderName)) {
      setToast({ open: true, message: "Cardholder name is required", severity: "error" });
      return;
    }
    if (!validateExpiry(expMonth, expYear)) {
      setToast({ open: true, message: "Invalid expiry date", severity: "error" });
      return;
    }
    if (!validateCvv(cvv)) {
      setToast({ open: true, message: "Invalid CVV", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        paymentMethodId: "pm_test_123456789",
        brand: "visa",
        last4: cardNumber.slice(-4),
        expMonth,
        expYear,
      };

      await axios.post("http://localhost:5000/api/auth/cards", payload, { withCredentials: true });
      setToast({ open: true, message: "Card saved successfully!", severity: "success" });
      setTimeout(() => navigate("/profile/card-list"), 1000);
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to save card", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>Add Credit Card</Typography>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Card Number"
              fullWidth
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="1234 5678 9012 3456"
              inputProps={{ maxLength: 16 }}
            />
            <TextField
              label="Cardholder Name"
              fullWidth
              value={cardholderName}
              onChange={e => setCardholderName(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select value={expMonth} onChange={e => setExpMonth(e.target.value)}>
                  {months.map((m) => (
                    <MenuItem key={m} value={m < 10 ? `0${m}` : `${m}`}>{m < 10 ? `0${m}` : m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select value={expYear} onChange={e => setExpYear(e.target.value)}>
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label="CVV"
              fullWidth
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
              placeholder="123"
              inputProps={{ maxLength: 4 }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/profile/card-list")}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} sx={{ width: "100%" }}>{toast.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default AddCreditCard;
