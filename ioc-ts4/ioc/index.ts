// AST工具
import { parseScript } from 'esprima';
// 匹配正则
import { Pattern } from 'estree';
import { IndexService, IIndexService } from './loader';
import CreateIoc from './createIoc';
import { TYPES } from '../constant';
// 处理元数据
import 'reflect-metadata';

//管理需要注入的容器
const container = new CreateIoc();
container.bind<IIndexService>(TYPES.indexService, IndexService);

// ----------分界线------------------
// 获取函数的参数
function getParams(fn: Function) {
  const ast = parseScript(fn.toString());
  const node = ast.body[0];
  let fnParams: Pattern[] = [];
  if (node.type == 'FunctionDeclaration') {
    fnParams = node.params;
  }
  let validParams: string[] = [];
  fnParams.forEach(obj => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name);
    }
  });
  return validParams;
}

function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
  return obj.hasOwnProperty(key);
}

function inject(serviceIdentifier: Symbol): Function {
  return (target: Function, targetKey: string) => {
    if (!targetKey) {
      Reflect.defineMetadata(serviceIdentifier, container.use(serviceIdentifier), target);
    }
  };
}

// 必须保证范型 T 可 new
// 在ts中,{} 既可以是object,也可以代码块
const controller = <T extends { new (...args: any[]): {} }>(constructor: T) => {
  // 继承基本的constructor
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      const _params = getParams(constructor);
      let identity: string;
      for (identity of _params) {
        //这么写原来的constructor没有了，这样是不行的
        // this[identity] = new IndexService();
        if (hasKey(this, identity)) {
          this[identity] = Reflect.getMetadata(TYPES[identity], constructor);
        }
      }
    }
  }
  return Controller;
};

export { controller, inject };
