import React, { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerLoginStatus, getCustomerProfile, logoutCustomer } from '../redux/features/Customers/CustomerSlice';
import { ToastContainer } from 'react-toastify';
import theme from '../themes';
import Routes from '../routes/index';
import NavigationScroll from './NavigationScroll';

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  // Destructuring `customer` to use inside the effect
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('access_token');
      const expiry = localStorage.getItem('token_expiry');
      const isValidToken = token && expiry && Date.now() < parseInt(expiry, 10);

      if (!isValidToken) {
        // console.warn('No valid token. Skipping session check.');
        dispatch(logoutCustomer());
        return;
      }

      try {
        const status = await dispatch(getCustomerLoginStatus()).unwrap();
        if (status && !customer) {
          await dispatch(getCustomerProfile()).unwrap();
        }
        // }
      } catch (error) {
        // console.error('Session check failed:', error);
        dispatch(logoutCustomer());
      }
    };
    initSession();
  }, [dispatch, customer]);

  return (
    <>
      <NavigationScroll>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme(customization)}>
            <CssBaseline />
            <Routes />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </ThemeProvider>
        </StyledEngineProvider>
      </NavigationScroll>
    </>
  );
};

export default App;
