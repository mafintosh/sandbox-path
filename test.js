const tape = require('tape')
const Path = require('./')

tape('resolve', function (t) {
  const path = new Path('/')

  t.same(path.resolve('', ''), '/')
  t.same(path.resolve('a', 'b'), '/a/b')
  t.same(path.resolve('/a/', '/b/'), '/b')
  t.same(path.resolve('../../a', 'b/../b'), '/a/b')
  t.same(path.resolve('../../a/.///../../../a', 'b/../b/././././/'), '/a/b')
  t.same(path.resolve('//lz2tuure9', 'ic5qn2uzh8/../././..'), '/')
  t.end()
})

tape('resolve with cwd', function (t) {
  const path = new Path('/foo/bar')

  t.same(path.resolve('', ''), '/foo/bar')
  t.same(path.resolve('a', 'b'), '/foo/bar/a/b')
  t.same(path.resolve('/a/', '/b/'), '/b')
  t.same(path.resolve('../../a', 'b/../b'), '/foo/bar/a/b')
  t.same(path.resolve('../../a/.///../../../a', 'b/../b/././././/'), '/foo/bar/a/b')
  t.end()
})

tape('normalize', function (t) {
  const path = new Path('/')

  t.same(path.normalize(''), '/')
  t.same(path.normalize('../../../.././././../a/../b/c'), '/b/c')
  t.same(path.normalize('q/../../../.././././../a/../b/c/..'), '/b')
  t.end()
})

tape('relative', function (t) {
  const path = new Path('/')

  t.same(path.relative('/', '/'), '')
  t.same(path.relative('/a', '/a/b'), 'b')
  t.same(path.relative('/b/c', '/a/b'), '../../a/b')
  t.end()
})
