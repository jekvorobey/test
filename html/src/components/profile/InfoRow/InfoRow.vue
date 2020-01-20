<template>
    <li class="info-row">
        <div v-if="name" class="text-grey info-row__name">{{ name }}</div>
        <div class="info-row__value">
            <slot>{{ value || '-' }}</slot>
        </div>
        <div class="info-row__link">
            <slot name="link" />
        </div>
    </li>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';
import './InfoRow.css';

export default {
    name: 'info-row',

    props: {
        name: {},
        value: {},
    },
};
</script>
