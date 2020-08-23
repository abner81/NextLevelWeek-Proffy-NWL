import React from 'react';

import Routes from './routes';
import './assets/styles/globalStyles.css'
import AuthProvider from './contexts';

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
