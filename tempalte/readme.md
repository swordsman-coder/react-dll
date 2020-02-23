### 配置文件修改
### project.config.js

```
  module.exports = {
    env: NODE_ENV,
    basePath: __dirname,
    srcDir: path.resolve(__dirname, 'src'),
    outDir: path.resolve(__dirname, 'dist'),
    publicPath: NODE_ENV === 'development' ? './' : '/app/crm/dist/',
    esLint: false,
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react']
  };
```
> publicPath需要把路径配置成自己需要的路径 如crm项目, 则为/app/crm/dist/