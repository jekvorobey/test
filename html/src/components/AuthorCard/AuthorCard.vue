<template>
    <li class="author-card">
        <div class="author-card__img">
            <v-picture v-if="image" :image="image" />
            <div class="text-medium author-card__img-empty" v-else>{{ iconText }}</div>
        </div>
        <div class="author-card__title">
            <span class="text-bold">
                <span v-if="firstName">{{ firstName }} </span>
                <span v-if="lastName">{{ lastName }}</span>
            </span>
            <br />
            <span class="text-grey">
                <span v-if="profile">{{ profile }} </span>
                <span v-if="nickName">{{ nickName }}</span>
            </span>
        </div>
    </li>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import VButton from '@controls/VButton/VButton.vue';
import './AuthorCard.css';

export default {
    name: 'banner-card',

    components: {
        VButton,
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
    },

    computed: {
        iconText() {
            return `${this.firstName ? this.firstName.slice(0, 1) : ''}${
                this.lastName ? this.lastName.slice(0, 1) : ''
            }`;
        },
    },
};
</script>

