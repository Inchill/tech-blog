const SortService = require('../services/SortService.ts');

module.exports = {
    // 查询所有类型
    getAllSorts: async (ctx, next) => {
        await next();
        let sorts = await SortService.findAll();
        ctx.response.body = JSON.stringify(sorts);
    }
}