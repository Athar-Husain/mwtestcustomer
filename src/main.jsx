import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './assets/scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';
// import './index.css'
import App from './layout/App';

import { store } from './redux/store';
// const store = configureStore({ reducer });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
