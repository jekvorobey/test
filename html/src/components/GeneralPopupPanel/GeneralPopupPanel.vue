<template>
    <v-popover
        popoverWrapperClass="general-popup-panel"
        :popover-class="[popoverClass, { 'tooltip--unmounted': !mounted }, { 'tooltip--mounted': mounted }]"
        :trigger="trigger"
        :placement="placement"
        :open="open"
        :disabled="disabled"
        :offset="offset"
        @apply-show="applyShow"
        @apply-hide="applyHide"
        @hide="onHide"
    >
        <slot />
        <template v-slot:popover>
            <div class="general-popup-panel__header">
                <slot name="header">
                    <h4 class="general-popup-panel__header-hl">{{ header }}</h4>
                    <button v-if="showCloseBtn" class="general-popup-panel__header-close" @click="onClose">
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </slot>
            </div>
            <div class="general-popup-panel__body">
                <slot name="body" />
            </div>
            <div v-if="showBottom" class="general-popup-panel__bottom">
                <slot name="bottom" />
            </div>
        </template>
    </v-popover>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import { VPopover } from 'v-tooltip';

import { mapActions } from 'vuex';

import '@images/sprites/cross.svg';
import './GeneralPopupPanel.css';

export default {
    name: 'general-popup-panel',

    components: {
        VSvg,
        VPopover,
    },

    props: {
        popoverClass: {
            type: String,
            default: 'tooltip--white',
        },

        placement: {
            type: String,
            default: 'top',
        },

        trigger: {
            type: String,
            default: 'manual',
        },

        header: {
            type: String,
        },

        open: {
            type: Boolean,
            default: false,
        },

        showBottom: {
            type: Boolean,
            default: false,
        },

        showCloseBtn: {
            type: Boolean,
            default: false,
        },

        offset: {
            type: [Number, String],
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            mounted: false,
        };
    },

    methods: {
        onHide() {
            this.$emit('hide');
        },

        applyShow() {
            this.$emit('applyShow');
        },

        applyHide() {
            this.$emit('applyHide');
        },

        onClose() {
            this.$emit('close');
        },
    },

    mounted() {
        this.mounted = true;
    },
};
</script>
