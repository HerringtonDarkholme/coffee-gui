import stringHash from 'string-hash'

type StyleObj = Record<string, string>

const styleMap = new Map<string, StyleObj>()

function hashStyle(styleObj: StyleObj) {
  return stringHash(JSON.stringify(styleObj)).toString(36)
}

const prefix = '$$style$$'

class Style {
  hash: string

  constructor(private styleObj: StyleObj) {
    this.hash = prefix + hashStyle(styleObj)
  }

  *[Symbol.iterator]() {
    yield this.styleObj
  }

  toString() {
    styleMap.set(this.hash, this.styleObj)
    setTimeout(() => {
      styleMap.delete(this.hash)
    }, 10)
    return this.hash
  }
}

export function style(...objs: StyleObj[]): Style {
  const ret: StyleObj = {}
  for (let obj of objs) {
    for (let key in obj) {
      ret[key] = obj[key]
    }
  }
  return new Style(ret)
}

export function getStyle(hash: string): StyleObj {
  return styleMap.get(hash) || {}
}

export function stylish(func: any): any {
  return new Proxy(func, {
    get(target: any, prop: any) {
      if (prop.startsWith(prefix)) {
        func.__style__ = styleMap.get(prop)
        return target
      }
      return func[prop]
    }
  })
}
