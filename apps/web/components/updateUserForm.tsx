"use client";
import { useState } from "react";
import { updateUserData } from "@/apis/userApi";
import { useAuth } from "@/hooks/userAuth";
import { Button, TextField, Box, Typography } from "@mui/material";

const UpdateUserForm = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUserData(user.uid, { username, email });
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h6">Update User Data</Typography>
      <TextField label="New Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="New Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" variant="contained">Update</Button>
    </Box>
  );
};

export default UpdateUserForm;
