import {src, dest} from 'gulp';

exports.default = function () {
  return src('src/*.ts')
    .pipe(dest('output/'))
}
