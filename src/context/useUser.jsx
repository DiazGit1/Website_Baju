import { useContext } from 'react';
import { UserContext } from './userContext';  // Import context

// Hook untuk mengakses data pengguna
export const useUser = () => {
  return useContext(UserContext);  // Mengakses data pengguna dari context
};
