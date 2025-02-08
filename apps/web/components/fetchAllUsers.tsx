"use client";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/apis/userApi";
import { UserData } from "@/types/user";
import { List, ListItem, ListItemText, CircularProgress, Typography, Button, Box } from "@mui/material";

const FetchAllUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
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
      <Typography variant="h6">All Users: for fetching all the users</Typography>
      <Button onClick={handleFetchUsers} variant="contained">Fetch All Users</Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id || user.email}>
              <ListItemText primary={`Username: ${user.username}, Email: ${user.email}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FetchAllUsers;
