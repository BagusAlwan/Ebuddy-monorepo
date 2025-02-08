"use client";
import { Button, Box } from "@mui/material";
import { useAuth } from "@/hooks/userAuth";

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  return (
    <Box display="flex" justifyContent="center" padding={3}>
      <Button onClick={logoutUser} variant="contained" color="secondary">
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
