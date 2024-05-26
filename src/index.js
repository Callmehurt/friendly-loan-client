import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path={'/*'} element={<App/>} />
            </Routes>
          </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

