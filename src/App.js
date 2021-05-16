import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from './routes';
import { Layout } from "antd";

import CustomHeader from "./components/CustomHeader/index.jsx";
import CustomFooter from "./components/CustomFooter/index.jsx";
import AppProvider from "./Context";

import 'antd/dist/antd.css';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Layout style={{
          minHeight: '100vh',
        }}>
          <CustomHeader />
          <AppRouter />
          <CustomFooter />
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
