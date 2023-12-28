import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import styles from "./entry.module.css";

const UserSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "user",
  });

  //   Check if user already logged in or not
  useEffect(() => {
    const userToken = localStorage.getItem("authorization");
    if (userToken) {
      const user = decodeToken(userToken);
      if (user.userType === "merchant") {
        navigate("/merchant", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        "https://qurinom-2-backend.onrender.com/user/signup",
        formData
      );
      const data = await response.data;

      if (data.message === "Successfully registered") {
        localStorage.setItem("authorization", data.token);
        if (data.userType === "merchant") {
          navigate("/merchant");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log("Signup error ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Typography component="div" className={styles.userEntryCard}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: 300 }}
        className={styles.UserEntryBox}
      >
        <Typography component="h1">Register Your Account</Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="outlined-textarea"
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="User Type"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value="user">User</option>
          <option value="merchant">Merchant</option>
        </TextField>

        <TextField
          id="outlined-multiline-static-password"
          label="Password"
          name="password"
          required
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          disabled={loading}
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "rgb(93, 23, 121)" }}
        >
          {loading ? (
            <CircularProgress size="30px" color="secondary" />
          ) : (
            "SIGN UP"
          )}
        </Button>
        <Link to="/login" className={styles.Link}>
          Already have an account? Login here
        </Link>
      </Box>
    </Typography>
  );
};

export default UserSignup;
