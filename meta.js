/*
 * @Description: 
 * @Author: zjq
 * @Date: 2020-02-23 18:03:00
 * @LastEditors: zjq
 * @LastEditTime: 2020-02-23 18:03:55
 */
module.exports = {
  prompts: [{
        name: 'name',
        message: '项目的名称',
        default: 'projectName'
    }, {
        name: 'version',
        message: '项目的版本号',
        default: '1.0.0'
    }, {
        name: 'description',
        message: '项目的简介',
        default: `A project for react`
    }, {
        name: 'author',
        message: '作者',
        default: `ezr`
    }
  ]
}