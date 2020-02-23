/*
 * @Description: 
 * @Author: ezr
 * @Date: 2019-06-24 13:44:01
 * @LastEditors: ezr
 * @LastEditTime: 2019-07-23 14:10:39
 */

import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Index from './index';
import { newPageStore } from '@/model';

ReactDOM.render(
  <Provider newPageStore={newPageStore}>
    <Index />
  </Provider>,
  document.getElementById('app')
);
