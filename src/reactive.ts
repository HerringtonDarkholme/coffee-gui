class Dep {
  private watchers = new Set<Dep>()

  watch(watchee: Dep) {
    watchee.watchers.add(this)
  }
  notify() {
    for (let child of this.watchers) {
      child.notify()
    }
  }
}
export class Watcher extends Dep {
  callback = () => {}
  notify() {
    this.callback()
    super.notify()
  }
}

let currentDep: Dep

export function setRootDep() {
  return currentDep = new Watcher
}

export function defineReactive(obj: any): any {
  if (!obj || typeof obj !== 'object' || obj.__ob__) {
    return obj
  }
  const deps: Record<string|symbol, Dep> = {}
  const ret: any = new Proxy(obj, {
    get(target: any, prop: any) {
      if (!deps[prop]) {
        deps[prop] = new Dep()
      }
      const dep = deps[prop]
      let lastDep = null
      if (currentDep) {
        currentDep.watch(dep)
        lastDep = currentDep
        currentDep = dep
      }
      const ret = defineReactive(target[prop])
      if (lastDep) {
        currentDep = lastDep
      }
      return ret
    },
    set(target: any, prop: any, value) {
      target[prop] = value
      if (prop.startsWith('_')) {
          return true
      }
      const dep = deps[prop]
      if (dep) {
        dep.notify()
      }
      return true
    }
  })
  ret.__ob__ = true
  return ret
}
