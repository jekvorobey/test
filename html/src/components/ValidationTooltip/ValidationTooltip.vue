<template>
    <div class="validation-tooltip">
        <div
            v-for="tooltip in tooltips"
            :key="tooltip.validator"
            class="validation-tooltip-item"
            :class="{
                'validation-tooltip-item--disabled': tooltipStatuses[tooltip.validator] === 'status-disabled',
            }"
        >
            <v-svg class="validation-tooltip-icon" :name="tooltipStatuses[tooltip.validator]" width="16" height="16" />
            <span>{{ tooltip.text }}</span>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import '@images/sprites/status-disabled.svg';
import '@images/sprites/status-alert.svg';
import '@images/sprites/status-check.svg';

import './ValidationTooltip.css';

export default {
    name: 'validation-tooltip',

    components: { VSvg },

    props: {
        tooltips: {
            type: Array,
            required: true,
            validator: function (arr) {
                return arr.every((tooltip) => {
                    return (
                        tooltip.text &&
                        typeof tooltip.text === 'string' &&
                        tooltip.validator &&
                        typeof tooltip.validator === 'string'
                    );
                });
            },
        },

        validatedValue: {
            type: String,
        },

        validations: {
            type: Object,
            required: true,
        },
    },

    computed: {
        tooltipStatuses() {
            const d = 'status-disabled';
            const statuses = Object.assign({}, ...this.tooltips.map((n) => ({ [n.validator]: d })));
            if (this.validatedValue) {
                for (let key in statuses) {
                    statuses[key] = this.validations[key] ? 'status-check' : 'status-alert';
                }
            }
            return statuses;
        },
    },
};
</script>
