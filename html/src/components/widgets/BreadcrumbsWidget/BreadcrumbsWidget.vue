<template>
    <breadcrumbs class="container container--tablet-lg breadcrumbs-widget">
        <breadcrumb-item key="main" to="/">
            <v-svg v-if="isTablet" name="home" width="10" height="10" />
            <span v-else>Главная</span></breadcrumb-item
        >
        <breadcrumb-item key="custom" :to="url">{{ name }}</breadcrumb-item>
    </breadcrumbs>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import '@images/sprites/home.svg';
import './BreadcrumbsWidget.css';

export default {
    name: 'breadcrumbs-widget',

    components: {
        VSvg,
        Breadcrumbs,
        BreadcrumbItem,
    },

    props: {
        url: {
            type: String,
            default: '/',
        },

        name: {
            type: String,
            default: 'Ссылка',
        },
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },
};
</script>
