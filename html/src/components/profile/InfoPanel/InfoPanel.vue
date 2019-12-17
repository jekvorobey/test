<template>
    <div class="info-panel">
        <div class="info-panel__header">
            <span class="text-bold info-panel__header-hl">
                {{ header }}
            </span>
            <slot name="controls" />
        </div>

        <div class="info-panel__content">
            <slot />
        </div>
    </div>
</template>

<script>
import './InfoPanel.css';

export default {
    name: 'info-panel',
    props: {
        header: String,
    },
};
</script>
