import { inject } from 'inversify';
import { controller, httpGet, interfaces, TYPE } from 'inversify-koa-utils';
import TAGS from '../constant/TAGS';
import { IIndex } from '../interface/IIndex';
import { IRouterContext } from 'koa-router';
import { provideThrowable } from '../ioc';
// import {BaseContext} from "koa"

@provideThrowable(TYPE.Controller, 'IndexController')
@controller('/')
export default class IndexController implements interfaces.Controller {
  private indexService: IIndex;
  constructor(@inject(TAGS.IndexService) indexService: IIndex) {
    this.indexService = indexService;
  }
  @httpGet('/')
  private async index(
    ctx: IRouterContext,
    next: Promise<unknown>
  ): Promise<any> {
    const data = this.indexService.getUser(1);
    ctx.body = {
      data,
    };
  }
}
