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
  const { isLoggedIn, login } = useContext(AuthContext);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Get currently logged-in user (for dynamic brand text in footer)
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const brandText = currentUser?.brandText || "Your Brand";

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === email && u.password === password
    );

    if (user) {
      login(user); // This saves user to context + localStorage
    } else {
      alert("Invalid email or password!");
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
      {/* LEFT PANEL */}
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

          /* Adjust for small height screens */
          "@media (max-height: 700px)": {
            pt: 6,
            pb: 6,
          },
        }}
      >
        {/* Glow elements responsive */}
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

        {/* Floating Icons */}
        {[
          { emoji: "🛒", top: "5%", left: "6%" },
          { emoji: "📦", bottom: "5%", left: "5%" },
          { emoji: "💰", top: "7%", right: "10%" },
          { emoji: "📊", bottom: "10%", right: "6%" },
        ].map((f, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: f.top,
              bottom: f.bottom,
              left: f.left,
              right: f.right,
              fontSize: { xs: 18, sm: 26, md: 32, lg: 36 },
              animation: `float ${6 + i}s ease-in-out infinite`,
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          >
            {f.emoji}
          </Box>
        ))}

        {/* Title */}
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
            position: "relative",
          }}
        >
          Stock Inventory
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            mt: { xs: 1.5, sm: 2 },
            textAlign: "center",
            maxWidth: 560,
            px: { xs: 1, sm: 2 },
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            opacity: 0.95,
            textShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
        >
          Effortlessly manage inventory, track products, and optimize warehouse
          operations with a clean and intuitive interface.
        </Typography>

        {/* Features */}
        <Box
          sx={{
            mt: { xs: 3, sm: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: { xs: 1.5, sm: 2 },
            width: "100%",
            maxWidth: 500,
          }}
        >
          {[
            {
              emoji: "📦",
              title: "Products",
              desc: "Add, update, and track items",
            },
            {
              emoji: "🛒",
              title: "Orders",
              desc: "Manage online & offline sales",
            },
            { emoji: "📊", title: "Analytics", desc: "Monitor stock trends" },
            {
              emoji: "🏷️",
              title: "Pricing",
              desc: "Set discounts & bulk pricing",
            },
          ].map((f, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, md: 2 },
                p: { xs: 1.5, md: 2 },
                borderRadius: "24px 0px 24px 0px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Box
                sx={{
                  width: { xs: 38, sm: 44, md: 50 },
                  height: { xs: 38, sm: 44, md: 50 },
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                {f.emoji}
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                >
                  {f.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Badge */}
        <Link
          href="https://www.frontial.com/"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            mt: { xs: 3, sm: 4 },
            px: { xs: 2, md: 3 },
            py: 1,
            borderRadius: "50px",
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
            display: "inline-block",
            background: "linear-gradient(90deg, #289DD9, #54A2D9, #94C8E9)",
          }}
        >
          🚀 Powered by <strong>Frontial Technologies</strong>
        </Link>
      </Box>


      {/* RIGHT PANEL - Premium Login Form */}
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 3, md: 4 },
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
              maxWidth: 460,
              width: "100%",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
              bgcolor: "white",
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #289DD9, #1e88e5)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    boxShadow: "0 15px 35px rgba(40,157,217,0.4)",
                  }}
                >
                  <Lock size={46} color="white" />
                </Box>
                <Typography variant="h4" fontWeight={800} color="#1a1a1a">
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  Sign in to access your inventory dashboard
                </Typography>
              </Box>

              {/* Form */}
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{
                    mt: 4,
                    py: 2,
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    borderRadius: 4,
                    textTransform: "none",
                    background: "linear-gradient(90deg, #289DD9, #1e88e5)",
                    boxShadow: "0 10px 30px rgba(40,157,217,0.4)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #1e88e5, #1976d2)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 40px rgba(40,157,217,0.5)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <LogIn size={24} style={{ marginRight: 12 }} />
                  Sign In Securely
                </Button>
              </form>

              {/* Links */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Link component="button" variant="body1" onClick={() => setShowForgot(true)} sx={{ color: "#289DD9", fontWeight: 600 }}>
                  Forgot Password?
                </Link>
                <span style={{ margin: "0 12px", color: "#999" }}>•</span>
                <Link component="button" variant="body1" onClick={() => setShowSignup(true)} sx={{ color: "#289DD9", fontWeight: 600 }}>
                  Create Account
                </Link>
              </Box>

              {/* Footer */}
              <Typography variant="body2" color="text.secondary" textAlign="center" mt={5}>
                © 2025 <strong>{brandText}</strong> • Powered by Frontial Technologies
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}