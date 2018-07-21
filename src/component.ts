import { renderComponent } from './render'

export function component(cls: any) {
  const originProto = cls.prototype
  function ret(attr: object, childrenThunk: () => void) {
    return renderComponent(cls, attr, childrenThunk)
  }
  ret.prototype = cls.prototype
  return ret
}

