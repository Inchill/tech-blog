import Vue from 'vue';

export default Vue.filter('textFilter', (value: any) => {
    if (value !== null && value !== '') {
        var reg = /[\u4e00-\u9fa5]/g;
        var names = value.match(reg);
        value = names.join('');
        return value;
    } else {
        return '';
    }
})