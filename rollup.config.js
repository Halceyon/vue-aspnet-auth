const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');
const buble = require('rollup-plugin-buble');
const pkg = require('./package.json');

const banner =
    '/*!\n' +
    ' * vue-aspnet-auth v' + pkg.version + '\n' +
    ' * Copyright Code HQ (Pty) Ltd.\n' +
    ' */\n';

rollup.rollup({
  input: 'src/main.js',
  plugins: [buble()],
  globals: {
    vue: 'Vue',
  },
})
.then(bundle =>
  bundle.generate({
    format: 'umd',
    banner,
    name: 'VueAspnetAuth',
  }).then(({ code }) => write('dist/vue-aspnet-auth.js', code, bundle)))
.then(bundle =>
  write('dist/vue-aspnet-auth.min.js', `${banner  }\n${
    uglify.minify(read('dist/vue-aspnet-auth.js')).code}`,
  bundle))
.then(bundle =>
  bundle.generate({
    format: 'es',
    banner,
    footer: 'export { Url, Http, Resource };',
  }).then(({ code }) => write('dist/vue-aspnet-auth.es2015.js', code, bundle)))
.then(bundle =>
  bundle.generate({
    format: 'cjs',
    banner,
  }).then(({ code }) => write('dist/vue-aspnet-auth.common.js', code, bundle)))
.catch(logError);

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(dest, code, bundle) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, (err) => {
      if (err) return reject(err);
      console.log(`${blue(dest)  } ${  getSize(code)}`);
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)  }kb`;
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return `\x1b[1m\x1b[34m${  str  }\x1b[39m\x1b[22m`;
}
