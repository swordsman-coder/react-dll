/*
 * @Author: kusty 
 * @Date: 2019-06-10 22:02:37 
 * @Last Modified by: lizhaofeng
 * @Last Modified time: 2019-12-13 17:31:45
 */

//旧系统路由匹配
define(['crmNewRouterMap'], function () {
  return {
    template: {
      // 收费方案（新）
      'orderCrmShop': { url: "/app/crm/dist/charge/order/crmShop/index.html", js: "/app/crm/controller/NewPage/pages.js" },
    },
    router: {
      "/MyAccount/CrmShop": function () {
        templateManager.load("orderCrmShop");
      }
    }
  }
});
