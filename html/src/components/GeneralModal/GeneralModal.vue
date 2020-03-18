<template>
    <v-modal v-if="!$isServer && mounted" class="general-modal" v-bind="$attrs" @close="$emit('close', $event)">
        <template v-slot:body>
            <v-sticky v-if="isMobile" class="general-modal__sticky">
                <template v-slot:sticky>
                    <div class="container general-modal__header">
                        <slot name="header">
                            <button class="general-modal__header-btn" @click.prevent="$emit('close', $event)">
                                <v-svg name="cross" width="24" height="24" />
                                {{ header }}
                            </button>
                        </slot>
                    </div>
                </template>
                <slot name="content" />
            </v-sticky>
            <slot v-else name="content" />
        </template>
    </v-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VModal from '@controls/modal/modal.vue';

import '@images/sprites/cross.svg';
import './GeneralModal.css';

export default {
    name: 'general-modal',
    inheritAttrs: false,

    components: {
        VSvg,
        VSticky,
        VModal,
    },

    data() {
        return {
            mounted: false,
        };
    },

    props: {
        header: {
            type: String,
            default: 'Закрыть',
        },

        isMobile: {
            type: Boolean,
            default: false,
        },
    },

    mounted() {
        this.mounted = true;
    },
};
</script>
