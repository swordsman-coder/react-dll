module.exports = {
  "root": true, // 检测规则
  "env": {    // 使用环境
    "browser": true,
    "es6": true,
  },
  "extends": "airbnb", // 采用严格airbnb
  "globals": {},
  "parser": "babel-eslint", // 解析器
  "parserOptions": { // ecma的版本特性
    "ecmaFeatures": {
      "jsx": true,
      "legacyDecorators": true
    },
    "sourceType": "module",// 不处理script中的
    "ecmaVersion": 6 
  },
  "plugins": [
    "react" // 第三方标准
  ],
  "rules": {
    "quotes": [0, "prefer-single"], //单引号
    "no-var": 1, //对var警告
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-dupe-args": 2, //函数参数不能重复
    "no-empty": 2, //块语句中的内容不能为空
    "no-func-assign": 2, //禁止重复的函数声明
    "no-redeclare": 2, //禁止重复声明变量
    "no-undef": 2, //不能有未定义的变量
    "no-use-before-define": 2, //未定义前不能使用
    "camelcase": 1, //强制驼峰法命名
    "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
    "react/jsx-max-props-per-line": [1, {"maximum": 1}], // 限制JSX中单行上的props的最大数量
    "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
    "react/self-closing-comp": 2, //防止没有children的组件的额外结束标签
    "no-extra-boolean-cast": 0, //禁止不必要的bool转换
    "comma-dangle": ["error", "never"], //对象字面量项尾不能有逗号
    "linebreak-style": [0 ,"error", "windows"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0, // 先禁用prop-types检查
    "no-plusplus": 0, // 允许++
    "max-len": ["error", 280], //单行最大字符串长度
    'jsx-a11y/click-events-have-key-events': 0, //允许在非绑定元素上面绑定事件
    'jsx-a11y/no-noninteractive-element-interactions': 0,//允许在非绑定元素上面绑定事件
    'jsx-a11y/no-static-element-interactions': 0,
    "import/no-extraneous-dependencies": [0, { "devDependencies": true }],
    "react/jsx-curly-brace-presence":0
  },
  "settings": {
    "import/ignore": [
      "node_modules"
    ],
    'import/resolver': {
      webpack: {
        config: './config/webpack.base.config.js',
      },
    },
  }
};