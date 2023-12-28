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
  import styles from './entry.module.css'
  
  const UserLogIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    // Check if user already logged in
    useEffect(() => {
        const userToken = localStorage.getItem("authorization");
        if(userToken){
          const user = decodeToken(userToken);
          if (user.userType === 'merchant') {
            navigate("/merchant", { replace: true });
          }else{
            navigate("/", { replace: true })
          }
        }
      }, []);
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
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
          "https://qurinom-2-backend.onrender.com/user/login",
          formData
        );
        const data = await response.data;
        if (data.message === "Successfully logged in") {
          localStorage.setItem("authorization", data.token);
          if(data.userType === "merchant"){
            navigate("/merchant");
          }else{
            navigate("/");
          }
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log("Log in error ", error.response.data);
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
          <Typography component="h1">Login Your Account</Typography>
  
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
            label="Password"
            name="password"
            type="password"
            required
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
              <CircularProgress
                size="30px"
                color="secondary"
              />
            ) : (
              "LOGIN"
            )}
          </Button>
          <Link to="/signup" className={styles.Link}>
            I dont have an account? Register here
          </Link>
        </Box>
      </Typography>
    );
  };
  
  export default UserLogIn;
  