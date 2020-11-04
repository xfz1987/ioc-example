import { controller, inject } from '../ioc';
import { IIndexService } from '../interfaces';
import { TYPES } from '../constant/index';

@controller
export default class IndexController {
  private indexService: IIndexService;
  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    // 骗一下ts，xxx!
    this.indexService = indexService!;
    console.log('我是构造函数');
  }
  info(data: string) {
    this.indexService.log(data);
  }
}
