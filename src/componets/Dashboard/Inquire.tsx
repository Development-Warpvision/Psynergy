import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import ActiveUser from "./ActiveUser"
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Localization from "./Localization"
import {
    LinearProgress,
    styled
} from '@mui/material';

const VerticalBar = styled('div')<{ height: number; color: string }>((props) => ({
    width: '15px',
    height: `${props.height}px`, // Set the height based on the progress
    margin: '0 auto', // Center the bars horizontally
    background: props.color, // Set the background color based on the channel's color
    borderRadius: "39.95px",
}));




interface Channel {
    name: string;
    progress: number;
    icon: string;
    color: string;
}

const channels: Channel[] = [
    { name: 'WhatsApp', progress: 200, icon: 'whatsapp-logo.png', color: '#25d366' },
    { name: 'Facebook', progress: 180, icon: 'facebook-logo.png', color: 'blue' },
    { name: 'Instagram', progress: 160, icon: 'instagram-logo.png', color: '#bc2a8d' },
    { name: 'Gmail', progress: 130, icon: 'gmail-logo.png', color: '#dd4b39' },
    { name: 'Outlook', progress: 170, icon: 'outlook.png', color: '#0072c6' },
];

const StyledLinearProgress = styled(LinearProgress)({
    height: 5,
    borderRadius: 5,
    width: 148,
    margin: '0 auto 10px', // Add margin to create space between items
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
        background: 'linear-gradient(89.52deg, rgba(255, 255, 255, 0.81) -133.41%, #69008D -26.83%, #A339E9 105.22%)', // Set the background color
    },
});


type ButtonColors = {
    today: boolean;
    monthly: boolean;
    yearly: boolean;
};


// Define initial background color
const initialState: ButtonColors = {
    today: true,
    monthly: false,
    yearly: false,
};

interface Agent {
    _id: string;
    email: string;
    loginStatus: boolean;
}

interface ChildComponentProps {
    agentData: Agent[];
}

