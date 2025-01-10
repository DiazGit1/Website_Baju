import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { UserContext } from './userContext'; // Import context

// Membuat provider untuk membungkus komponen yang memerlukan akses ke data pengguna
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan data pengguna

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Menambahkan validasi prop untuk children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
