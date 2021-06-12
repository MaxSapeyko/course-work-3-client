import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes';
import { Layout, ConfigProvider } from 'antd';
import SimpleBar from 'simplebar-react';
import 'moment/locale/uk';
import locale from 'antd/lib/locale/uk_UA';

import CustomHeader from './components/CustomHeader/index.jsx';
import CustomFooter from './components/CustomFooter/index.jsx';
import AppProvider from './Context';

import 'antd/dist/antd.css';

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <AppProvider>
        <Router>
          <Layout>
          <SimpleBar style={{ maxHeight: '100vh'}}>
            <CustomHeader />
            <AppRouter />
            <CustomFooter />
          </SimpleBar>
          </Layout>
        </Router>
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
