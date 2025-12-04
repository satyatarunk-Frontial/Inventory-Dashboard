// src/Auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import users from "../data/users";
import { AuthContext } from "../App";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Lock, LogIn } from "lucide-react";
import Signup from "./Singup";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext); // Only login() is used

  // If already logged in → go to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === email && u.password === password
    );

    if (user) {
      // This triggers context update + localStorage + redirect
      login(user);
    } else {
      alert("Invalid email or password!");
      // Optional: clear fields
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: { xs: "auto", md: "100dvh" },
        minHeight: "100dvh",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
        position: { xs: "static", md: "fixed" },
        top: 0,
        left: 0,
        background: "white",
      }}
    >
      {/* ==================== LEFT PANEL (Beautiful Design) ==================== */}
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
          height: "100%",
          overflow: "hidden",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3, md: 5, lg: 6 },
          background:
            "linear-gradient(135deg, #352F5C 0%, #289DD9 40%, #94C8E9 100%)",
          position: "relative",
          "@media (max-height: 700px)": { pt: 6, pb: 6 },
        }}
      >
        {/* Glow effects */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            left: "10%",
            width: { xs: 80, sm: 120, md: 150, lg: 180 },
            height: { xs: 80, sm: 120, md: 150, lg: 180 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            filter: "blur(70px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: { xs: 110, sm: 150, md: 180, lg: 220 },
            height: { xs: 110, sm: 150, md: 180, lg: 220 },
            borderRadius: "50%",
            background: "rgba(40,157,217,0.25)",
            filter: "blur(90px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />

        {/* Floating emojis */}
        {[
          { emoji: "Shopping Cart", top: "5%", left: "6%" },
          { emoji: "Package", bottom: "5%", left: "5%" },
          { emoji: "Money Bag", top: "7%", right: "10%" },
          { emoji: "Chart Increasing", bottom: "10%", right: "6%" },
        ].map((item, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              fontSize: { xs: 18, sm: 26, md: 32, lg: 36 },
              animation: `float ${6 + i}s ease-in-out infinite`,
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          >
            {item.emoji}
          </Box>
        ))}

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mt: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem", lg: "3rem" },
            letterSpacing: 2,
            background: "#ffffff",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stock Inventory
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: "center",
            maxWidth: 560,
            px: 2,
            fontSize: { xs: "0.85rem", md: "1rem" },
            opacity: 0.95,
          }}
        >
          Effortlessly manage inventory, track products, and optimize warehouse
          operations with a clean and intuitive interface.
        </Typography>

        {/* Features grid */}
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            width: "100%",
            maxWidth: 500,
          }}
        >
          {[
            { emoji: "Package", title: "Products", desc: "Add, update, track items" },
            { emoji: "Shopping Cart", title: "Orders", desc: "Manage sales" },
            { emoji: "Chart Increasing", title: "Analytics", desc: "Monitor trends" },
            { emoji: "Tag", title: "Pricing", desc: "Discounts & bulk" },
          ].map((f, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: "24px 0 24px 0",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.8rem",
                }}
              >
                {f.emoji}
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {f.title}
                </Typography>
                <Typography variant="body2">{f.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Link
          href="https://www.frontial.com/"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            mt: 4,
            px: 3,
            py: 1,
            borderRadius: "50px",
            background: "linear-gradient(90deg, #289DD9, #54A2D9)",
            fontSize: "0.9rem",
          }}
        >
          Powered by <strong>Frontial Technologies</strong>
        </Link>
      </Box>

      {/* ==================== RIGHT PANEL (Login Form) ==================== */}
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          bgcolor: "#f8fafc",
        }}
      >
        {showForgot ? (
          <ForgotPassword onBack={() => setShowForgot(false)} />
        ) : showSignup ? (
          <Signup onBack={() => setShowSignup(false)} />
        ) : (
          <Card
            sx={{
              maxWidth: 420,
              width: "100%",
              boxShadow: 6,
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #289DD9, #54A2D9)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <Lock size={22} color="white" />
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  Sign In
                </Typography>
              </Box>

              {/* Form */}
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  size="medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    bgcolor: "#289DD9",
                    "&:hover": { bgcolor: "#1e88e5" },
                    textTransform: "none",
                    fontSize: "1.05rem",
                  }}
                >
                  <LogIn size={20} style={{ marginRight: 10 }} />
                  Login
                </Button>
              </form>

              {/* Links */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </Link>{" "}
                •{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowSignup(true)}
                >
                  New User? Signup
                </Link>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}