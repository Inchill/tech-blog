const SortModel = require('../models/SortModel.ts');

module.exports = {
    // 查询所有类型
    findAll: async () => {
        return await SortModel.findAll();
    }
}