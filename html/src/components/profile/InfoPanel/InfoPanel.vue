<template>
    <div class="info-panel">
        <div class="info-panel__header">
            <v-clamp tag="span" class="text-bold info-panel__header-hl" :max-lines="1" autoresize>
                {{ header }}
            </v-clamp>
            <slot name="controls" />
        </div>

        <div class="info-panel__content">
            <slot />
        </div>
    </div>
</template>

<script>
import VClamp from 'vue-clamp';
import './InfoPanel.css';

export default {
    name: 'info-panel',
    components: {
        VClamp,
    },

    props: {
        header: String,
    },
};
</script>
