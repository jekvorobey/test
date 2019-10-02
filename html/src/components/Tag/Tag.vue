<template>
    <div class="tag">{{ text }}</div>
</template>

<script>
import './Tag.css';

export default {
    name: 'tag',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    serverCacheKey: props => props.text,
};
</script>
