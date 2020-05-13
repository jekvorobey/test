<template>
    <li class="message-card" @click="onCardClick">
        <div class="message-card__icon">
            <v-svg v-if="isSystem" name="logo" width="30" height="30" />
            <span v-else>{{ iconText }}</span>
        </div>
        <div class="message-card__body">
            <div class="message-card__body-top">
                <span v-if="isRead === false" class="message-card__body-top-read" />
                <span v-if="messageId" class="message-card__body-top-number">{{ messageId }}</span>
                <v-clamp v-if="useHeaderClamp" class="text-bold message-card__body-top-title" :max-lines="1" autoresize>
                    {{ title }}
                </v-clamp>
                <span v-else class="text-bold message-card__body-top-title">{{ title }}</span>
                <span class="text-sm text-grey message-card__body-top-date">{{ date }}</span>
            </div>
            <div class="message-card__body-bottom">
                <v-clamp v-if="useClamp" :max-lines="1" autoresize>{{ message }}</v-clamp>
                <span v-else>{{ message }}</span>
            </div>
            <span class="text-sm text-grey message-card__body-date-mobile">{{ date }}</span>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VClamp from 'vue-clamp';

import '@images/sprites/logo.svg';
import './MessageCard.css';

export default {
    name: 'message-card',

    components: {
        VSvg,
        VClamp,
    },

    props: {
        name: {
            type: String,
        },

        lastName: {
            type: String,
        },

        title: {
            type: String,
            required: true,
        },

        messageId: {
            type: [Number, String],
        },

        message: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        isSystem: {
            type: Boolean,
            default: false,
        },

        useClamp: {
            type: Boolean,
            default: false,
        },

        useHeaderClamp: {
            type: Boolean,
            default: false,
        },

        isRead: {},
    },

    computed: {
        iconText() {
            return `${this.name ? this.name.slice(0, 1) : ''}${this.lastName ? this.lastName.slice(0, 1) : ''}`;
        },
    },

    methods: {
        onCardClick(e) {
            this.$emit('click', e);
        },
    },
};
</script>
