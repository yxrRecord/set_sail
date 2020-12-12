<template>
    <div :style="{height:Height}" class="common-chart-container" ref="chart">
        <div class="chart" :id="id"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'commonChart',
        props: {
            option: Object,
            height: [String, Number]
        },
        data() {
            return {
                id: '',
                myChart: {}
            }
        },
        computed: {
            Height() {
                if (this.height) {
                    if (this.$getType(this.height) === 'number') {
                        return `${this.height}px`
                    }
                    return this.height
                } else
                    return '100%'
            }
        },
        created() {
            this.id = Math.random().toString(36).substr(2)
        },
        mounted() {
            const myChart = echarts.init(document.getElementById(this.id))
            myChart.setOption(this.option, true)

            this.myChart = myChart
            myChart.on('click', (params) => {
                this.$emit('clickChart', params)
            })
            myChart.on('mouseover', (params) => {
                this.$emit('mouseover', params)
            })
            
            window.addEventListener('resize', (e) => {
                myChart.resize();
            })
        },
        watch: {
            option: {
                handler(val) {
                    this.myChart.setOption(val, true)
                    return
                    // this.$destroy()
                    // console.log(val);
                    // console.log(this.myChart);
                    // this.myChart.setOption(val)

                    echarts.dispose(document.getElementById(this.id))
                    this.myChart = echarts.init(document.getElementById(this.id))
                    this.myChart.setOption(this.option, true)
                    this.$mount()
                },
                deep: true
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .common-chart-container {
        width: 100%;
        .chart {
            width: 100%;
            height: 100%;
        }
    }
</style>
