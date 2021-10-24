import { Grid, ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ImageGrid({ images, onSelect }) {
  return (
    <Grid container direction="column" style={{border: '2px solid azure'}}>
      {images.map((image, i) => (
        <Box
          sx={{
            width: '100%',
            height: '65px',
            padding: '4px',
            border: '2px solid #47719d',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={image}
            width='100%'
            // height='65px'
            style={{cursor: "pointer"}}
            alt='list-item'
            onClick={() => {
              onSelect(i);
              console.log(i);
            }}
          />
        </Box>
      ))}
    </Grid>
    // <ImageList sx={{width: '80%', height: 300}} cols={1} rowHeight={60}>
    //   {images.map((image) => (
    //     <ImageListItem>
    //       <img
    //         src={image}
    //         alt='descriptive-figure'
    //         loading='lazy'
    //       />
    //     </ImageListItem>
    //   ))}
    // </ImageList>
  );
}
