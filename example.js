const Path = require('./')

const p = new Path()

const r = p.relative('/a/b', '/a/b/c')
console.log(r)
