<template>
    <section class="section message-details-view">
        <v-link class="message-details-view__back-link" :to="backUrl">
            <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
            сообщениям
        </v-link>
        <h2 class="message-details-view__hl">{{ messageId }} Доставка в Зеленоград</h2>

        <ul class="message-details-view__list">
            <message-card
                tabindex="0"
                class="message-details-view__list-item"
                v-for="message in messages"
                :key="message.id"
                :message="message.message"
                :name="message.name"
                :last-name="message.lastName"
                :title="`${message.name || ''} ${message.lastName || ''}`"
                :date="formatDate(message.date)"
                :is-system="message.isSystem"
            />
        </ul>

        <!-- <div class="message-details-view__controls">
            <v-input tag="textarea"></v-input>
            <v-button>Отправить</v-button>
        </div> -->
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';

import MessageCard from '../../../components/MessageCard/MessageCard.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '../../../store';

import { NAME as PROFILE_MODULE, BREADCRUMBS } from '../../../store/modules/Profile';
import { UPDATE_BREADCRUMB } from '../../../store/modules/Profile/actions';

import '../../../assets/images/sprites/arrow-small.svg';
import './MessageDetails.css';

export default {
    name: 'message-details',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,

        MessageCard,
    },

    data() {
        return {
            messages: [
                {
                    id: 1,
                    name: 'Владимир',
                    lastName: 'Соколов',
                    message: 'Добрый день! Подскажите, планируете ли осуществлять доставку в Зеленоград?',
                    isRead: true,
                    isSystem: false,
                    date: '2019-07-23 15:23',
                },

                {
                    id: 2,
                    name: 'Команда Бессовестно Талантливый',
                    lastName: null,
                    title: 'Оплата через юрлицо',
                    message:
                        'Добрый день, Владимир! Да, скоро будем доставлять заказы и в Зеленоград тоже. Можно будет выбрать как курьерскую доставку, так и самовывоз из пунктов выдачи DPD и Boxberry.',
                    isRead: true,
                    isSystem: true,
                    date: '2019-07-23 15:48',
                },
                {
                    id: 3,
                    name: 'Команда Бессовестно Талантливый',
                    lastName: null,
                    title: 'Шампуни Aveda',
                    message: 'К сожалению, пока что шампуней Aveda нет в наличии. Но вы можете обратить внимание на...',
                    isRead: true,
                    isSystem: true,
                    date: '2019-07-24 10:02',
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState('route', {
            messageId: state => state.params && state.params.messageId,
        }),

        backUrl() {
            return { name: 'Messages' };
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),

        formatDate(date) {
            const dateObj = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return dateObj.toLocaleDateString(this[LOCALE], options);
        },
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;
        next(vm => {
            vm[UPDATE_BREADCRUMB]([
                { name: vm.$t('profile.routes.Messages'), to: { name: 'Messages' } },
                { name: params.messageId, to: { name, params } },
            ]);
        });
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: vm.$t('profile.routes.Messages'), to: { name: 'Messages' } },
            { name: params.messageId, to: { name, params } },
        ]);
        next();
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
