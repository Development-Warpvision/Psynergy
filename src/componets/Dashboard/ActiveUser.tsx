import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { FunctionComponent, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



interface Agent {
    _id: string;
    email: string;
    loginStatus: boolean;
}

interface ChildComponentProps {
    // chatData: any;
    userData: Agent[];
}


const PinnedChatCards: FunctionComponent<ChildComponentProps> = ({ userData }) => {

    const [activeUser, setActiveUser] = useState(userData)

    console.log("agentdata", activeUser)
    console.log(userData);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            bottom: "0px !important",
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    const StyledBadge2 = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: 'rgba(255, 221, 85, 1)',
            bottom: "0px !important",
            color: 'rgba(255, 221, 85, 1)',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid currentColor',
                content: '""',
            },
        },
    }));
    const StyledBadge3 = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: ' rgba(197, 34, 31, 1)',
            bottom: "0px !important",
            color: 'rgba(255, 221, 85, 1)',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid currentColor',
                content: '""',
            },
        },
    }));

    const [showAllUsers, setShowAllUsers] = useState(false);

    const toggleShowUsers = () => {
        setShowAllUsers(!showAllUsers);
    };

    const displayedUsers = showAllUsers ? userData : userData.slice(0, 2); // Show all users or limit to 5

    return (
        <>
            <div style={{ minWidth: "100%", maxWidth: "100%", height: "100%", }}>
                <Box
                    sx={{
                        width: "100%",
                        height: '100%',
                        // backgroundColor: "primary.light",
                        // marginLeft: "-40px",
                        borderRadius: "20px",
                        boxShadow: 1,
                        background: "#383838",
                        py: 0.5,
                        ":hover": {
                            borderRadius: "16px",

                            borderColor: "primary.light",
                        },
                    }}
                    maxHeight={'100%'}
                    overflow={"clip"}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            p: 1,
                            m: 1,

                            borderRadius: 1,
                        }}
                    >
                        {/* <Box sx={{ color: "#007EF2" }}>{props.mainIcon}</Box>{" "} */}
                        <Typography
                            variant="h5"
                            fontSize={20}
                            fontWeight={500}

                            lineHeight={1.5}
                            fontStyle={"medium"}
                            textAlign={"center"}
                            component="h2"
                            color="#fff"
                        >
                            User Activity
                        </Typography>
                        <button
                            style={{



                                background: " linear-gradient(89.52deg, rgba(255, 255, 255, 0.81) -133.41%, #69008D -26.83%, #A339E9 105.22%)",
                                borderRadius: "11.47px",
                                color: "#fff",
                                display: 'flex',
                                alignItems: 'end',
                                margin: "auto",
                                padding: "8.45px",
                                justifyContent: "center"


                            }}
                            onClick={toggleShowUsers}

                        >
                            See More
                        </button>
                    </Box>

                    <List
                        sx={{ width: "100%", maxWidth: 360, marginLeft: "20px", overflowY: 'auto' }}
                    >
                        <div>
                            {displayedUsers.map(agent => (
                                <React.Fragment key={agent._id}>
                                    <Stack direction="row" spacing={4}>
                                        {agent.loginStatus ? (
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar alt="Remy Sharp" src="/Ellipse.png" />
                                            </StyledBadge>) : (<StyledBadge2
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar alt="Remy Sharp" src="/Ellipse.png" />
                                            </StyledBadge2>)}
                                        <p style={{
                                            color: "#fff",
                                            marginTop: "10px", fontFamily: "Poppins"
                                        }}>{agent.loginStatus ? 'Online' : 'Offline'}</p>
                                    </Stack>
                                    <br />
                                </React.Fragment>

                            ))}

                        </div>

                        {/* {chatData !== undefined ? (
                            chatData.map((e: any) => <PinnedChatUsers />)
                        ) : (
                            <Typography>No Active Users</Typography>
                        )} */}
                    </List>
                </Box>
            </div>
        </>
    );
}

export default PinnedChatCards;