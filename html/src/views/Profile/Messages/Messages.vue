<template>
    <section class="section messages-view">
        <div class="messages-view__header">
            <h2 class="messages-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <v-button>Новое сообщение</v-button>
        </div>

        <ul class="messages-view__list">
            <message-card
                tabindex="0"
                class="messages-view__list-item"
                v-for="message in messages"
                :key="message.id"
                :message-id="message.id"
                :message="message.message"
                :name="message.name"
                :last-name="message.lastName"
                :title="message.title"
                :date="formatDate(message.date)"
                :is-system="message.isSystem"
                :is-read="message.isRead"
                use-clamp
                @click.prevent="onOpenMessage(message.id)"
            />
        </ul>
    </section>
</template>

<script>
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import MessageCard from '../../../components/MessageCard/MessageCard.vue';

import './Messages.css';

export default {
    name: 'messages',

    components: {
        VButton,
        VInput,

        MessageCard,
    },

    data() {
        return {
            messages: [
                {
                    id: 56835,
                    name: null,
                    lastName: null,
                    title: 'Начисление баллов за заказ №125-7865564-6',
                    message:
                        'Добрый день, Владимир! Мы разобрались в вашей ситуации — 1500 бонусов за заказ №125-7, Добрый день, Владимир! Мы разобрались в вашей ситуации — 1500 бонусов за заказ №125-7',
                    isRead: false,
                    isSystem: true,
                    date: '2019-07-28',
                },
                {
                    id: 56822,
                    name: 'Владимир',
                    lastName: 'Соколов',
                    title: 'Доставка в Зеленоград',
                    message: 'Ок, спасибо!',
                    isRead: true,
                    isSystem: false,
                    date: '2019-07-18',
                },
                {
                    id: 56577,
                    name: null,
                    lastName: null,
                    title: 'Оплата через юрлицо',
                    message: 'Всегда рады вам помочь!',
                    isRead: true,
                    isSystem: true,
                    date: '2019-07-02',
                },
                {
                    id: 56547,
                    name: null,
                    lastName: null,
                    title: 'Шампуни Aveda',
                    message: 'К сожалению, пока что шампуней Aveda нет в наличии. Но вы можете обратить внимание на...',
                    isRead: true,
                    isSystem: true,
                    date: '2019-07-02',
                },
            ],
        };
    },

    methods: {
        formatDate(date) {
            const dateObj = new Date(date);
            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return dateObj.toLocaleDateString(options);
        },

        onOpenMessage(id) {
            this.$router.push({ name: 'MessageDetails', params: { messageId: id } });
        },
    },
};
</script>
