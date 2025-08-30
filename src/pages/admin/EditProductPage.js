import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from route

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    subtitle: "",
    image: null, // Can be new uploaded file
    existingImage: "", // Existing image URL
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false,
    price: false,
  });

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setFormData({
          name: data.name,
          category: data.category,
          price: data.price,
          subtitle: data.subtitle || "",
          image: null,
          existingImage: data.image, // store current image URL
        });
      } catch (err) {
        console.error(err);
        setToast({ open: true, message: "Failed to load product", severity: "error" });
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      category: !formData.category,
      price: !formData.price,
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
    if (formData.image) data.append("image", formData.image); // only if new image selected

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      const responseData = await res.json();

      if (res.ok) {
        setToast({ open: true, message: "Product updated successfully!", severity: "success" });
        setTimeout(() => navigate("/admin/products"), 1000);
      } else {
        setToast({ open: true, message: responseData.message || "Failed to update product", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Something went wrong", severity: "error" });
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
        Edit Product
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
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Label + Button on same line */}
              <Box display="flex" alignItems="center" gap={5}>
                <Typography sx={{ minWidth: 120 }}>Image</Typography>
                <Button variant="contained" component="label" sx={{ width: 150 }}>
                  {formData.image ? formData.image.name : "Change Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
              </Box>

              {/* Image Preview */}
              {(formData.image || formData.existingImage) && (
                <Box
                  component="img"
                  src={
                    formData.image
                      ? URL.createObjectURL(formData.image)
                      : `${process.env.PUBLIC_URL}${formData.existingImage}`
                  }
                  alt="Product Preview"
                  sx={{ ml: 20, width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
                />
              )}
            </Box>

            
          </Stack>
        </form>
      </Paper>

      {/* Buttons bottom-right */}
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
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
