"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/hooks/userAuth";

const LoginPage = () => {
  const { loading, error, loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      paddingX={2}
    >
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
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <Button 
          onClick={() => loginWithEmail(email, password)} 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading} 
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
        <Button 
          onClick={loginWithGoogle} 
          variant="outlined" 
          color="secondary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;

