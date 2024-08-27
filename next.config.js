const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // experimental: {
  //   // 모노레포 베이스에서 두 디렉토리 위의 파일을 포함합니다
  //   outputFileTracingRoot: path.join(__dirname, '../../'),
  // }
};
