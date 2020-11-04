import { IIndex } from '../interface/IIndex';
import { Model } from '../models/User';
import { provide } from 'inversify-binding-decorators';
import TAGS from '../constant/TAGS';

@provide(TAGS.IndexService)
export class IndexServices implements IIndex {
  private userStorage: Model.User[] = [
    {
      email: '495725428@qq.com',
      name: '老袁',
    },
    {
      email: 'wangning@yidengxuetang.com',
      name: '老王',
    },
  ];
  getUser(id: number) {
    let result: Model.User;
    result = this.userStorage[id];
    return result;
  }
}
