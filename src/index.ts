export { component } from './component'
export { style } from './style'
export { mount } from './render'

import { renderTag, text } from './render'

declare var global: any

for (let el of [
  'div', 'p', 'span'
]) {
  global[el] = (attr: object, child: () => void) => {
        return renderTag(el, attr, child)
  }
}
global.t = text
