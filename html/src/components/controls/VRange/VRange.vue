<template>
    <div class="v-range">
        <div ref="body" class="v-range__body" />
        <div>{{ value_internal }}</div>
        <div>{{ min }}</div>
        <div>{{ max }}</div>
    </div>
</template>

<script>
import noUiSlider from 'nouislider';

export default {
    name: 'v-range',
    props: {
        value: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
    },
    data() {
        return {
            value_internal: this.value,
        };
    },
    methods: {
        onChange(values, handle, unencoded, tap, positions) {
            this.value_internal = values[0];
        },
    },
    mounted() {
        const { body } = this.$refs;
        this.slider = noUiSlider.create(body, {
            start: this.value,
            connect: true,
            range: {
                min: this.min,
                max: this.max,
            },
        });
        this.slider.on('update', this.onChange);
        this.slider.on('change', this.onChange);
    },

    beforeDestroy() {
        this.slider.off('update');
        this.slider.off('change');
        this.slider.destroy();
        this.slider = null;
    },
};
</script>

<style lang="postcss" src="./VRange.postcss"></style>
