<script>
import { Line, mixins } from 'vue-chartjs';
import './VChartjs.css';

const { reactiveProp } = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default() {
                return {};
            },
        },

        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    mounted() {
        const { chartData, options } = this;
        this.renderChart(chartData, options);
    },
};
</script>
