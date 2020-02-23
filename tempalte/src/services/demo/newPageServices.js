/*
 * @Description:
 * @Author: ezr
 * @Date: 2019-07-20 14:25:42
 * @LastEditors: ezr
 * @LastEditTime: 2019-07-22 15:29:57
 */

import http from '@/utils/Http';
import config from '@/config';

const { baseUrl } = config;

const getCardList = () => http.get(`${baseUrl}api/crm/vip/VipPayCard/List`);
const getCardListxxxx = () => http.get(`${baseUrl}xxxxx`);

export {
  getCardList,
  getCardListxxxx
};
