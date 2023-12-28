import React from "react";
import { useCommonContext } from "../../StateManagement/ContextApi";
import styles from "./product.module.css";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProduct = () => {
  const { Products } = useCommonContext();
  const navigate = useNavigate()
  console.log(Products);
  return (
    <div className={styles.container}>
      {Products.products?.map((item, idx) => {
        return (
          <Card
            key={idx}
            className={styles.productCard}
            sx={{boxShadow:"0 0 10px black",backgroundColor:"rgb(230, 230, 230)"}}
          >
            <CardMedia
              component="img"
              className={styles.image}
              image={item.imageUrl} 
              alt={item.name} 
            />
            <CardContent>
              <div className={styles.productName} >{item.name}</div>
              <div  className={styles.productPrice} variant="body1">RS. {item.price}</div>
            </CardContent>
            <Typography component="div" sx={{display:"flex",justifyContent:"center"}}>
              <Button variant="contained" sx={{backgroundColor:"black"}} onClick={()=>navigate(`/singleproduct/${item._id}`)}>
                VIEW
              </Button>
            </Typography>
          </Card>
        );
      })}
    </div>
  );
};

export default UserProduct;
