import React from 'react'
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DisplayCard = (props) => {
  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subheading}
        </Typography>
        <Typography variant="body2">
          {props.body}
        </Typography>
      </CardContent>
    </>
  );
}

export default DisplayCard;