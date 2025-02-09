"use client";
import { useState } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import { fetchRankedUsers } from "@/apis/userApi";

interface RankedUser {
  id: string;
  username: string;
  score: number;
}

const UserRanks = () => {
  const [ranks, setRanks] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchRanks = async () => {
    setLoading(true);
    try {
      const response = await fetchRankedUsers();
      console.log("Fetched ranks:", response);
      console.log("Ranks:", response.data.users);
      setRanks(response?.data.users || []); 
    } catch (error) {
      console.error("Error fetching ranks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      <Button onClick={handleFetchRanks} variant="contained" color="primary">
        Fetch User Ranks
      </Button>

      {loading ? (
        <CircularProgress />
      ) : ranks.length > 0 ? (
        ranks.map((user) => (
          <Typography key={user.id} variant="body1">
            {user.username}: Score {user.score}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No ranked users found.
        </Typography>
      )}
    </Box>
  );
};

export default UserRanks;
