// AST工具
import { parseScript } from 'esprima';
import { Pattern } from 'estree';
// 处理元数据
import 'reflect-metadata';

interface IIndexService {
  log(str: string): void;
}

class IndexService {
  log(str: string) {
    console.log(str);
  }
}

// 获取函数的参数
function getParams(fn: Function) {
  const ast = parseScript(fn.toString());
  // console.log(getParams);
  // ast
  // Script {
  // 	type: 'Program',
  // 	body: [
  // 		FunctionDeclaration {
  // 			type: 'FunctionDeclaration',
  // 			id: [Identifier],
  // 			params: [Array],
  // 			body: [BlockStatement],
  // 			generator: false,
  // 			expression: false,
  // 			async: false
  // 		}
  // 	],
  // 	sourceType: 'script'
  // }

  const node = ast.body[0];
  let fnParams: Pattern[] = [];
  if (node.type == 'FunctionDeclaration') {
    fnParams = node.params;
  }
  // fnParams: [ Identifier { type: 'Identifier', name: 'indexService' } ]
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

function inject(serviceIdentifier: string): Function {
  return (target: Function, targetKey: string) => {
    if (!targetKey) {
      Reflect.defineMetadata(serviceIdentifier, new IndexService(), target);
    }
  };
}

// 必须保证范型 T 可 new
// 在ts中,{} 既可以是object,也可以代码块
function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  // 继承基本的constructor
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      // console.log(constructor.toString());
      // function IndexController(indexService) {
      //   this.indexService = indexService;
      // }
      const _params = getParams(constructor); // [ 'indexService' ]
      let identity: string;
      for (identity of _params) {
        if (hasKey(this, identity)) {
          this[identity] = Reflect.getMetadata('indexService', constructor);
        }
      }
    }
  }
  return Controller;
}

@controller
class IndexController {
  private indexService: IIndexService;
  constructor(@inject('indexService') indexService?: IIndexService) {
    this.indexService = indexService!;
  }
  info(data: string) {
    this.indexService.log(data);
  }
}

// 有点蠢的办法
// const indexService = new IndexService();
// const intance = new IndexController(indexService);

// 注入方式(终极解决方案)
const intance = new IndexController();
intance.info('hello world'); // hello world
