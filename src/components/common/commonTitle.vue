<template>
    <div :class='["common-title-wrapper",{"showShadow":showShadow}]' :style="titleStyle">
        <div class="title-left">
            <div class="titleHead" v-if="title!==undefined">
                <!-- 此处title的信息 -->
                <div class="title">
                    <slot name="left">
                        <span v-if="icon" :class='["iconfont",icon]'></span>
                        <span v-else-if="number" class='title-number'>{{number}}</span>
                        <span v-else class="bg-icon-block"></span>
                    </slot>
                    <label v-if="title" class="titleName">{{title}}</label>
                    <slot></slot>
                    <span v-if="count" :class='["count"]'>{{count}}</span>
                    <slot name="options">
                        <span class="options" v-if="options">
                            ( <span v-for="(item,index) in options" :key="index">
                                <span v-if="item.name">{{item.name}}</span>
                                <span :class="item.class" @click="clickCount(item)">{{item.count}}</span>
                                <span>{{item.unit}}</span>
                                <span v-if="index<options.length-1">,</span>
                            </span>)
                        </span>
                    </slot>
                </div>
                <div class="titleOther">
                    <!-- 此处title的更多内容 -->
                    <slot name="right"></slot><!-- 片段分发>title右侧 -->
                </div>
            </div>
            <div class="titleBody">
                <slot name="content"></slot><!-- 片段分发>title下方 -->
            </div>
        </div>
        <div class="title-right">
            <slot name="button"></slot>
            <!-- <span class="el-icon-arrow-left"></span> -->
            <el-button v-if="showBack" type="primary" class="iconfont icon-fanhui" @click="onGoBack">返回</el-button>
        </div>
        <br>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            options: Array,
            height: String,
            icon: String,
            count: [Number, String],
            showBack: {
                type: Boolean,
                default: false
            },
            showShadow: {
                type: Boolean,
                default: false
            },
            border: {
                type: Boolean,
                default: false
            },
            number: [String, Number]
        },
        data() {
            return {}
        },
        computed: {
            titleStyle() {
                let result = {};
                if (!this.showShadow)
                    result.minHeight = "40px";
                if (this.height)
                    result.height = this.height;
                if (this.border) {
                    result.borderBottom = "1px solid #ddd";
                }
                return result;
            }
        },
        methods: {
            onGoBack() {
                
                if (sessionStorage[this.$store.state.sysPrefix+"doubleSys"]&&JSON.parse(sessionStorage[this.$store.state.sysPrefix+"doubleSys"]) && this.$store.state.historySysUrl) {
                    window.location.href = this.$store.state.historySysUrl
                    return
                }
                
                this.$router.back(-1)
                // window.history.go(-1)
            },
            clickCount(item) {
              this.$emit('clickCount', item)
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    $height: 45px;
    $smallHeight: 40px;
    $primary: $color-primary;
    .common-title-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        padding: 0 1rem;
        min-height: $height;
        position: relative;
        background-color: #fff;
        z-index: 1;

        &.showShadow {
            border-bottom: 5px solid rgba(238,238,238,1);;
        }

        .title-left {
            flex: 1;

            .titleHead {
                display: flex;
                align-items: center;

                .title {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    .title-number {
                        margin: 0 8px;
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        color: #fff;
                        border-radius: 10px;
                        background: $color-primary;
                        text-align: center;
                    }

                    .el-button.is-circle {
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        padding: 0;
                    }

                    .bg-icon-block {
                        display: inline-block;
                        width: 4px;
                        height: 16px;
                        background-color: $primary;
                        position: relative;
                        top: 2px;
                        margin-right: 5px;
                    }

                    .titleName {
                        font-size: 16px;
                        padding-right: 5px;
                    }

                    .options {
                        color: #999999;
                        padding-left: 6px;
                    }

                    .count {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 50%;
                        position: relative;
                        top: -4px;
                        color: #fff;
                        background-color: $color-danger;
                    }
                }

                .titleOther {
                    display: flex;
                    align-items: center;
                }
            }

            .titleBody {
                .cadreInfo {
                    display: flex;
                    align-items: center;

                    img {
                        width: 40px;
                        height: 50px;
                    }
                }

                .itemInfo {
                    margin-right: 6em;

                    .el-button {
                        padding: 3px 5px;
                    }
                }
            }
        }

        .title-right {
            display: flex;
            align-items: center;

            .el-button {
                margin-left: 10px;
            }
        }
    }

    @media screen and (max-width: 1366px) {
        .common-title-wrapper {
            min-height: $smallHeight;
        }
    }
</style>
