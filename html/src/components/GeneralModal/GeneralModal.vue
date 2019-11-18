<template>
    <v-modal class="general-modal" v-bind="$attrs" @close="$emit('close', $event)">
        <template v-slot:body>
            <v-sticky v-if="isTabletLg" class="general-modal__sticky">
                <template v-slot:sticky>
                    <div class="container general-modal__header">
                        <slot name="header" />
                    </div>
                </template>
                <slot name="content" />
            </v-sticky>
            <slot v-else name="content" />
        </template>
    </v-modal>
</template>

<script>
import VSticky from '../controls/VSticky/VSticky.vue';
import VModal from '../controls/modal/modal.vue';

import './GeneralModal.css';

export default {
    name: 'general-modal',
    inheritAttrs: false,

    components: {
        VSticky,
        VModal,
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>