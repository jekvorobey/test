<template>
    <li class="master-class-card" :class="{ 'master-class-card--small': isSmall }">
        <router-link class="master-class-card__img" :to="to">
            <v-picture v-if="image">
                <slot />
            </v-picture>
            <v-svg v-else id="master-class-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="master-class-card__body">
            <div class="master-class-card__body-top">
                <v-link class="master-class-card__body-name" :to="to">{{ name }}</v-link>
                <div class="master-class-card__body-prices">
                    <price class="master-class-card__body-price" v-bind="price" :class="{ 'text-bold': !isSmall }" />
                </div>
            </div>

            <div class="text-grey text-sm master-class-card__body-bottom">
                <template v-if="isSmall">
                    <span>{{ date }}</span>
                    <span>•</span>
                    <span>{{ address }}</span>
                </template>
                <template v-else>
                    <div>{{ date }}</div>
                    <div>{{ address }}</div>
                </template>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import '@images/sprites/logo.svg';
import './MasterClassCard.css';

export default {
    name: 'master-class-card',

    components: {
        VSvg,
        VLink,
        VPicture,

        Price,
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        image: {
            type: [String, Object],
        },

        date: {
            type: [String, Date],
        },

        address: {
            type: String,
        },

        price: {
            type: Object,
        },

        to: {
            type: [String, Object],
            default: '/',
        },

        isSmall: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
