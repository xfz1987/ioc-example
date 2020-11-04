import 'reflect-metadata';
import './ioc/loader';

import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

const container = new Container();
container.load(buildProviderModule());
let server = new InversifyKoaServer(container);
server
  .setConfig((app) => {
    //设置一些其他的中间件
  })
  .setErrorConfig((app) => {
    //写错误中间件
  });
let app = server.build();
app.listen(3000, () => {
  console.log('Inversify Server 启动成功');
});
