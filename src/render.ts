import * as snabbdom from 'snabbdom'
import { VNode } from 'snabbdom/vnode'
import klass from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import listener from 'snabbdom/modules/eventlisteners'

import { defineReactive, setRootDep } from './reactive'

const patch = snabbdom.init([
  klass, props, style, listener
])

type Children = VNode[]
const childrenList: Children[] = []
const componentList: Component[] = []

export function renderTag(tag: string, attr: object, childrenThunk: () => void): VNode {
  childrenList.unshift([])
  childrenThunk()
  const children = childrenList.shift() || []
  const vnode = snabbdom.h(tag, attr, children)
  if (childrenList.length > 0) {
    childrenList[0].push(vnode)
  }
  return vnode
}

interface Component {
  $parent: Component | null
  $slot: Children
  _vnode: VNode
  render(): VNode
}
interface CompCtor {
  new(attr: object): Component
}

function autoBind(self: any) {
    const proto = self.constructor.prototype
    const methods = Object.getOwnPropertyNames(proto)
        .filter(k => k !== 'constructor' && typeof proto[k] === 'function')
    for (let m of methods) {
        self[m] = self[m].bind(self)
    }
}

export function renderComponent(ctor: CompCtor, attr: object, childrenThunk: () => void): VNode {
  let component = new ctor(attr)
  component = defineReactive(component)
  autoBind(component)
  const watcher = setRootDep()
  watcher.callback = () => {
    const newVNode = component.render()
    patch(component._vnode, newVNode)
    component._vnode = newVNode

  }
  component.$parent = componentList[0]
  componentList.unshift(component)
  childrenList.unshift([])
  childrenThunk()
  const children = childrenList.shift() || []
  component.$slot = children
  const vnode = component.render()
  component._vnode = vnode
  if (childrenList.length > 0) {
    childrenList[0].push(vnode)
  }
  return vnode
}
export interface Tag {
    (attr: object, childrenThunk: () => void): VNode
}

export function mount(container: HTMLElement, tag: Tag) {
    const vnode = tag({}, () => {})
    patch(container, vnode)
}

export function text(eles: string[]) {
  const t: any = Array.isArray(eles) ? eles[0] : eles
  if (childrenList.length > 0) {
    childrenList[0].push(t)
  }
  return t
}
