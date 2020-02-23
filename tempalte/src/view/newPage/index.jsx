/*
 * @Description:
 * @Author: ezr
 * @Date: 2019-07-17 16:19:23
 * @LastEditors: ezr
 * @LastEditTime: 2019-07-22 15:29:16
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table } from 'ezrd';
import 'ezrd/css/index.css';
import './index.less';

@inject('newPageStore')
@observer
class Index extends Component {
  componentDidMount() {
    const { newPageStore } = this.props;
    newPageStore.getList();
  }

  render() {
    const { newPageStore: { list } } = this.props;
    const columns = [{
      title: '会员卡图片',
      bodyRender: data => (
        <div
          style={{
            height: 30,
            background: data.Background.startsWith('http')
              ? `url(${data.Background}) center center no-repeat`
              : data.Background
          }}
        />
      )
    }, {
      title: '会员类型',
      name: 'Name'
    }, {
      title: '等级',
      name: 'LevelId'
    }, {
      title: '启用状态',
      bodyRender: data => (
        <div>
          {
            data.IsActive ? '启用' : '禁用'
          }
        </div>
      )
    }];
    return (
      <div className="init-wrap">
        <Table
          columns={columns}
          datasets={list}
          rowKey="item_id"
        />
      </div>
    );
  }
}

export default Index;
