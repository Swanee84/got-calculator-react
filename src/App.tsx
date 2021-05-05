import React from 'react';
import 'antd/dist/antd.css';
import Container from './layouts/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './pages/signin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sign" component={SignIn} />
          <Route path="/" component={Container} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
