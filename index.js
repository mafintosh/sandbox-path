module.exports = class SandboxPath {
  constructor (opts) {
    if (typeof opts === 'string') opts = { cwd: opts }
    if (!opts) opts = {}

    this.cwd = opts.cwd || ''
    this.sep = opts.sep || '/'

    if (this.cwd.endsWith(this.sep)) this.cwd = this.cwd.slice(0, -1)
  }

  dirname (a) {
    return this.resolve(a, '..')
  }

  basename (a) {
    const result = this._join([], this._split(a))
    return result.pop() || ''
  }

  resolve (a, b) {
    let result = this._join([], this._split(a))
    result = this._join(result, this._split(b))
    return this._absolute(result)
  }

  relative (a, b) {
    const ta = this._split(this.normalize(a))
    const tb = this._split(this.normalize(b))

    const min = Math.min(ta.length, tb.length)
    let shared = 0

    for (let i = 0; i < min; i++) {
      if (ta[i] === tb[i]) shared++
    }

    const result = []
    for (let i = shared; i < ta.length; i++) result.push('..')
    for (let i = shared; i < tb.length; i++) result.push(tb[i])
    return result.join(this.sep)
  }

  normalize (a) {
    return this._absolute(this._join([], this._split(a)))
  }

  _join (result, parts) {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]

      switch (p) {
        case '..':
          result.pop()
          break

        case '.':
          break

        case '':
          if (i === 0) result = [ '' ]
          break

        default:
          result.push(p)
          break
      }
    }

    return result
  }

  _absolute (result) {
    if (!result.length) return this.cwd || this.sep
    if (result[0] === '') return result.length === 1 ? this.sep : result.join(this.sep)
    return this.cwd + this.sep + result.join(this.sep)
  }

  _split (a) {
    if (!a.length) return []
    return a.split(this.sep)
  }
}
