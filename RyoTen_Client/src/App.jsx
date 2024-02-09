import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard'
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Components/Home'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import TransactionDetails from "./Components/TransactionDetails";
// import MerchantContextProvider from './Components/Context/MerchantContextProvider';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactiondetails/:id" element={<TransactionDetails />} />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

