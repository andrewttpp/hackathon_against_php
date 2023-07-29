import React from 'react'
import AppRoutes from './routes';
import Header from './components/header';

export const MAIN_API_URL = 'http://localhost:8000/api'

const App = () => {


  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
