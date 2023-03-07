<template>
    <div v-html="timerOutput"></div>
</template>

<script>
    export default {
        name: "BannerThroughCounter",
        props: {
            deadLine: {
                type: String,
                required: true,
                default: null
            }
        },
        data() {
            return {
                timerOutput: null
            }
        },
        methods: {
            startTimer: function () {
                const timeNow = new Date().getTime();
                const timeDifference = this.countDownToTime - timeNow;
                const millisecondsInOneSecond = 1000;
                const millisecondsInOneMinute = millisecondsInOneSecond * 60;
                const millisecondsInOneHour = millisecondsInOneMinute * 60;
                const millisecondsInOneDay = millisecondsInOneHour * 24;
                const differenceInDays = timeDifference / millisecondsInOneDay;
                const remainderDifferenceInHours = (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
                const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
                const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;
                const remainingDays = Math.floor(differenceInDays);
                const remainingHours = Math.floor(remainderDifferenceInHours);
                const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
                const remainingSeconds = Math.floor(remainderDifferenceInSeconds);
                this.timerOutput = `
                <span>${remainingDays}</span><span>д</span>
                <span>${remainingHours}</span><span>ч</span>
                <span>${remainingMinutes}</span><span>м</span>
                 <span>${remainingSeconds}</span><span>с</span>
                 `
            }
        },
        computed: {
            countDownToTime() {
                return this.deadLine && new Date(this.deadLine).getTime()
            }
        },
        mounted() {
            setInterval(() => {
                this.startTimer()
            }, 1000);
        }
    }
</script>