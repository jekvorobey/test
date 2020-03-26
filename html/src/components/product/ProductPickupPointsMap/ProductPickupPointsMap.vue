<template>
    <yandex-map :zoom="zoom" :coords="coords" :controls="[]" :cluster-options="clusterOptions">
        <ymap-marker
            v-for="point in points"
            :key="point.key"
            :markerId="point.markerId"
            :coords="point.coords"
            :icon="point.icon"
            :cluster-name="point.clusterName"
            @click="onPointClick($event, point.entity, index)"
        />
    </yandex-map>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { mapState, mapGetters, mapActions } from 'vuex';

import { NAME as GEO_MODULE } from '@store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '@store/modules/Geolocation/getters';

import { NAME as PRODUCT_MODULE, PICKUP_POINTS, SELECTED_PICKUP_POINT } from '@store/modules/Product';
import { SET_SELECTED_PICKUP_POINT } from '@store/modules/Product/actions';

import selectedPin from '@images/icons/pin-filled-selected.svg';
import pin from '@images/icons/pin-filled.svg';
import './ProductPickupPointsMap.css';

export default {
    name: 'product-pickup-points-map',

    components: {
        yandexMap,
        ymapMarker,
    },

    data() {
        return {
            zoom: 11,

            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },

            selectedMarkerIcon: {
                layout: 'default#image',
                imageHref: selectedPin,
                imageSize: [32, 32],
                imageOffset: [0, 0],
            },

            clusterMarkerIcon: {
                href: pin,
                size: [32, 32],
                offset: [0, 0],
            },
        };
    },

    computed: {
        ...mapState(PRODUCT_MODULE, [PICKUP_POINTS, SELECTED_PICKUP_POINT]),
        ...mapGetters(GEO_MODULE, [SELECTED_CITY_COORDS]),

        coords() {
            const selectedPoint = this[SELECTED_PICKUP_POINT];
            return (selectedPoint && selectedPoint.map.coords) || this[SELECTED_CITY_COORDS] || [55.755814, 37.617635];
        },

        points() {
            const pickupPoints = this[PICKUP_POINTS] || {};
            const selectedPoint = this[SELECTED_PICKUP_POINT];

            return pickupPoints.map(p => {
                const isSelected = selectedPoint && selectedPoint.id === p.id;
                return {
                    entity: p,
                    key: `${p.id}-${p.methodID}-${Math.random()}`,
                    markerId: `marker-${p.id}`,
                    coords: p.map.coords,
                    icon: isSelected ? this.selectedMarkerIcon : this.markerIcon,
                    clusterName: 'default-cluster',
                };
            });
        },

        clusterOptions() {
            return {
                'default-cluster': {
                    preset: 'islands#blackClusterIcons',
                },
            };
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [SET_SELECTED_PICKUP_POINT]),

        onPointClick(e, point, index) {
            this[SET_SELECTED_PICKUP_POINT]({ point, index });
        },
    },
};
</script>
