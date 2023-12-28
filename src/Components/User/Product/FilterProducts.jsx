import React, { useState } from "react";
import { useCommonContext } from "../../StateManagement/ContextApi";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./product.module.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "rgb(211, 210, 210)",
  borderRadius: "7px",
};

const FilterProducts = () => {
  // States and function from context api
  const { openFilter, Products, handleCloseFilter, setFiltered, setProducts } =
    useCommonContext();

  const [loading, setLoading] = useState(false);
  // Product details
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    priceMin: "",
    priceMax: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      // Verify if values are given or not
      const allFieldsEmpty = Object.values(formData).every(
        (value) => value === ""
      );

      if (allFieldsEmpty) {
        alert("Please fill in at least one field");
        return;
      }
      setLoading(true);
      // Perform action to filter products using formData
      const response = await axios.get(
        "https://qurinom-2-backend.onrender.com/api/products/filter",
        { params: formData }
      );
      const data = response.data;
      setProducts({ products: data });
      setFiltered(true);
      console.log(data);
    } catch (error) {
      // Handle error
      console.error("Error filtering products:", error.response);
    } finally {
      setLoading(false);
      handleCloseFilter();
    }
  };

  const categories = Products.categories;
  const subcategories = Products.subcategories;

  return (
    <Modal
      open={openFilter}
      onClose={handleCloseFilter}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={style}
        className={styles.UserEntryBox}
      >
        <IconButton
          onClick={handleCloseFilter}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CancelIcon color="error" />
        </IconButton>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            id="category"
            value={formData.category}
            onChange={handleChange}
            name="category"
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
          <Select
            id="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            name="subcategory"
            label="Subcategory"
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="priceMin"
          label="Price Min"
          name="priceMin"
          type="number"
          value={formData.priceMin}
          onChange={handleChange}
        />
        <TextField
          id="priceMax"
          label="Price Max"
          name="priceMax"
          type="number"
          value={formData.priceMax}
          onChange={handleChange}
        />
        <TextField
          id="location"
          label="Location"
          name="location"
          value={formData.location}
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
            "FILTER"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterProducts;
