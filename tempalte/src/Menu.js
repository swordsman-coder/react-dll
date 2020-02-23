/*
 * @Description:
 * @Author: zjq
 * @Date: 2020-02-23 17:45:36
 * @LastEditors: zjq
 * @LastEditTime: 2020-02-23 17:50:09
 */
import newPagePage from './view/newPage';

const routes = [
  {
    path: '/newPage',
    exact: true,
    name: 'newPage',
    icon: 'home',
    component: newPagePage
  }
];
export default routes;
