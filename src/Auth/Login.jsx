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