export { component } from './component'
export { style } from './style'
export { mount } from './render'

import { renderTag, text } from './render'
import { stylish } from './style'

declare var global: any

for (let el of [
  'div', 'p', 'span'
]) {
  let ret = (attr: any, child: () => void) => {
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
    return renderTag(el, attr, child)
  }
  global[el] = stylish(ret)
}
global.t = text
