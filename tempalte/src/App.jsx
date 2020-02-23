import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import * as store from './model';
import Layout from './Layout';
import './common.css';
import 'ezrd/css/index.css';

ReactDOM.render(
  <Provider {...store}>
    <Layout name="abc" />
  </Provider>,
  document.getElementById('app')
);
if (module.hot) {
  module.hot.accept();
}
