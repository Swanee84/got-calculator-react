import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './index.css';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import routes from './routes';

import koKR from 'antd/lib/locale/ko_KR';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={koKR}>
      <BrowserRouter>
        <div className="App">{renderRoutes(routes)}</div>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
