import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9f9f9',
    }}>
      <ClipLoader
        color="#007bff"
        loading={true}
        size={60}
      />
    </div>
  );
};

export default Spinner;
