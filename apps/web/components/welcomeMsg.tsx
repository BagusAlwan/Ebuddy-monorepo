import { Box, Typography } from "@mui/material";
const WelcomeMessage = () => (
    <Box
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center"
    gap={2}
    >
        <Typography variant="h3" gutterBottom>Welcome!</Typography>
        <Typography variant="h4" gutterBottom>This is the main page for the EBUDDY app</Typography>
    </Box>
  );

  export default WelcomeMessage