import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import users from "../data/users";
import { AuthContext } from "../App";
import { styled } from "@mui/material/styles";

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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const brandText = currentUser?.brandText || "Your Brand";

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === email && u.password === password
    );

    if (user) {
      login(user);
    } else {
      alert("Invalid email or password!");
    }
  };

  const GoogleSvg = () => (
    <svg width="22" height="22" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.7 30.47 0 24 0 14.62 0 6.51 5.38 2.55 13.22l7.98 6.19C12.64 13.16 17.88 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.55c0-1.62-.15-3.18-.39-4.68H24v9.04h12.6c-.54 2.92-2.12 5.38-4.53 7.09l7.04 5.49C43.77 37.16 46.1 31.34 46.1 24.55z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.41c-.46-1.37-.72-2.83-.72-4.41s.26-3.04.72-4.41L2.55 13.22C.91 16.55 0 20.14 0 23.99s.91 7.44 2.55 10.77l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 47.98c6.48 0 11.94-2.13 15.92-5.74l-7.04-5.49c-2.02 1.36-4.62 2.16-8.88 2.16-6.12 0-11.36-3.66-13.47-8.91l-7.98 6.19C6.51 42.62 14.62 47.98 24 47.98z"
      />
    </svg>
  );

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com";
  };

  const GoogleButton = styled(Button)({
    marginTop: "28px",
    width: "100%",
    maxWidth: "260px",
    padding: "10px 0",
    borderRadius: "50px",
    textTransform: "none",
    borderColor: "#d1d5db",
    borderWidth: "1px",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "&:hover": {
      borderColor: "#D9282F",
      backgroundColor: "#fff",
    },
  });

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
          width: { xs: "100%", md: "50%" },

          height: { xs: "65vh", sm: "68vh", md: "100dvh" },
          overflowY: { xs: "auto", md: "hidden" },
          overflowX: "hidden",

          maxWidth: { xs: "90%", sm: "85%", md: "100%" },
          mx: "auto",

          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          p: { xs: 2, sm: 3, md: 5, lg: 6 },

          background:
            "linear-gradient(135deg, #352F5C 0%, #289DD9 40%, #94C8E9 100%)",
          position: "relative",
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

        <Box
          sx={{
            width: { xs: 90, sm: 120, md: 150 },
            height: { xs: 90, sm: 120, md: 150 },
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/image.jpg"
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

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
          width: { xs: "100%", md: "50%" },

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          p: { xs: 3, md: 4 },
          bgcolor: "#f8fafc",

          maxWidth: { xs: "90%", sm: "85%", md: "100%" },
          mx: "auto",

          height: { xs: "auto", md: "85vh", lg: "80vh", xl: "100vh" },
          alignSelf: { md: "center" },
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
                  Sign In
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
                  Sign In
                </Button>
              </form>

              {/* Links */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => setShowForgot(true)}
                  sx={{ color: "#289DD9", fontWeight: 600 }}
                >
                  Forgot Password?
                </Link>
                <span style={{ margin: "0 12px", color: "#999" }}>•</span>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => setShowSignup(true)}
                  sx={{ color: "#289DD9", fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </Box>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleButton onClick={handleGoogleLogin}>
                  <GoogleSvg />{" "}
                  <span style={{ marginLeft: 8 }}>Login with Google</span>
                </GoogleButton>
              </div>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
