import { renderComponent } from './render'
import { stylish } from './style'

export function component(cls: any) {
  const originProto = cls.prototype
  function ret(attr: any, child: () => void) {
    if (!attr) {
      attr = {}
    }
    if (typeof attr === 'function') {
      child = attr
      attr = {}
    }
    if (!child) {
      child = () => {}
    }
    attr.style = (ret as any).__style__
    ;(ret as any).__style__ = {}
    return renderComponent(cls, attr, child)
  }
  ret.prototype = cls.prototype
  return stylish(ret)
}

