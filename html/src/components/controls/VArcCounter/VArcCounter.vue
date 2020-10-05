<template>
    <svg class="v-arc-counter" :viewBox="computedViewbox" :width="width" :height="height">
        <path
            fill="none"
            :d="strokeArc"
            :stroke="stroke"
            :stroke-width="computedStrokeWidth"
            :stroke-dasharray="lengths"
            :stroke-linecap="strokeLinecap"
        />
        <path
            fill="none"
            :d="activeStrokeArc"
            :stroke="activeStroke"
            :stroke-width="computedActiveStrokeWidth"
            :stroke-dasharray="lengths"
            :stroke-linecap="strokeLinecap"
        />
        <text v-bind="textProps">
            {{ text }}
        </text>
    </svg>
</template>

<script>
import './VArcCounter.css';

export default {
    name: 'v-arc-counter',
    props: {
        viewBox: {
            type: String,
        },

        width: {
            type: [String, Number],
            default: '100%',
        },

        height: {
            type: [String, Number],
        },

        text: {
            default: '',
        },

        textX: {
            type: String,
            default: 'center',
        },

        textY: {
            type: String,
            default: 'center',
        },

        dashCount: {
            type: Number,
            default: 10,
        },

        activeCount: {
            type: Number,
            default: 0,
        },

        strokeWidth: {
            type: Number,
            default: 20,
        },

        activeWidth: {
            type: Number,
            default: 20,
        },

        stroke: {
            type: String,
            default: 'lightgrey',
        },

        activeStroke: {
            type: String,
            default: 'dodgerblue',
        },

        strokeLinecap: {
            type: String,
            default: 'round',
        },

        dashSpacing: {
            type: Number,
            default: 0,
        },

        start: {
            type: Number,
            default: -120,
        },

        end: {
            type: Number,
            default: 120,
        },
    },

    computed: {
        computedViewbox() {
            return this.viewBox || '0 0 200 160';
        },

        strokeArc() {
            return this.describeArc(this.UNITS / 2, this.UNITS / 2, this.radius, this.start, this.end);
        },

        activeStrokeArc() {
            return this.describeArc(this.UNITS / 2, this.UNITS / 2, this.radius, this.start, this.activeEnd);
        },

        computedStrokeWidth() {
            return (this.strokeWidth * this.UNITS) / 200;
        },

        computedActiveStrokeWidth() {
            return (this.activeWidth * this.UNITS) / 200;
        },

        radius() {
            return (this.UNITS - Math.max(this.computedStrokeWidth, this.computedActiveStrokeWidth)) / 2;
        },

        // The length of a dash as a percentage of the total length
        dashPerc() {
            return (1 - this.dashSpacing) / (this.dashCount - this.dashSpacing);
        },

        // The space beween dashes as a percentage of the total length
        spacePerc() {
            return this.dashSpacing / (this.dashCount - this.dashSpacing);
        },

        // The length of the arc (allowing for negative angles)
        arcLength() {
            return (Math.abs(this.end - this.start) / 360) * 2 * Math.PI * this.radius;
        },

        // An array of the length of the dash & the length of the space between dashes
        lengths() {
            return [this.arcLength * this.dashPerc, this.arcLength * this.spacePerc];
        },

        // Determine the 'end' angle of the path for the active dashes in degrees.
        activeEnd() {
            if (this.activeCount == 0) {
                return this.start;
            }
            return (
                this.start +
                (this.end - this.start) * (this.activeCount * this.dashPerc + (this.activeCount - 1) * this.spacePerc)
            );
        },

        // Props object for text positioning
        textProps() {
            const props = { fill: 'currentColor' };
            if (this.textX == 'center') {
                props['text-anchor'] = 'middle';
                props.x = '50%';
            } else if (this.textX == 'right') {
                props['text-anchor'] = 'end';
                props.x = '100%';
            }

            if (this.textY == 'center') {
                props['dominant-baseline'] = 'middle';
                props.y = '60%';
            } else if (this.textY == 'bottom') props.y = '100%';
            else props['dominant-baseline'] = 'hanging';

            return props;
        },
    },

    methods: {
        // SVG path definition requires points in cartesian space
        polarToCartesian(cx, cy, radius, degrees) {
            const radians = ((degrees - 90) * Math.PI) / 180.0;
            return {
                x: cx + radius * Math.cos(radians),
                y: cy + radius * Math.sin(radians),
            };
        },

        // Path definition for circular arc, clockwise when endDegrees
        describeArc(cx, cy, radius, startDegrees, endDegrees) {
            const start = this.polarToCartesian(cx, cy, radius, startDegrees);
            const end = this.polarToCartesian(cx, cy, radius, endDegrees);

            let largeArc = Math.abs(endDegrees - startDegrees) < 180 ? 0 : 1;
            let sweep = endDegrees < startDegrees ? 0 : 1;

            return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`;
        },
    },

    beforeCreate() {
        // Arbitrary dimensions of SVG to set up user-space units
        this.UNITS = 200;
    },
};
</script>
