<template>
    <section class="section thank-you-view">
        <div class="container">
            <h1 class="thank-you-view__hl">
                {{ title }}
            </h1>
        </div>
        <div class="container thank-you-view__container">
            <info-panel class="thank-you-view__panel" header="Информация о заказе">
                <div class="container container--tablet">
                    <template v-if="isMasterClass">
                        <ul class="thank-you-view__panel-list">
                            <info-row class="thank-you-view__panel-item" name="Номер заказа" :value="order.id" />
                            <info-row class="thank-you-view__panel-item" name="Получатель" :value="order.user.email" />
                        </ul>
                        <attention-panel class="thank-you-view__panel-attention">
                            Посмотреть информацию о дате и месте проведения мастер-классов можно в письме, отправленном
                            на ваш email
                        </attention-panel>
                    </template>

                    <ul v-else class="thank-you-view__panel-list">
                        <info-row class="thank-you-view__panel-item" name="Номер заказа" :value="order.id" />
                        <info-row class="thank-you-view__panel-item" name="Получатель" :value="fullUserInfo" />
                        <info-row class="thank-you-view__panel-item" name="Способ получения" :value="orderDelivery" />
                        <info-row
                            class="thank-you-view__panel-item"
                            name="Адрес доставки"
                            :value="order.delivery.address"
                        />
                        <info-row class="thank-you-view__panel-item" name="Даты доставки">
                            <ul>
                                <li v-for="date in order.delivery.dates" :key="date">
                                    {{ date }}
                                </li>
                            </ul>
                        </info-row>
                    </ul>
                    <v-button class="thank-you-view__panel-btn" to="/">На главную страницу</v-button>
                </div>
            </info-panel>

            <info-panel
                v-if="items && items.length > 0"
                class="thank-you-view__panel"
                header="В корзине остались неоформленные позиции"
            >
                <div class="container container--tablet">
                    <ul v-if="!isMasterClass" class="thank-you-view__panel-list">
                        <master-class-card
                            class="thank-you-view__panel-card"
                            v-for="item in items"
                            :key="item.id"
                            v-bind="item"
                        />
                    </ul>

                    <v-button class="thank-you-view__panel-btn">Оформить заказ</v-button>
                </div>
            </info-panel>
        </div>
    </section>
</template>

<script>
import VButton from '../../components/controls/VButton/VButton.vue';

import InfoRow from '../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../components/profile/InfoPanel/InfoPanel.vue';

import AttentionPanel from '../../components/AttentionPanel/AttentionPanel.vue';
import MasterClassCard from '../../components/MasterClassCard/MasterClassCard.vue';
import profileMasterClassImg1 from '../../assets/images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '../../assets/images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '../../assets/images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '../../assets/images/mock/profileMasterClass4.png';

import { mapState, mapActions, mapGetters } from 'vuex';
import { receiveMethods } from '../../assets/scripts/enums/checkout';
import { cartItemTypes } from '../../assets/scripts/enums/product';
import './ThankYou.css';

export default {
    name: 'thank-you',

    components: {
        VButton,

        InfoRow,
        InfoPanel,

        AttentionPanel,

        MasterClassCard,
    },

    data() {
        return {
            order: {
                id: 1234567,
                user: {
                    firstName: 'Евгений',
                    lastName: 'Лукашин',
                    phone: '+7 905 123-45-67',
                    email: 'lukashin@gmail.com',
                },

                delivery: {
                    address: 'ул. Юности, д. 12, кв. 88, г. Москва, Россия, 124482',
                    deliveryMethod: receiveMethods.DELIVERY,
                    dates: [
                        '24 июня, понедельник, с 10:00 до 18:00',
                        '28 июня, пятница, с 10:00 до 18:00',
                        '2 июля, вторник, с 10:00 до 18:00',
                    ],
                },
            },

            masterClasses: [
                {
                    id: 1,
                    name: 'Свадебный стилист',
                    date: '3 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg1,
                    price: {
                        value: 5000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    name: 'Модные косы',
                    date: '4 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg2,
                    price: {
                        value: 6000,
                        currency: 'RUB',
                    },
                },
            ],
        };
    },

    computed: {
        ...mapState('route', {
            type: state => state.params.type,
        }),

        items() {
            switch (this.type) {
                case cartItemTypes.PRODUCT:
                    return this.masterClasses;
                case cartItemTypes.MASTERCLASS:
                    return this.products;
                default:
                    return [];
            }
        },

        title() {
            switch (this.type) {
                case cartItemTypes.PRODUCT:
                    return 'Заказ успешно оформлен';
                case cartItemTypes.MASTERCLASS:
                    return 'Билеты успешно оформлены';
                default:
                    return [];
            }
        },

        isMasterClass() {
            return this.type === cartItemTypes.MASTERCLASS;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        orderDelivery() {
            return this.$t(`deliveryMethod.${this.order.delivery.deliveryMethod}`);
        },

        fullUserInfo() {
            if (!this.order || !this.order.user) return '';
            const { firstName, lastName, phone, email } = this.order.user;
            return `${firstName} ${lastName}, ${phone}, ${email}`;
        },
    },

    methods: {},
};
</script>
