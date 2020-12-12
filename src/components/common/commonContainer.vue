<template>
    <div :id="id" class="common-container-wrapper" :style='{height:Height}' ref="commonContainer">
        <slot></slot>
    </div>
</template>

<script>
    /* 分配容器高度    高度= 整个页面高度 - 距离浏览器顶部的距离
    * */
    export default {
        props:{
            offset: {
                type: Number,
                default: 0
            },
            height: [String,Number],//容器高度
            real:{//
                type:Boolean,
                default:false,
            }
        },
        data() {
            let id = "inp" + (this.$moment().format("x") + parseInt(Math.random() * (100000000 + 1)));
            return {
                id:id,
                offsetTop: 0,
                offsetBottom:0,
            }
        },
        mounted() {
            this.$nextTick(()=> {
                this.updateOffsetTop();
            })
            if(this.real) {
                $(window).resize(()=> {
                    this.updateOffsetTop();
                })
            }
        },
        computed: {
            Height() {
                if (this.refreshHeight)
                    this.$store.commit("updateRefreshHeight", false)
                if (this.height && this.height!== '0px') {
                    return this.height;
                };
                let offsetOther = this.offsetBottom;
                if($('.container-footer-wrapper').height())
                    offsetOther += $('.container-footer-wrapper').height()
                let offsetAll = this.offsetTop + offsetOther;
                if( Number(this.offset)>-1 ) {
                    offsetAll += this.offset;
                    return `calc(100vh - ${offsetAll}px)`;
                };
                return `calc(100vh - ${offsetAll}px - ${this.offset})`;
            },
            //重新渲染高度
            refreshHeight() {
                if (this.$store.state.refreshHeight) this.updateOffsetTop()
                return this.$store.state.refreshHeight
            },
        },
        methods: {
            //更新内容框距离浏览器顶端的距离
            updateOffsetTop() {
                this.offsetTop = this.$refs.commonContainer.getBoundingClientRect().top;
            }
        },
    }
</script>
<style type="text/scss" lang="scss">
    .common-container-wrapper {
        background-color: transparent;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
    }
</style>

