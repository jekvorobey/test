<template>
    <component
            :is="name"
            :style="{'width': width + 'px', 'height': height + 'px', 'color': color, 'fill': fill, 'stroke': stroke}"
            class="default-app-icon"
            :class="{className}"
    />
</template>

<script>
    import * as icons from "../../util/icons"

    export default {
        name: 'AppIcon',
        components: {
            ...icons
        },
        props: {
            name: {
                type: String,
                required: true,
                validator(value) {
                    return Object.keys(icons).includes(value)
                }
            },
            width: {
                type: [String, Number],
                required: false,
            },
            height: {
                type: [String, Number],
                required: false,
            },
            color: {
                type: String,
                required: false
            },
            fill: {
                type: String,
                required: false
            },
            stroke: {
                type: String,
                required: false
            },
            className: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped>
    .default-app-icon {
        transition: .3s all;
    }

    .default-app-icon svg {
        transition: .3s all;
    }
</style>
