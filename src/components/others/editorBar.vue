<template>
    <div id="editor-container">
        <div class="editor-header">
            <div ref="toolbar" class="toolbar"></div>
            <div class="editor-other">
                <slot name="other"></slot>
            </div>
        </div>
        <div ref="edit" :style="`height: ${height}px;min-height: ${height}px;`" class="text"></div>
    </div>  
</template>
<script>
    import E from 'wangeditor'
    export default {
        name: 'editorElem',
        data () {
            return {
                editor: null,
                editorContent: ''
            }
        },
        props: ['catchData', 'content', 'height', 'networkPic'],    // 接收父组件的方法
        watch: {
            content() {
                // console.log('父组件传递过来的值',this.content)
                this.editor.txt.html(this.content);
            }
        },
        mounted() {
            this.loadEditor()
            this.editor.txt.html(this.content);
        },
        methods: {
            loadEditor() {
                this.editor = new E(this.$refs.toolbar, this.$refs.edit)
                this.editor.customConfig.onchange = (html) => {
                    this.editorContent = html
                    // console.log('我是子组件的传递', this.editorContent)
                    // console.log(this.editorContent.includes('hr'))
                    // let res = this.editorContent
                    // if (this.editorContent.includes('hr')) {
                    //     res = this.editorContent.replace(/^hr$/g, '<hr style="color: red">')
                    // }
                    // console.log(res, '???')
                    this.catchData(this.editorContent)  // 把这个html通过catchData的方法传入父组件
                }
                this.editor.customConfig.pasteFilterStyle = false

                // this.editor.customConfig.uploadImgShowBase64 = true

                // this.editor.customConfig.uploadImgMaxLength = 5 

                this.editor.customConfig.uploadImgServer = this.$baseUrl + 'attachment/uploadFile?pathName=cadreOA'

                // this.editor.customConfig.uploadImgParams = {
                //     name: 'files'
                // }
                this.editor.customConfig.uploadFileName = 'files'
                // if (this.networkPic) {
                this.editor.customConfig.showLinkImg = false
                this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024
                // }
                this.editor.customConfig.menus = [          // 菜单配置
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    // 'emoticon',  // 表情
                    'table',  // 表格
                    'code',  // 插入代码
                    // 'undo',  // 撤销
                    // 'redo'  // 重复
                ]
                let that = this
                this.editor.customConfig.uploadImgHooks = {
                    
                    before: function (xhr, editor, files) {
                        console.log('上传之前的', xhr, editor, files)
                        // that.editor.customConfig.uploadImgParams.localFilePath = files[0].name
                        // console.log(that.editor.customConfig.uploadImgParams.localFilePath, '名字')
                                // 图片上传之前触发
                                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                                // return {
                                //     prevent: true,
                                //     msg: '放弃上传'
                                // }
                    },
                    success: function (xhr, editor, result) {
                        console.log('上传成功', xhr, editor, result)
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                        this.imgUrl = Object.values(result.data).toString()
                    },
                    fail: function (xhr, editor, result) {
                        console.log('插入失败')
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, editor, file) {
                        console.log('上传出错了' ,xhr, editor, file)
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },
                    timeout: function (xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, editor) {
                        console.log('返回', insertImg, result, editor)
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        console.log(result.data[0].fileName)
                        let url = `${that.$baseUrl}attachment/browerPhoto?pathName=cadreOA&fileName=${result.data[0].fileName}` // result.data就是服务器返回的图片名字和链接
                        // JSON.stringify(url)    // 在这里转成JSON格式
                        insertImg(url)
                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                }

                this.editor.create()     // 创建富文本实例
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #editor-container {
        position: relative;
        z-index: 1;
        display: block;
        padding: 0 0px 0 15px;
		width: 100%;
        /deep/ input::-moz-placeholder {
            color: $color-primary !important;
        }
        /deep/ input::-webkit-input-placeholder {
            color: $color-primary !important;
        }
        /deep/ .w-e-text img:hover {
            box-shadow: none !important;
        }
        /deep/ .w-e-toolbar {
            flex-wrap: wrap;
        }
        .editor-header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-top: 1px solid #EBEEF5;
            /deep/ .el-input {
                top: 4px;
            }
        }
        .editor-left {

        }
        .toolbar {
            padding: 10px 0 0 0;
        }
        .text {
            width: 100%;
            min-width: 400px;
            min-height: 400px;
            margin-top: 10px;
            background: rgb(250,250,250);
            border: 1px solid rgb(235,238,245);
        }
    }
</style>