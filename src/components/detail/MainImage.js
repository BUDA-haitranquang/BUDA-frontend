/* eslint-disable jsx-a11y/alt-text */
import { Box } from '@mui/system'
import React from 'react'

export default function MainImage({source}) {
    return (
        <Box
            sx={{
                width: "100%",
                height: 300,
                padding: "10px",
                border: "2px solid #47719d",
                display: "flex",
                alignItems: "center"
            }}
        >
            <img src={source} width="100%"/>
        </Box>
    )
}
