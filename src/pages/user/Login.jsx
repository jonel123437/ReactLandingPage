import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  // Regular email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setMessageType("success");
        setMessage("Login successful!");

        window.dispatchEvent(new Event("storage"));
        setTimeout(() => navigate("/home"), 200);
      } else {
        setMessageType("error");
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessageType("error");
      setMessage("Error: " + err.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setMessageType("success");
        setMessage("Google login successful!");
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => navigate("/home"), 200);
      } else {
        setMessageType("error");
        setMessage(data.message || "Google login failed");
      }
    } catch (err) {
      setMessageType("error");
      setMessage("Error: " + err.message);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Login</Typography>
          {message && <Alert severity={messageType} sx={{ mb: 2 }}>{message}</Alert>}

          {/* Email/password login form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>OR</Divider>

          {/* Google login button */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              setMessageType("error");
              setMessage("Google login failed");
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
