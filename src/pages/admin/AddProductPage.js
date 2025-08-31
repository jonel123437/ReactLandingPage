import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    subtitle: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false,
    price: false,
    image: false,
  });

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setErrors((prev) => ({ ...prev, image: false }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const newErrors = {
      name: !formData.name.trim(),
      category: !formData.category,
      price: !formData.price,
      image: !formData.image,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("subtitle", formData.subtitle);
    data.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const responseData = await res.json();
      if (res.ok) {
        setToast({ open: true, message: "Product added successfully!", severity: "success" });
        // Redirect after a short delay
        setTimeout(() => navigate("/admin/products"), 1000);
      } else {
        setToast({ open: true, message: responseData.message || "Failed to add product", severity: "error" });
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setToast({ open: true, message: "Something went wrong. Check console for details.", severity: "error" });
    }
  };

  const RequiredLabel = ({ text }) => (
    <Typography sx={{ minWidth: 120 }}>
      {text} <span style={{ color: "red" }}>*</span>
    </Typography>
  );

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>

      <Paper sx={{ p: 3, width: "100%", borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Product Name */}
            <Box display="flex" alignItems="center" gap={5} pb={2}>
              <RequiredLabel text="Product Name" />
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                error={errors.name}
                helperText={errors.name ? "Product Name is required" : ""}
                sx={{ width: "50%" }}
              />
            </Box>
            <Divider sx={{ mx: -3 }} />

            {/* Category */}
            <Box display="flex" alignItems="center" gap={5} pb={2}>
              <RequiredLabel text="Category" />
              <FormControl sx={{ width: "25%" }} error={errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Trending">Trending</MenuItem>
                </Select>
                {errors.category && <FormHelperText>Category is required</FormHelperText>}
              </FormControl>
            </Box>
            <Divider sx={{ mx: -3 }} />

            {/* Price */}
            <Box display="flex" alignItems="center" gap={5}>
              <RequiredLabel text="Price" />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                error={errors.price}
                helperText={errors.price ? "Price is required" : ""}
                sx={{ width: "25%" }}
              />
            </Box>
            <Divider sx={{ mx: -3 }} />

            {/* Subtitle */}
            <Box display="flex" alignItems="center" gap={5}>
              <Typography sx={{ minWidth: 120 }}>Subtitle</Typography>
              <TextField
                label="Subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                fullWidth
                sx={{ width: "50%" }}
              />
            </Box>
            <Divider sx={{ mx: -3 }} />

            {/* Image Upload */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={5}>
                <RequiredLabel text="Image" />
                <Button variant="contained" component="label">
                  {formData.image ? formData.image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
                {errors.image && (
                  <Typography sx={{ color: "red", ml: 2 }}>Image is required</Typography>
                )}
              </Box>

              {/* Preview of uploaded image */}
              {formData.image && (
                <Box
                  component="img"
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  sx={{ ml: 20, width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
                />
              )}
            </Box>

          </Stack>
        </form>
      </Paper>

      {/* Buttons bottom-right */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
