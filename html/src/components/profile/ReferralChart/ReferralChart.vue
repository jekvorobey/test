<template>
    <div class="referral-chart">
        <div class="referral-chart__wrapper">
            <v-chartjs
                class="referral-chart__chart"
                :style="{ height, width }"
                :chart-data="chartData"
                :options="options"
            />
        </div>
        <canvas id="referral-chart-axis" class="referral-chart__axis" :height="height" width="0" />
    </div>
</template>

<script>
import VChartjs from '@controls/VChartjs/VChartjs.vue';
import './ReferralChart.css';

export default {
    name: 'referral-chart',

    components: {
        VChartjs,
    },

    props: {
        height: {
            type: String,
        },

        width: {
            type: String,
        },

        labels: {
            type: Array,
            default() {
                return [];
            },
        },

        data: {
            type: Array,
            default() {
                return [];
            },
        },

        xStep: {
            type: Number,
            default: 1,
        },

        yStep: {
            type: Number,
            default: 5,
        },
    },

    data() {
        return {
            rectangleSet: false,
        };
    },

    computed: {
        options() {
            const that = this;
            const { xStep, yStep } = that;

            return {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },

                scales: {
                    yAxes: [
                        {
                            stacked: true,

                            gridLines: {
                                display: false,
                            },

                            ticks: {
                                fontFamily: 'Futura PT, arial, sans-serif',
                                fontSize: 14,
                                stepSize: yStep,
                            },
                        },
                    ],

                    xAxes: [
                        {
                            stacked: true,

                            ticks: {
                                fontFamily: 'Futura PT, arial, sans-serif',
                                fontSize: 14,
                                stepSize: xStep,
                            },
                        },
                    ],
                },

                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 24,
                        bottom: 0,
                    },
                },

                tooltips: {
                    // Disable the on-canvas tooltip
                    enabled: false,

                    custom(tooltipModel) {
                        // Tooltip Element
                        let tooltipEl = document.getElementById('chartjs-tooltip');

                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        let innerHtml = '';

                        // Set Text
                        if (tooltipModel.body) {
                            const bodyLines = tooltipModel.body.map(getBody);

                            innerHtml = `<div class="v-chartjs__tooltip">
                            ${bodyLines
                                .map(function (body, i) {
                                    return `<div>${body}</div>`;
                                })
                                .join()}
                            </div>`;
                        }

                        tooltipEl.innerHTML = innerHtml;

                        // `this` will be the overall tooltip
                        const position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - 22 + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 48 + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        document.body.appendChild(tooltipEl);
                    },
                },

                animation: {
                    onComplete() {
                        if (!that.rectangleSet) {
                            const scale = window.devicePixelRatio;

                            const sourceCanvas = document.getElementById('line-chart');

                            const copyWidth = this.scales['y-axis-0'].width - 10;
                            const copyHeight = sourceCanvas.scrollHeight;

                            const axis = document.getElementById('referral-chart-axis');
                            const targetCtx = axis.getContext('2d');

                            targetCtx.scale(scale, scale);
                            targetCtx.canvas.width = copyWidth * scale;
                            targetCtx.canvas.height = copyHeight * scale;

                            targetCtx.canvas.style.width = `${copyWidth}px`;
                            targetCtx.canvas.style.height = `${copyHeight}px`;
                            targetCtx.drawImage(
                                sourceCanvas,
                                0,
                                0,
                                copyWidth * scale,
                                copyHeight * scale,
                                0,
                                0,
                                copyWidth * scale,
                                copyHeight * scale
                            );

                            const sourceCtx = sourceCanvas.getContext('2d');
                            that.rectangleSet = true;
                        }
                    },

                    onProgress() {
                        if (that.rectangleSet === true) {
                            const copyWidth = this.scales['y-axis-0'].width - 10;
                            const copyHeight = this.scales['y-axis-0'].height + this.scales['y-axis-0'].top + 10;
                            const sourceCanvas = document.getElementById('line-chart');
                            const sourceCtx = sourceCanvas.getContext('2d');
                            sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                        }
                    },
                },
            };
        },

        chartData() {
            const { labels, data } = this;

            return {
                labels,
                datasets: [
                    {
                        label: '',
                        data,
                        pointBackgroundColor: '#141116',
                        backgroundColor: '#141116',
                        borderColor: '#141116',
                        lineTension: 0,
                        fill: false,
                        borderWidth: 1,
                    },
                ],
            };
        },
    },
};
</script>
