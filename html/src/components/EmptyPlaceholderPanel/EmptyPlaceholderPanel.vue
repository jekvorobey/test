<template>
    <div class="empty-placeholder-panel">
        <v-svg name="alert" class="empty-placeholder-panel__icon" width="24" height="24" />
        <div class="empty-placeholder-panel__content">
            <slot />
        </div>
        <v-button v-if="showBtn" @click.stop="onBtnClick" class="btn--outline empty-placeholder-panel__btn">
            <slot name="btn" />
        </v-button>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';

import '@images/sprites/alert.svg';
import './EmptyPlaceholderPanel.css';

export default {
    name: 'empty-placeholder-panel',

    components: {
        VSvg,
        VButton,
    },

    props: {
        showBtn: {
            type: Boolean,
            default: true,
        },
    },

    methods: {
        onBtnClick(e) {
            this.$emit('btn-click', e);
        },
    },
};
</script>