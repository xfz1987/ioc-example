interface IContainer {
  callback: () => {};
  singleton: boolean;
  instance?: {};
}

interface Newable<T> {
  new (...args: any[]): T;
}

class CreateIoc {
  private container: Map<Symbol, IContainer>;
  constructor() {
    this.container = new Map<Symbol, IContainer>();
  }
  bind<T>(key: Symbol, Fn: Newable<T>) {
    const callback = () => new Fn();
    this.container.set(key, { callback, singleton: false });
  }
  singleton<T>(key: Symbol, Fn: Newable<T>) {
    const callback = () => new Fn();
    this.container.set(key, { callback, singleton: true });
  }
  use<T>(namespace: Symbol) {
    let item = this.container.get(namespace);
    // console.log('🍊', item);
    if (!item) {
      throw new Error('namespace 不存在');
    }
    if (item.singleton && !item.instance) {
      // 挂但例
      item.instance = item.callback();
    }
    // return item.singleton ? item.instance : item?.callback();
    return item.singleton ? (item.instance as T) : (item?.callback() as T);
  }
}

export default CreateIoc;
