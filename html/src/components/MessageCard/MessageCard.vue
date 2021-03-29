<template>
    <li class="message-card" @click="onCardClick">
        <div class="message-card__icon" :class="{ 'message-card__icon--empty': isSystem || !user.avatar }">
            <v-svg v-if="isSystem" name="logo" width="30" height="30" />
            <v-picture v-else-if="user.avatar" :image="avatar" />
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
                <v-clamp v-if="useClamp" :max-lines="1" autoresize>
                    <template #before>
                        <span v-html="message" />
                    </template>
                </v-clamp>
                <v-html v-else v-html="messageHtml" />
            </div>
            <span class="text-sm text-grey message-card__body-date-mobile">{{ date }}</span>
        </div>
    </li>
</template>

<script>
import VHtml from '@controls/VHtml/VHtml.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VClamp from 'vue-clamp';

import { mapState } from 'vuex';
import { NAME as AUTH_MODULE, USER } from '@store/modules/Auth';

import Autolinker from 'autolinker';
import { generateFileOriginalPath } from '@util/file';
import '@images/sprites/logo.svg';
import './MessageCard.css';

export default {
    name: 'message-card',

    components: {
        VSvg,
        VPicture,
        VClamp,
        VHtml,
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
        ...mapState(AUTH_MODULE, [USER]),

        iconText() {
            const { firstName, lastName } = this[USER] || {};
            return `${firstName ? firstName.slice(0, 1) : ''}${lastName ? lastName.slice(0, 1) : ''}`;
        },

        avatar() {
            const { avatar } = this[USER] || {};
            return avatar && generateFileOriginalPath(avatar);
        },

        messageHtml() {
            const { message } = this;

            return Autolinker.link(message, {
                stripPrefix: false,
                replaceFn: (match) => match.getType() === 'url' && /https?:\/\//.test(match.getUrl()),
            });
        },
    },

    methods: {
        onCardClick(e) {
            this.$emit('click', e);
        },
    },
};
</script>
