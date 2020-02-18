export const cancelRoute = {
    path: '/',
    replace: true,
};

export const yaMapSettings = {
    apiKey: '46c69919-a571-416e-8198-189ed26c6a79',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1',
};

export const phoneMaskOptions = Object.freeze({
    prefix: '+7',
    delimiters: [' ', ' ', '-', '-'],
    blocks: [2, 3, 3, 2, 2],
    numericOnly: true,
});

export const baseChartOptions = Object.freeze({
    chart: {
        toolbar: {
            show: false,
        },
        width: '100%',
        fontFamily: 'Futura PT, Arial, sans-serif',
    },

    dataLabels: {
        enabled: false,
    },

    stroke: {
        show: true,
        curve: 'straight',
        colors: '#000000',
        lineCap: 'round',
        width: 1,
        dashArray: 0,
    },

    markers: {
        size: 1,
        colors: '#000000',
        strokeColors: '#000000',
        shape: 'circle',
        radius: 2,
        hover: {
            size: 4,
        },
    },

    grid: {
        borderColor: '#EFF1F3',
        strokeDashArray: 0,
        position: 'back',

        yaxis: {
            lines: {
                show: false,
            },
        },

        xaxis: {
            lines: {
                show: true,
            },
        },
    },

    xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        axisBorder: {
            show: true,
            color: '#EFF1F3',
            height: 1,
            offsetX: 0,
            offsetY: 0,
        },

        axisTicks: {
            show: false,
        },

        labels: {
            show: true,
            style: {
                fontSize: '14px',
                cssClass: 'v-chart__label',
            },
        },
    },

    yaxis: {
        axisBorder: {
            show: false,
        },

        axisTicks: {
            show: false,
        },

        labels: {
            show: true,
            style: {
                fontSize: '14px',
                cssClass: 'v-chart__label',
            },
        },
    },

    tooltip: {
        custom({ series, seriesIndex, dataPointIndex, w }) {
            return (
                '<div class="v-chart__tooltip">' + '<span>' + series[seriesIndex][dataPointIndex] + '</span>' + '</div>'
            );
        },
    },
});
