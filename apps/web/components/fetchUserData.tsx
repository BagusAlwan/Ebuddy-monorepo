"use client";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/apis/userApi";
import { UserData } from "@/types/user";
import { Typography, CircularProgress, Button, Box } from "@mui/material";
import { useAuth } from "@/hooks/userAuth";

const FetchUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUser = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetchUserData(user.uid);
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      gap={2}
    >
      <Typography variant="h6">User Data: for fetching user data</Typography>
      <Typography variant="h6">(if your a guest/google user, wont have any data)</Typography>
      <Button onClick={handleFetchUser} variant="contained">
        Fetch User Data
      </Button>
      
      {loading ? (
        <CircularProgress />
      ) : (
        userData && (
          <Typography variant="body1" textAlign="center">
            Name: {userData.username}, Email: {userData.email}
          </Typography>
        )
      )}
    </Box>
  );
};

export default FetchUserData;
