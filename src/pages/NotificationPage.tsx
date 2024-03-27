 import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

const NotificationPage = () => {
    return (
        <div>
            <Typography variant="h5" component="h2" sx={{
                fontFamily: "poppins",
                fontSize: 20,
            }}>
                Notification
            </Typography>
            <Typography variant="h5" component="h2" sx={{
                fontSize: 20,
                color: "#007EF2"
            }}>
                New Messages*,
            </Typography>
            <List sx={{ width: '100%' }} >
                <ListItem alignItems="flex-start" sx={{ bgcolor: "white", borderRadius: 2, mb: 3 }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ bgcolor: "white", borderRadius: 2, mb: 3 }}>
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ bgcolor: "white", borderRadius: 2, mb: 3 }}>
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" component="h2" sx={{
                fontSize: 20,
                color: "#007EF2"
            }}>
                Recent Messages*,
            </Typography>
            <List sx={{ width: '100%' }} >
                <ListItem alignItems="flex-start" sx={{ borderRadius: 2, mb: 3 }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ borderRadius: 2, mb: 3 }}>
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                
            </List>
        </div >
    )
}

export default NotificationPage