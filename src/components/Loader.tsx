import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoaderProps {
  message?: string; // Mensagem opcional para o loader
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
    {message && <Typography mt={2}>{message}</Typography>}
  </Box>
);

export default Loader;