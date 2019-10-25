<template>
    <component class="v-html" :is="component || 'div'" />
</template>

<script>
import './VHtml.css';

export default {
    name: 'v-html',
    props: ['component'],
};
</script>
