<template>
    <section class="section masterclasses-view">
        <h2 class="masterclasses-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="container container--tablet-lg masterclasses-view__container">
            <ul class="masterclasses-view__list">
                <master-class-card
                    class="masterclasses-view__list-item"
                    v-for="item in masterclasses"
                    :key="item.id"
                    v-bind="item"
                    href="/"
                />
            </ul>
        </div>
    </section>
</template>

<script>
import MasterClassCard from '../../../components/MasterClassCard/MasterClassCard.vue';

import profileMasterClassImg1 from '../../../assets/images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '../../../assets/images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '../../../assets/images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '../../../assets/images/mock/profileMasterClass4.png';

import './Masterclasses.css';

export default {
    name: 'masterclasses',

    components: {
        MasterClassCard,
    },

    data() {
        return {
            masterclasses: [
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
                {
                    id: 3,
                    name: 'Пучки и хвосты',
                    date: '5 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg3,
                    price: {
                        value: 2000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 4,
                    name: 'Цвет под ключ',
                    date: '8 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg4,
                    price: {
                        value: 4000,
                        currency: 'RUB',
                    },
                },
            ],
        };
    },
};
</script>
