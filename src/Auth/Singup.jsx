import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { UserPlus, ArrowLeft } from "lucide-react";
import { useState } from "react";

function Signup({ onBack }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
    // Call backend later
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 420,
        boxShadow: 6,
        borderRadius: 4,
        borderLeft: "6px solid #289DD9",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <UserPlus size={28} color="#352F5C" />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              ml: 1.5,
              background: "linear-gradient(90deg, #352F5C, #289DD9, #54A2D9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </Typography>
        </Box>

        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(90deg, #289DD9, #54A2D9)",
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.2,
              boxShadow: "0px 4px 12px rgba(40,157,217,0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #54A2D9, #94C8E9)",
                boxShadow: "0px 6px 16px rgba(40,157,217,0.6)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "scale(0.97)",
                boxShadow: "0px 3px 8px rgba(40,157,217,0.5)",
              },
            }}
          >
            <UserPlus size={20} />
            Sign Up
          </Button>
        </form>

        <Button
          onClick={onBack}
          fullWidth
          variant="outlined"
          startIcon={<ArrowLeft size={20} />}
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            borderColor: "#289DD9",
            color: "#289DD9",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(40,157,217,0.08)",
              borderColor: "#1E88E5",
            },
          }}
        >
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );
}

export default Signup;
