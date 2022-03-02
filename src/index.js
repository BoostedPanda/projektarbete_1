import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { Provider } from "react-redux"
import store from "./redux/configureStore"
import { BrowserRouter as Router } from "react-router-dom"
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
        <NotificationsProvider position="top-center">
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
