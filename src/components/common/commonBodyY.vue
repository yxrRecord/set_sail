<template>
    <div :ref="id" :id="id" class="common-bodyY-wrapper">
        <slot></slot>
        <div ref="top" class="top" :style="base?topStyle:bottomStyle">
            <slot name="top"></slot>
        </div>
        <div ref="dragE" v-show="drag" :class="['dragE',icon?'icon':'']">
            <span :class="['iconfont',icon]"></span>
        </div>
        <div ref="bottom" class="bottom" :style="base?bottomStyle:topStyle">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            local:String,           //本地配置
            icon: {
                type:String,
                default:"icon-tuozhuaiY"
            },
            drag:{
                type:Boolean,
                default:true
            },
            offset:{
                type:Number,
                default:0,
            },
            min:{                   //最小宽度
                type:[Number,String],
                default:200,
            },
            base:{                   
                type:Boolean,
                default:false,
            },
        },
        data() {
            let id = "bodyY" + (this.$moment().format("x") + parseInt(Math.random() * (100000000 + 1)));
            return {
                id:id,
                userPage:this.$store.getters.userPage,
                topOffset:0,
                baseOffset:10
            }
        },
        computed:{
            localName() {
                if(this.local)
                    return this.local + "-bottom";
                else
                    return null;
            },
            Offset() {
                return this.offset + 10;
            },
            topStyle() {
                let result = {
                    height:this.min + "px"
                }
                if(this.height)
                    result.height = this.height;
                if(this.localName && this.userPage[this.localName]) {
                    result.height = this.userPage[this.localName] + "px";
                }
                return result;
            },
            bottomStyle() {
                let height = 0;
                if(this.height)
                    height = this.height;
                else
                    height = this.min + "px";
                if(this.localName && this.userPage[this.localName])
                    height = this.userPage[this.localName] + "px";
                return {height: `calc(100vh - ${height} - ${this.topOffset}px - ${this.baseOffset}px)`};
            },
        },
        mounted() {
            this.addMove();
            window.addEventListener('resize',(e)=>{
                this.addMove();
            })
            // window.onresize = ()=> {
            //     this.addMove();
            // }
        },
        activated() {
            this.addMove();
        },
        methods:{
            addMove() {
                setTimeout(()=>{
                    if(!this.$refs[this.id])
                        return;
                    let clickY,dragging = false;
                    let windowHeight = document.body.offsetHeight;
                    this.topOffset = this.$refs[this.id].offsetTop;//computed重新计算用
                    let minHeight = this.min;
                    let maxHeight = windowHeight - this.topOffset - this.min - this.baseOffset;
                    this.$refs.dragE.onmousedown = (e)=> {
                        dragging = true;
                    }
                    if(this.base) {
                        if(this.$refs.bottom.offsetHeight < minHeight) {
                            this.$refs.bottom.style.height = minHeight+"px";
                            this.$refs.top.style.height = maxHeight+"px";
                        }else if(this.$refs.bottom.offsetHeight > maxHeight) {
                            this.$refs.bottom.style.height = maxHeight+"px";
                            this.$refs.top.style.height = minHeight+"px";
                        }else {
                            this.$refs.bottom.style.height = windowHeight - this.$refs.top.offsetHeight - this.topOffset - this.baseOffset + "px";
                        }
                    }else {
                        if(this.$refs.top.offsetHeight < minHeight) {
                            this.$refs.top.style.height = minHeight+"px";
                            this.$refs.bottom.style.height = maxHeight+"px";
                        }else if(this.$refs.top.offsetHeight > maxHeight) {
                            this.$refs.top.style.height = maxHeight+"px";
                            this.$refs.bottom.style.height = minHeight+"px";
                        }else {
                            this.$refs.top.style.height = windowHeight - this.$refs.bottom.offsetHeight - this.topOffset - this.baseOffset + "px";
                        }
                    }
                    this.$refs[this.id].onmousemove = ((e)=>{
                        if(dragging){
                            clickY = e.pageY;
                            let resHeight = clickY-this.topOffset;
                            if(resHeight>=maxHeight){
                                resHeight = maxHeight;
                            }
                            if(resHeight<=minHeight){
                                resHeight = minHeight;
                            }
                            this.$refs.top.style.height = resHeight+"px";
                            this.$refs.bottom.style.height = windowHeight - resHeight - this.topOffset - this.baseOffset + "px";
                            if(this.localName) {
                                this.$store.commit("updateUserPage",[this.localName,resHeight]);
                            }
                            this.$emit("change",resHeight);
                        }
                    });
                    this.$refs[this.id].onmouseup = (e)=> {
                        dragging   = false;
                        e.stoppropagation = true;
                    };
                },100)
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
.common-bodyY-wrapper {
    position: relative;
    .dragE {
        width: 100%;
        height:10px;
        cursor: n-resize;//row-resize;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        .iconfont {
            font-size: 2em;
            color: #9a8e8e;
        }
        &.icon {
            background-color: #eee;
        }
    }
    .top,.bottom {
        position: relative;
        .common-footer-wrapper {
            bottom: -40px;
        }
    }
}
</style>