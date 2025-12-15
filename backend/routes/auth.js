const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

/* ================= SIGNIN ================= */

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  
  // check user
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    
    // if user NOT exists → create user
    if (result.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (email, password) VALUES (?, ?)";

      db.query(insertSql, [email, hashedPassword], (err) => {
        if (err) return res.status(500).json(err);

        const accessToken = jwt.sign(
  { email },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

return res.json({
  message: "User created & logged in",
  accessToken,
  user: { email },
});


      });
    } 
    // user exists → validate password
    else {
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
        
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      
      // create access token
const accessToken = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // token validity
);

return res.json({
  message: "Login successful",
  accessToken,
  user: {
    id: user.id,
    email: user.email,
  },
});



    }
  });
});

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Signup successful" });
        }
      );
    }
  );
});

/* ================= FORGOT PASSWORD ================= */
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Email not registered" });
      }
      
      res.json({ message: "Reset link sent (demo)" });
    }
  );
});

module.exports = router;