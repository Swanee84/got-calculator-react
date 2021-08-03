import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './index.css';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import routes from './routes';

import koKR from 'antd/lib/locale/ko_KR';

import { Provider } from 'react-redux';
import rootSaga from './store_redux/sagas';
import configureStore from './store_redux/store';
const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={koKR}>
        <BrowserRouter>
          <div className="App">{renderRoutes(routes)}</div>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
