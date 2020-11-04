import { fluentProvide } from 'inversify-binding-decorators';

let provideThrowable = (identifier, name) => {
  return fluentProvide(identifier).whenTargetNamed(name).done();
};

export { provideThrowable };
