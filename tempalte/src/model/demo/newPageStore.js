/*
 * @Description: 
 * @Author: ezr
 * @Date: 2019-07-20 14:02:24
 * @LastEditors: ezr
 * @LastEditTime: 2019-07-22 15:29:44
 */

import {
  observable, action
} from 'mobx';
import { getCardList } from '@/services/demo/newPageServices';

class Index {
  @observable list = []

  // 获取数据列表
  @action getList = async () => {
    const { Data } = await getCardList();
    this.list = Data;
  }
}
export default new Index();
