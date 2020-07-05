<template>
    <div id="app">
        <header v-if="$route.name !== 'register' && $route.name !== 'login' && $route.name !== 'write'">
            <header-section></header-section>
        </header>
        <main>
            <div class="content-wrapper"><router-view></router-view></div>
        </main>
    </div>
</template>

<script lang="typescript">
const Header = () => import('./components/Header.vue');

export default {
    data() {
        return {
            
        }
    },
    components: {
        'header-section': Header
    }
}
</script>

<style lang="stylus">
#app
    header 
        border-bottom: 1px solid #f1f1f1;
        width 1180px;
        margin 0 auto;
    main
        background-color: #f4f5f5;
        padding 10px;
        .content-wrapper
            background-color #fff;
            width 1180px;
            margin 0 auto;
</style>