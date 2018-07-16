import { renderComponent} from './render'

export function component(cls: any) {
  const originProto = cls.prototype
  cls.prototype = autoBind(originProto)
  return (attr: object, childrenThunk: () => void) => {
    return renderComponent(cls, attr, childrenThunk)
  }
}

function autoBind(obj: object) {
  const cachedMethodMap = new WeakMap();
  return new Proxy(obj, {
    get(target: any, key, receiver) {
      let cachedMethods = cachedMethodMap.get(receiver);
      if (cachedMethods === undefined) {
        cachedMethods = Object.create(null);
        cachedMethodMap.set(receiver, cachedMethods);
      }
      if ({}.hasOwnProperty.call(cachedMethods, key)) {
        return cachedMethods[key];
      }
      const result = target[key];
      if (typeof result !== 'function') {
        return result;
      }
      const boundResult = result.bind(receiver);
      cachedMethods[key] = boundResult;
      return boundResult;
    }
  });
}
