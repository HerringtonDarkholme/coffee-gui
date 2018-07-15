import stringHash from 'string-hash'

type StyleObj = Record<string, string>

const styleMap = new Map<string, StyleObj>()

function hashStyle(styleObj: StyleObj) {
  return stringHash(JSON.stringify(styleObj)).toString(36)
}

class Style {
  hash: string

  constructor(private styleObj: StyleObj) {
    this.hash = hashStyle(styleObj)
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

export function style(...objs: StyleObj[]): StyleObj {
  const ret: StyleObj = {}
  for (let obj of objs) {
    for (let key in obj) {
      ret[key] = obj[key]
    }
  }
  return ret
}

export function getStyle(hash: string): StyleObj {
  return styleMap.get(hash) || {}
}
