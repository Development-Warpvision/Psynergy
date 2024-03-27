import { Box, Typography } from '@mui/material'
import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TypeCard = ({ color = '#5A68E0', icon = <InsertDriveFileIcon style={{ fontSize: "30px", color: '#000000' }} /> }) => {
    return (
        <Box sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}>
            <Box sx={{ bgcolor: color, borderRadius: 2, width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {icon}
            </Box>
            <Box >
                <Typography sx={{ color: "#ffffff" }}>Documents</Typography>
                <Typography sx={{ color: "#ffffff", fontSize: "13px" }}>126 files, 193MB</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                <ArrowForwardIosIcon style={{ fontSize: "20px", color: '#ffffff' }} />
            </Box>
        </Box>
    )
}

export default TypeCard
