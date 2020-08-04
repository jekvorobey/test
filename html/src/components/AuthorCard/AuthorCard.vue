<template>
    <li class="author-card">
        <div class="author-card__img">
            <v-picture v-if="image" :image="image" />
            <div class="text-medium author-card__img-empty" v-else>{{ iconText }}</div>
        </div>
        <div class="author-card__title">
            <div class="text-bold author-card__title-name">
                {{ firstName }}
                {{ lastName }}
                <button class="author-card__title-btn" v-if="description && mounted" @click="onShow">
                    <v-svg name="info-middle" width="16" height="16" />
                </button>
            </div>
            <div class="text-grey">
                <span v-if="profile">{{ profile }} </span>
                <span v-if="nickName">{{ nickName }}</span>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import '@images/sprites/info-middle.svg';
import './AuthorCard.css';

export default {
    name: 'author-card',

    components: {
        VSvg,
        VPicture,
    },

    props: {
        firstName: {
            type: String,
            default: '',
        },

        lastName: {
            type: String,
            default: '',
        },

        profile: {
            type: String,
        },

        nickName: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        description: {
            type: String,
        },
    },

    data() {
        return {
            mounted: false,
        };
    },

    computed: {
        iconText() {
            return `${this.firstName ? this.firstName.slice(0, 1) : ''}${
                this.lastName ? this.lastName.slice(0, 1) : ''
            }`;
        },
    },

    methods: {
        onShow() {
            this.$emit('show');
        },
    },

    mounted() {
        this.mounted = true;
    },
};
</script>

