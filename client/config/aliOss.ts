const OSS = require('ali-oss');

const client = new OSS({
    bucket: 'chuck-blog-images',
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GAuVfSvi8JNgkrTrFDC',
    accessKeySecret: 'gn5xzH9BLJWll0iB9y01TqXAcjCk06'
});

export default client;