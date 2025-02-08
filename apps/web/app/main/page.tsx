"use client";
import { Box } from "@mui/material";
import WelcomeMessage from "@/components/welcomeMsg";
import FetchAllUsers from "@/components/fetchAllUsers";
import FetchUserData from "@/components/fetchUserData";
import UpdateUserForm from "@/components/updateUserForm";
import LogoutButton from "@/components/logoutButton";

const MainPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" paddingX={2}>
        <Box 
        sx={{
            width: "100%",
            maxWidth: { xs: 400, md: 650, lg: 1000 }, 
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white", 
          }}
      >
      <WelcomeMessage />
      <FetchAllUsers />
      <FetchUserData />
      <UpdateUserForm />
      <LogoutButton />
      </Box>
    </Box>
  );
};

export default MainPage;
