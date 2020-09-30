<template>
    <map-modal>
        <template v-slot:map>
            <product-pickup-points-map />
        </template>
        <template v-slot:filter>
            <product-pickup-points-panel />
        </template>
    </map-modal>
</template>

<script>
import MapModal, { NAME as MAP_MODAL_NAME } from '@components/MapModal/MapModal.vue';

import ProductPickupPointsMap from '@components/product/ProductPickupPointsMap/ProductPickupPointsMap.vue';
import ProductPickupPointsPanel from '@components/product/ProductPickupPointsPanel/ProductPickupPointsPanel.vue';

export const NAME = MAP_MODAL_NAME;

export default {
    name: 'product-map-modal',

    components: {
        MapModal,

        ProductPickupPointsMap,
        ProductPickupPointsPanel,
    },
};
</script>