const OSS = require('ali-oss');

const client = new OSS({
    bucket: 'chuck-blog-images',
    region: 'oss-cn-beijing',
    accessKeyId: '',
    accessKeySecret: ''
});

export default client;
