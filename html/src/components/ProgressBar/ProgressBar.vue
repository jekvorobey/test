<template>
    <div
        class="progress"
        :class="[{ 'progress--in-progress': show }, { 'progress--fail': !canSuccess }]"
        :style="{
            width: percent + '%',
            height: height,
            opacity: show ? 1 : 0,
        }"
    />
</template>

<script>
// import './ProgressBar.critical.css';

export default {
    data() {
        return {
            percent: 0,
            show: false,
            canSuccess: true,
            duration: 3000,
            height: '2px',
        };
    },

    methods: {
        start() {
            this.show = true;
            this.canSuccess = true;
            if (this._timer) {
                clearInterval(this._timer);
                this.percent = 0;
            }
            this._cut = 10000 / Math.floor(this.duration);
            this._timer = setInterval(() => {
                if (this.percent > 85) !this.canSuccess && this.finish();
                else this.increase(this._cut * Math.random());
            }, 100);
            return this;
        },

        set(num) {
            this.show = true;
            this.canSuccess = true;
            this.percent = Math.floor(num);
            return this;
        },

        get() {
            return Math.floor(this.percent);
        },

        increase(num) {
            this.percent = this.percent + Math.floor(num);
            return this;
        },

        decrease(num) {
            this.percent = this.percent - Math.floor(num);
            return this;
        },

        finish() {
            this.percent = 100;
            this.hide();
            return this;
        },

        pause() {
            clearInterval(this._timer);
            return this;
        },

        hide() {
            clearInterval(this._timer);
            this._timer = null;
            setTimeout(() => {
                this.show = false;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.percent = 0;
                    }, 200);
                });
            }, 500);
            return this;
        },

        fail() {
            this.canSuccess = false;
            return this;
        },
    },
};
</script>
