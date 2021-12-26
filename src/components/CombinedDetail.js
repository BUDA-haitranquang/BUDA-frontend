import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageGrid from "./detail/ImageGrid";
import MainImage from "./detail/MainImage";
import ProductInformation from "./detail/information/ProductInformation";

CombinedDetail.propTypes = {};

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Google_Chrome_icon_%282011%29.svg/220px-Google_Chrome_icon_%282011%29.svg.png",
  "https://www.google.com/logos/doodles/2020/teachers-day-2020-bulgaria-6753651837108666-2x.jpg",
  "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png",
  "https://vtv1.mediacdn.vn/thumb_w/640/2021/7/23/1-1627002085850163434340.jpg",
];

function CombinedDetail(props) {
  const {data, Modal, Information, handleDelete} = props
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  console.log(data);
  return (
    <div>
      <Grid container spacing={1} style={{ width: "900px", margin: "0 auto" }}>
        <Grid item sm={1}>
          <ImageGrid images={images} onSelect={setSelectedImage} />
        </Grid>
        <Grid item sm={4} style={{ height: "100%" }}>
          <MainImage source={images[selectedImage]} />
        </Grid>
        <Grid item sm={7}>
          <Information data={data} />
        </Grid>
        <Grid container style={{ width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<EditIcon/>}
            sx={{width: "15%", marginRight: "2%"}}
            onClick={handleOpen}
          >
            Edit
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            endIcon={<DeleteIcon/>}
            sx={{width: "15%"}}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Grid>
        <Modal isOpen={isOpen} handleClose={handleClose} data={data} />
      </Grid>
    </div>
  );
}

export default CombinedDetail;
