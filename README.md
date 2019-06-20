# sandbox-path

`require('path')`-like module that always returns posix-style paths with configurable `cwd`.

```
npm install sandbox-path
```

## Usage

``` js
const Path = require('sandbox-path')

const p = new Path('/') // set cwd

p.resolve('a', 'b', 'c') // returns '/a/b/c'
p.resolve('a', '../../b') // returns '/b'
p.resolve('/a', 'b', '/c') // returns '/c'
```

Useful when you need to do path manipulation that is unbound from the local filesystem (like using a virtual file system)

## API

#### `const path = new Path([cwd])`

Create a new path instance. Optionally you can set `cwd`, when is what any
relative paths will be resolved against before they are returned.

`cwd` defaults to `/`.

#### `const abs = path.resolve(a, b)`

Returns the result of resolving `b` from `a`.
The result of that is resolved against the `cwd`.

The returned path is always absolute and normalised (ie, no `..` sections).

#### `const rel = path.relative(a, b)`

Returnes the relative path from `a` to `b`.

#### `const abs = path.normalize(a)`

Normalize a path (ie resolve all `..` and `.` sections).

## License

MIT
