<template>
    <div :class="['common-footer-wrapper',{'container-footer-wrapper':container}]">
        <div class="content gray9">
            <slot name="content">
                <slot>
                    <span :class='["title","iconfont",icon]'>{{title}}</span>
                </slot>
                <slot name="options">
                    <span v-if="options">(
                        <span v-for="(item,index) in options" :key="index">
                            <span v-if="item.name">{{item.name}}</span>
                            <span :class="item.class">{{item.count}}</span>
                            <span>{{item.unit}}</span>
                            <span v-if="index<options.length-1">,</span>
                        </span>)
                    </span>
                </slot>
            </slot>
        </div>
        <div class="other">
            <slot name="button">
                <slot name="more"></slot>
                <!-- <el-button size="medium" type="primary" @click="btnClick()" v-if="button">{{button}}</el-button> -->
            </slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'commonFooter',
        props:{
            options:Array,      //数据
            icon:String,        //图标
            title:String,       //文字title
            button:String,      //按钮文字
            container:Boolean,  //是否全局
        },
        data() {
            return {
            }
        },
        computed: {
        },
        mounted() {
        },
        watch: {
        },
        methods: {
            btnClick() {
                this.$emit('click');
            },
        }
    }
</script>
<style type="text/scss" lang="scss">
    .common-footer-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        box-shadow:0px -4px 4px 0px rgba(198,198,198,0.15);
        padding: 0 1em;
        background-color: #fff;
        z-index: 4;
        .content{
            flex: 1;
            .title{
                cursor: pointer;
                font-size: 1em !important;
            }
        }
        .el-button {
            font-size: 16px;
            padding: 6px 15px;
        }
    }
</style>
