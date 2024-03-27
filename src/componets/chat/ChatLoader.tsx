import Box from "@mui/material/Box/Box";
import "../../assets/style/chat_loader.css";
const ChatLoader = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="loader"></div>
      </Box>
    </>
  );
};

export default ChatLoader;
