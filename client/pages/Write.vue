<template>
    <div id="write">
        <h1>写博客</h1>
        <div class="input-title">
            <at-input v-model="inputTitle" 
                placeholder="请输入文章标题..." :maxlength="50" :minlength="5"
                size="large"></at-input>
        </div>
        <div ref="editorElem" class="wt-container"></div>
        <div class="wt-sort">
            <at-select v-model="selectedSort" 
                clearable size="large" 
                placeholder="选择文章类型">
                <at-option :value="sort.sort_id" v-for="sort in sorts" 
                    :key="sort.sort_id">{{ sort.sort }}</at-option>
            </at-select>
        </div>
        <div class="wt-btns">
            <at-button type="primary" @click="publish">发布</at-button>
            <at-button @click="cancel">取消</at-button>
        </div>
    </div>
</template>

<script lang="typescript">
import E from 'wangeditor';
import { Input, Button, Select, Option } from 'at-ui';

export default {
    data() {
        return {
            editor: null,  // 富文本实例
            editorContent: '',
            inputTitle: '',
            sorts: [],  // 文章类型
            selectedSort: 'aaaaaa',
            mode: 'new',
            blog_id: ''
        }
    },
    props: ['cacheData'],
    components: {
        'at-input': Input,
        'at-button': Button,
        'at-select': Select,
        'at-option': Option
    },
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
        };
        this.editor.customConfig.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        this.editor.create(); // 创建富文本实例
    },
    created() {
        this.getAllSorts();
        if(this.$route.query.blog_id) {
            this.mode = 'edit';
            this.blog_id = this.$Base64.decode(this.$route.query.blog_id);
            this.getUserBlog(this.blog_id);
        }
    },
    methods: {
        // 获取文章类型
        getAllSorts() {
            this.axios.get('/blogs/sort').then(res => {
                this.sorts = res.data;
            }, err => {
                console.error(err);
            });
        },
        // 发布博客
        publish() {
            if(this.inputTitle === '') {
                this.$Message.warning('请输入文章标题!');
                return false;
            }
            if(this.editorContent === '') {
                this.$Message.warning('请输入内容!');
                return false;
            }
            if(this.selectedSort === '') {
                this.$Message.warning('请选择文章类型!');
                return false;
            }
            if(this.mode === 'new') {  // 新增博客
                let email = this.$store.getters.getUser.email;
                let blogFrom = {
                    title: this.inputTitle,
                    content: this.editorContent,
                    sort_id: this.selectedSort,
                    email: email,
                };
                this.axios.post('/blogs/new', blogFrom).then(res => {
                    let blog_id = res.data.blog_id;
                    this.$router.push({ 
                        name: 'blog', 
                        query: { blog_id: this.$Base64.encode(blog_id) } 
                    });
                    this.$Notify({
                        title: '通知',
                        message: '发布成功',
                        type: 'success'
                    });
                }, err => {
                    if(err.code === -1) {  // token鉴权失败
                        this.$Modal.info({
                            content: '登录过期,请重新登录!'
                        });
                        this.$store.commit('logout');
                        this.$router.push({ name: 'login' });
                    }
                });
            } else {    // 更新博客(根据博客id)
                let blogFrom = {
                    title: this.inputTitle,
                    content: this.editorContent,
                    sort_id: this.selectedSort,
                    blog_id: this.blog_id,
                };
                this.axios.put('/blogs/update', blogFrom).then(res => {
                    this.$router.push({ 
                        name: 'blog', 
                        query: { blog_id: this.$Base64.encode(this.blog_id) } 
                    });
                    this.$Notify({
                        title: '通知',
                        message: '修改成功',
                        type: 'success'
                    });
                }, err => {
                    if(err.code === -1) {  // token鉴权失败
                        this.$Modal.info({
                            content: '登录过期,请重新登录!'
                        });
                        this.$store.commit('logout');
                        this.$router.push({ name: 'login' });
                    }
                });
            }
        },
        cancel() {
            this.$router.push({ name: 'home' });
        },
        // 获取用户的所有博客
        getUserBlog(blog_id) {
            this.axios.get('/blogs/id/' + blog_id).then(res => {
                let blog = res.data[0];
                this.inputTitle = blog.title;
                this.editor.txt.html(blog.content);
                this.sorts.forEach(element => {
                    if(element.sort_id === blog.sort_id) {
                        this.selectedSort = element.sort;
                    }
                });
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
    #write
        padding 18px 24px;
        h1
            text-align center;
        .input-title
            margin 10px 0;
        .wt-container
            .w-e-text-container
                height 600px !important;
        .wt-btns
            display flex;
            justify-content flex-end;
            margin-top 10px;
            button:nth-child(2)
                margin-left 10px;
        .wt-sort
            margin 10px 0;
</style>