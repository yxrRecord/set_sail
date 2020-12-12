<template>
    <div class="common-loading">
        <div class="common-loading-back"></div>
        <div class="common-loading-container">
            <vueLoading :type="type" :color="color" :size="{ width: '60px', height: '60px' }"></vueLoading>
            <span class="common-loading-text">{{text}}</span>
        </div>
    </div>
</template>

<script>
    import vueLoading from 'vue-loading-template'
    export default {
        name: "commonLoading",
        components: {
            vueLoading
        },
        props:{
            type:{
                type:String,
                default:"spiningDubbles",// balls// bars// beat// bubbles// cylon// spin// spiningDubbles// barsCylon
            },
            color:{
                type:String,
                default:"#198fff"
            },
            text:String
        },
        data(){
            return {
            }
        },
    }
</script>
<style type="text/scss" lang="scss">
    //loading样式
    .common-loading {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10000;
        .common-loading-back {
            height: 100%;
            opacity: 0.2;
        }
        .common-loading-container {
            position: absolute;
            top: calc(50% - 100px);
            left: calc(50% - 100px);
            width: 200px;
            height: 200px;
        }
        .common-loading-text {
            display: inline-block;
            padding: 5px;
            color: $color-primary;
        }
    }
</style>

