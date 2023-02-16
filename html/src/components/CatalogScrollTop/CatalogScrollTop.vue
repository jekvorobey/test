<template>
    <div @click="$emit('onScrollTop')"
         :class="{'catalog-scroll-top__show': show}"
         class="catalog-scroll-top">
        <app-icon name="CatalogScrollTopIcon" height="14" width="12"/>
    </div>
</template>

<script>
    import AppIcon from "@components/icons/AppIcon.vue";
    import './CatalogScrollTop.css'

    export default {
        name: "CatalogScrollTop",
        components: {
            AppIcon
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
</script>