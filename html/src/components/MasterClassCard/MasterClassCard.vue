<template>
    <li class="master-class-card" :class="{ 'master-class-card--small': isSmall }">
        <router-link class="master-class-card__img" :to="href">
            <v-picture v-if="image" :image="image" />
            <v-svg v-else id="master-class-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="master-class-card__body">
            <div class="master-class-card__body-top">
                <v-link class="master-class-card__body-name" :to="href">{{ name }}</v-link>
                <div class="master-class-card__body-prices">
                    <price class="text-bold master-class-card__body-price" v-bind="price" />
                </div>
            </div>

            <div class="text-grey text-sm master-class-card__body-bottom">
                <div>{{ date }}</div>
                <div>{{ address }}</div>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VPicture from '../controls/VPicture/VPicture.vue';

import Price from '../Price/Price.vue';

import '../../assets/images/sprites/logo.svg';
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

        href: {
            type: String,
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

        isSmall: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
