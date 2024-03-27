import { Box, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import { green, red } from '@mui/material/colors';
import { styled } from '@mui/system';

interface ProfileUiProps {
    isOnline: boolean;
}
const StatusIndicator = styled('div')<ProfileUiProps>(({ theme, isOnline }) => ({
    width: theme.breakpoints.down('sm') ? '8px' : '12px',
    height: theme.breakpoints.down('sm') ? '8px' : '12px',
    borderRadius: '50%',
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: isOnline ? green[500] : red[500],
}));



const ProfileUi: React.FC<ProfileUiProps> = ({ isOnline }) => {
    return (
        <>
            <Box>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar alt="User Avatar" src="./avatar.png" sx={{ width: "150px", height: "150px" }} />
                    <StatusIndicator isOnline={isOnline} />
                </div>
            </Box>
            <Box sx={{ height: "20%", bgcolor: "#D9D9D9", borderRadius: 10, color: "#7AFF9F", mt: 0.2, pl: 5, pr: 5 }}>
                <Typography sx={{ fontSize: "18px" }}>
                    available
                </Typography>
            </Box>
        </>
    )
}

export default ProfileUi
