import Vue from 'vue';
const moment = require('moment');

export default Vue.filter('dateFormat', (value: any, formatString: string) => {
    return moment(value).format(formatString);
});