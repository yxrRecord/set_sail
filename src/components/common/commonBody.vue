<template>
    <div :ref="id" :id="id" class="common-body-wrapper">
        <slot name="title"></slot>
        <div class="main-container">
            <div class="main-content">
                <slot>
                    <div class="main-content-side">
                        <div ref="left" class="left-content" :style="leftStyle">
                            <slot name="left"></slot>
                            <div ref="dragE" :class="['dragE',icon?'icon':'']">
                                <span :class="['iconfont',icon]"></span>
                            </div>
                        </div>
                        <div ref="right" class="right-content" :style="rightStyle">
                            <!-- {{rightStyle}} -->
                            <slot name="right"></slot>
                        </div>
                    </div>
                </slot>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            local:String,           //本地配置
            icon: {
                type:String,
                default:"icon-tuozhuaiX"
            },
            width:{                 //宽度-left
                type:String,
                default:"250px"
            },
            refresh:{               //刷新当前渲染布局
                type:Boolean,
                default:false
            },
            min:{                   //最小宽度
                type:[Number,String],
                default:250,
            },
            max:{                   //是否使用最大值
                type:Boolean,
                default:false,
            },
        },
        data() {
            let id = "bodyX" + (this.$moment().format("x") + parseInt(Math.random() * (100000000 + 1)));
            return {
                id:id,
                baseOffset:10,//基础偏移
                leftOffset:0,//左侧偏移
                userPage:this.$store.getters.userPage,
            }
        },
        computed:{
            localName() {
                if(this.local)
                    return this.local + "-left";
                else
                    return null;
            },
            leftStyle() {
                let result = {
                    minWidth:this.min + "px"
                }
                if(this.width)
                    result.width = this.width;
                if(this.localName && this.userPage[this.localName]) {
                    result.width = this.userPage[this.localName] + "px";
                }
                return result;
            },
            rightStyle() {
                let width = 0;
               if(this.width)
                    width = this.width;
                if(this.localName && this.userPage[this.localName])
                    width = this.userPage[this.localName] + "px";
                return {width: `calc(100% - ${width} - ${this.leftOffset}px - ${this.baseOffset}px)`};
            },
        },
        watch:{
            refresh(refresh) {
                this.addMove();
                this.$emit("update:refresh",false);
            }
        },
        mounted() {
            this.addMove();
            document.addEventListener('resize',(e)=>{
                this.addMove();
            })
            // window.onresize = ()=> {
            //     this.addMove();
            // }
        },
        activated() {
            this.addMove();
        },
        methods: {
            addMove() {
                let that = this;
                setTimeout(()=>{
                    if(!this.$refs[this.id])
                        return;
                    let clickX,dragging = false;
                    let windowWidth = document.body.offsetWidth;
                    this.leftOffset = this.$refs[this.id].offsetLeft;//computed重新计算用
                    let minWidth = this.min;
                    let maxWidth = windowWidth/3;// - this.leftOffset - this.min - this.baseOffset;
                    if (this.$refs.dragE)
                        this.$refs.dragE.onmousedown = (e)=> {
                            dragging = true;
                        }
                    if (this.$refs.right && this.$refs.left) {
                        if(this.$refs.right.offsetWidth <= minWidth) {
                            this.$refs.right.style.width = minWidth+"px";
                            this.$refs.left.style.width = maxWidth+"px";
                        }
                        if(this.$refs.left.offsetWidth <= minWidth) {
                            this.$refs.left.style.width = minWidth+"px";
                            this.$refs.right.style.width = maxWidth+"px";
                        }
                    }
                    this.$refs[this.id].onmousemove = ((e)=>{
                        if(dragging){
                            clickX = e.pageX;
                            let resWidth = clickX-this.leftOffset;
                            if(resWidth>=maxWidth){
                                resWidth = maxWidth;
                            }
                            if(resWidth<=minWidth){
                                resWidth = minWidth;
                            }
                            this.$refs.left.style.width = resWidth+"px";
                            this.$refs.right.style.width = windowWidth - resWidth - this.leftOffset - this.baseOffset + "px";
                            if(this.localName) {
                                this.$store.commit("updateUserPage",[this.localName,resWidth]);
                            }
                            this.$emit("change",resWidth);
                        }
                    });
                    this.$refs[this.id].onmouseup = (e)=> {
                        dragging   = false;
                        e.stoppropagation = true;
                    };
                    
                    console.log('执行了')
                },100)
            }
        },
    }
</script>
<style type="text/scss" lang="scss">
//全局容器样式
.common-body-wrapper {
    background-color: #f0f2f5;
    .main-content {
        background-color: #fff;
    }
    .main-content-side{
        display: flex;
        // overflow: hidden;
        .left-content {
            // margin-right: 10px;//10px;//5px;
            // margin-right: 10px;//10px;//5px;
            border-right: 1px solid #eee;//$color-border;
            background-color: #fff;
            padding-right: 1px;
            position: relative;
            .dragE{
                height: 100%;
                width: 10px;
                background-color:transparent;
                position: absolute;
                // right: -10px;
                right: -5px;
                top: 0;
                z-index: 100;
                cursor: e-resize;//col-resize;
                display: flex;
                align-items: center;
                justify-content: center;
                .iconfont{
                    font-size: 2em;
                    color: #9a8e8e;
                }
                &.icon {
                    background-color: #eee;
                }
            }
        }
        .right-content {
            flex: 1;
            background-color: #fff;
            position: relative;
            overflow: hidden;
        }
    }
}
@media screen and (max-width: 1280px) {
    .common-body-wrapper {
        .main-container {
            .main-content-side {
                .left-content{
                    max-width: 300px!important;
                    width: 300px;
                }
            }
        }

    }
}
</style>