const Inquire: FunctionComponent<ChildComponentProps> = ({ agentData }) => {


    console.log('inq', agentData)
    const boxStyle = {
        width: '100%',
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // padding: '10px',
        // marginLeft: "-40px",
        position: 'relative',
        borderRadius: "20px",


    };
    const textStyles: React.CSSProperties = {
        color: 'white',
        textAlign: 'start',
        fontSize: '20px',
        display: "flex",
        alignItems: "center",
        marginTop: "14px",
        marginLeft: "10px",
    };
    const textStyles1: React.CSSProperties = {
        color: 'white',
        textAlign: 'start',
        fontSize: '20px',
        display: "flex",
        alignItems: "center",
        marginTop: "0px",
        marginLeft: "10px",
    };
    const secondBoxStyle: React.CSSProperties = {
        height: '90%',
        background: 'rgba(56, 56, 56, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginLeft: "10px",
        justifyContent: 'center',
    };
    const imageStyle: React.CSSProperties = {
        width: "40%",
        height: "120%",
        // objectFit:" cover",
        alignSelf: "flex-end",
        marginLeft: "160px",
        marginTop: "-100px",
    };
    // Define styles for the additional elements
    const [buttonColors, setButtonColors] = useState<ButtonColors>(initialState);

    // Function to handle button clicks
    const handleButtonClick = (selectedButton: keyof ButtonColors) => {
        const updatedColors = { ...initialState };
        updatedColors[selectedButton] = true;

        // Update the buttonColors state to trigger re-render
        setButtonColors(updatedColors);
    };

    // Define styles for the "Today" button
    const todayButtonStyles = buttonColors.today
        ? {
            width: '73.84px',
            height: '25.9px',
            padding: '6.45px 5.74px',
            borderRadius: '11.47px',
            color: "#fff",
            gap: '9.17px',
            marginTop: "10px",
            marginLeft: "10px",
            background: 'linear-gradient(89.52deg, rgba(255, 255, 255, 0.81) -133.41%, #69008D -26.83%, #A339E9 105.22%)',
            // Add other styles as needed
        }
        : {
            background: "transparent",
            border: 0,
            color: "#fff"
        };
    // Define the containerStyle for the new box


    // Use the buttonColors state to set the background color of buttons
    const buttonStyle = {
        background: buttonColors.today
            ? 'linear-gradient(89.52deg, rgba(255, 255, 255, 0.81) -133.41%, #69008D -26.83%, #A339E9 105.22%)'
            : '#fff',
        // Repeat similar code for 'Monthly' and 'Yearly' buttons
        // ...
    };

    // Define the containerStyle for the new box
    const containerStyle = {
        width: '100%',
        height: '95%',
        //  background: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    // Define styles for the additional elements using type assertion
    const additionalElementsStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
    };

    // Define styles for the Facebook logo
    const facebookLogoStyle = {
        width: '55.92px',
        height: '55.92px',
    };
    const facebookLogoStyle1 = {
        width: '30.92px',
        height: '30.92px',
    };
    // Define styles for the text below the Facebook logo
    const facebookTextStyles = {
        fontWeight: 300,
        fontSize: '12.9px',
        color: '#fff',
        marginTop: '5px',
    };

    // Define styles for the remaining logos
    const remainingLogosStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '0px',
        width: '100%',
    };

    // Define styles for the remaining logo text
    const remainingLogoTextStyles = {
        fontWeight: 300,
        fontSize: '12.9px',
        color: '#fff',
    };
    const agents = [
        { name: 'Agent 1', progress: 56 },
        { name: 'Agent 2', progress: 18 },
        { name: 'Agent 3', progress: 34 },
        { name: 'Agent 4', progress: 29 },
        { name: 'Agent 5', progress: 10 },
    ];

    return (
        <>
            <Grid container spacing={0.5} rowSpacing={2} columnSpacing={{ xs: 1, sm: 3, md: 2 }}>
                <Grid item xs={12} sm={6} md={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: 'start', order: { sm: 1, md: 1 } }}>
                    <Box sx={boxStyle}>
                        {/* Top Half */}
                        <div style={{
                            height: '50%',
                            borderTopLeftRadius: 20,  // Set the top-left corner border radius
                            borderTopRightRadius: 20, // Set the top-right corner border radius
                            borderBottomLeftRadius: 0, // Set the bottom-left corner border radius to zero
                            borderBottomRightRadius: 0,
                            background: 'linear-gradient(89.52deg, rgba(255, 255, 255, 0.405) -133.41%, rgba(105, 0, 141, 0.5) -26.83%, rgba(163, 57, 233, 0.5) 105.22%), rgba(56, 56, 56, 1)'
                        }}>
                            <div style={textStyles}>Welcome Back!</div>
                            <div style={textStyles1}>Convo Portal</div>
                            <img
                                src="cartoon.png"
                                alt="Cartoon"
                                style={imageStyle}
                            />
                        </div>

                        {/* Bottom Half */}
                        <div style={{
                            height: '50%',
                            background: 'rgba(56, 56, 56, 1)',
                            borderTopLeftRadius: 0,   // Set the top-left corner border radius to zero
                            borderTopRightRadius: 0,  // Set the top-right corner border radius to zero
                            borderBottomLeftRadius: 20,  // Set the bottom-left corner border radius
                            borderBottomRightRadius: 20,
                        }}>
                            <div style={secondBoxStyle}>
                                <div style={textStyles1}>Daniyal Raza</div>
                                <div style={textStyles1}>Admin</div>
                            </div>
                        </div>
                        <img
                            src="avatar.png"
                            alt="Avatar"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '15%',
                                transform: 'translate(-50%, -50%)',
                                width: '25%',
                                height: 'auto',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: { sm: 'end', }, order: { sm: 2, md: 2 } }}>
                    <Box sx={containerStyle}>
                        {/* Existing Box */}
                        {/* ... Your existing code ... */}

                        {/* New Box */}
                        <div style={{
                            width: '100%',
                            height: '430px',
                            backgroundColor: " #383838",
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: " 20px",
                            // marginLeft: "-80px"

                        }}>
                            <div>
                                <button
                                    style={{
                                        ...todayButtonStyles,
                                        marginRight: '10px', // Add margin to create space between buttons
                                    }}
                                    onClick={() => handleButtonClick('today')}
                                >
                                    Today
                                </button>
                                <button
                                    style={{
                                        background: "transparent",
                                        border: 0,
                                        color: "#fff",
                                        marginRight: '10px', // Add margin to create space between buttons
                                    }}
                                    onClick={() => handleButtonClick('monthly')}
                                >
                                    Monthly
                                </button>
                                <button
                                    style={{
                                        background: "transparent",
                                        border: 0,
                                        color: "#fff"
                                    }}
                                    onClick={() => handleButtonClick('yearly')}
                                >
                                    Yearly
                                </button>
                            </div>
                            <div style={additionalElementsStyle}>
                                <img src="facebook-logo.png" alt="Facebook Logo" style={facebookLogoStyle} />
                                <div style={facebookTextStyles}>Facebook Highest  90%</div>
                            </div>

                            <br /> <br /> <br />
                            <div style={remainingLogosStyle}>
                                <div>
                                    <img src="whatsapp-logo.png" alt="WhatsApp Logo" style={facebookLogoStyle1} />
                                    <div style={remainingLogoTextStyles}> 80%</div>
                                </div>
                                <div>
                                    <img src="instagram-logo.png" alt="Instagram Logo" style={facebookLogoStyle1} />
                                    <div style={remainingLogoTextStyles}>75%</div>
                                </div>
                                <div>
                                    <img src="gmail-logo.png" alt="Gmail Logo" style={facebookLogoStyle1} />
                                    <div style={remainingLogoTextStyles}>85%</div>
                                </div>
                                <div>
                                    <img src="outlook.png" alt="Gmail Logo" style={facebookLogoStyle1} />
                                    <div style={remainingLogoTextStyles}> 45%</div>
                                </div>
                            </div>
                            <button
                                style={{
                                    background: " linear-gradient(89.52deg, rgba(255, 255, 255, 0.81) -133.41%, #69008D -26.83%, #A339E9 105.22%)",
                                    borderRadius: "11.47px",
                                    color: "#fff",
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: "auto",
                                    padding: "12.45px"
                                }}

                            >
                                View More
                            </button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: { sm: 'end', }, order: { sm: 4, md: 3 } }}>
                    <Box sx={{ width: '100%', height: '95%' }}>
                        <ActiveUser userData={agentData} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: { sm: 'start' }, order: { sm: 3, md: 4 } }}>
                    <Box
                        width='100%'
                        height='100%'
                        bgcolor="rgba(56, 56, 56, 1)"
                        p={2}
                        color="white"
                        borderRadius={"20px"}
                    // marginLeft={"-40px"}
                    >
                        {/* Heading */}
                        <Typography variant="h6" gutterBottom textAlign={"center"} fontSize={20}>
                            Pending Tickets by Agents
                        </Typography>

                        {/* Row with Agent Name and Status */}
                        <Box display="flex" alignItems="center">
                            <Typography mt={2}>Agent Name</Typography>
                            <Typography mx={{md:15, sm:20 }} mt={2}>Status</Typography>
                        </Box>

                        {/* Agent Rows */}
                        {agents.map((agent, index) => (
                            <Box
                                key={index}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mt={1}
                            >
                                <Typography>{agent.name}</Typography>
                                <StyledLinearProgress variant="determinate" value={agent.progress} />
                                <Typography>{agent.progress}</Typography> {/* Display the progress number */}
                            </Box>
                        ))}

                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: { sm: 'start' }, order: { sm: 5, md: 5 } }}>
                    <Box
                        width='100%'
                        height='100%'
                        bgcolor="rgba(56, 56, 56, 1)"
                         p={3}
                        
                        color="white"
                        borderRadius="20px"
                        // mt={2}
                        // mx={2}
                    // marginLeft={"10px"}
                    >
                        {/* Headings */}
                        <Box

                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2} // Add margin at the bottom
                            mt={5}
                            

                        >
                            <Typography variant="h6" >Pending Inquiries</Typography>
                            <Typography variant="h6">New Inquiries</Typography>
                        </Box>

                        {/* Images */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={5}
                        >
                            <img width={130} src="pending-inquiries-image.png" alt="Pending Inquiries" />
                            <img width={130} src="new-inquiries-image.png" alt="New Inquiries" />
                        </Box>
                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} sx={{ bgcolor: "#222", display: 'flex', alignItems: 'center', justifyContent: { sm: 'end', md: 'end', lg:'end' }, order: { sm: 6, md: 6 ,lg:6} }}>
                    <Box
                        width='100%'
                        height='100%'
                        bgcolor="rgba(56, 56, 56, 1)"
                        p={2}
                        color="white"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        // marginLeft={"0px"}
                        borderRadius={"20px"}
                    // mt={4}
                    >
                        <Typography variant="h6">Channel Base Inquiries</Typography>

                        {/* Progress Bars */}
                        <Box
                            width="100%" // Make sure the bars stretch to the full width
                            display="flex"
                            alignItems="flex-end" // Align bars to the bottom
                        >
                            {/* Map through the channels */}
                            {channels.map((channel, index) => (
                                <Box key={index} display="flex" flexDirection="column" alignItems="center" mx={{md:1, sm:5, lg:'auto'}} >
                                    {/* Icon */}
                                    <VerticalBar height={channel.progress} color={channel.color} />
                                    <br />
                                    <img src={channel.icon} alt={`${channel.name} Logo`} width="24px" height="24px" />

                                    {/* Name */}
                                    <Typography variant="caption">{channel.name}</Typography>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={12} sx={{ bgcolor: "#222", order: { sm: 7, md: 7 } }} >
                    <Localization />
                </Grid>
            </Grid >

        </>
    )
}

export default Inquire;