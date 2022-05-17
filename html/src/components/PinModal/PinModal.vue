<template>
    <v-modal v-if="!$isServer && mounted" class="pin-modal" :loading="loading" @close="$emit('close', $event)">
        <template #body>
            <slot />
        </template>
    </v-modal>
</template>

<script>
import VModal from '@controls/modal/modal.vue';

import './PinModal.css';

export default {
    name: 'pin-modal',

    components: {
        VModal,
    },

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            mounted: false,
        };
    },

    mounted() {
        this.mounted = true;
    },
};
</script>
