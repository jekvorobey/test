<template>
    <section class="section partners-view">
        <div class="container partners-view__header">
            <breadcrumbs class="partners-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item key="no-main" to="/partners">Партнерам</breadcrumb-item>
            </breadcrumbs>
        </div>
        <section class="section">
            <div class="container partners-view__top-container">
                <div class="partners-view__top">
                    <picture class="partners-view__top-img">
                        <source media="(max-width: 479px)" :srcset="ParghnerTop" />
                        <source media="(min-width: 480px)" :srcset="ParghnerTop" />
                        <img class="partners-view__top-content--img" :src="ParghnerTop" alt="Girl" />
                    </picture>
                    <div class="partners-view__top-content">
                        <h1 class="partners-view__top-content--h1">ХОТИТЕ СТАТЬ ПРОДАВЦОМ?</h1>
                        <p class="partners-view__top-content--text">
                            Мы формируем  уникальную для российского рынка коллекцию бьюти-брендов и афишу мероприятий
                            на платформе первого в России маркетплейса только для профессионалов.
                        </p>
                        <p class="partners-view__top-content--text">
                            Если у вас есть, что предложить индустрии, присоединяйтесь к проекту.
                        </p>
                        <div class="partners-view__top-content--action">
                            <v-button class="partners-view__top-content--action-btn">Стать продавцом</v-button>
                            <v-button
                                class="partners-view__top-content--action-btn btn--transparent"
                                iconName="download"
                                iconModifier="partners-view__top-content--action-btn--icon"
                            >
                                <span>Скачать презентацию</span></v-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container partners-view__category">
                <h2 v-if="!isTabletLg" class="partners-view__category-h2">
                    КАКИЕ КАТЕГОРИИ ТОВАРОВ МОЖНО ПРОДАВАТЬ?
                </h2>
                <div class="partners-view__category-list">
                    <div class="partners-view__category-list--item" v-for="category in categories" :key="category.img">
                        <v-svg
                            :name="category.img"
                            :width="isTablet ? 48 : 93"
                            :height="isTablet ? 48 : 96"
                            class="partners-view__category-list--item-img"
                        />
                        <div class="partners-view__category-list--item-title">
                            <router-link class="partners-view__category-list--item-title-link" :to="category.link">
                                {{ category.linkTitle }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container partners-view__cooperation">
                <div class="partners-view__cooperation-content">
                    <h1 class="partners-view__cooperation-content-h1">
                        СОТРУДНИЧЕСТВО<br />
                        С НАМИ – ЭТО:
                    </h1>
                    <ul class="partners-view__cooperation-content--list">
                        <li>База 250 000 мастеров, реферальная система и влияние на спрос клиентов</li>
                        <li>Контроль  ассортимента, цен и маркетинговых кампаний</li>
                        <li>
                            Онлайн-витрина, объединяющая самый полезный контент официальных производителей
                            и бьюти-профессионалов
                        </li>
                        <li>Доставка в 16 000 населенных пунктов</li>
                        <li>Партнерство с первым в России маркетплейсом для профессионалов индустрии красоты</li>
                    </ul>
                </div>
                <div class="partners-view__cooperation-image">
                    <picture class="partners-view__cooperation-image--img">
                        <source media="(max-width: 479px)" :srcset="ParthnerСooperationMd" />
                        <source media="(min-width: 480px)" :srcset="ParthnerСooperationLg" />
                        <img
                            class="partners-view__cooperation-image--img"
                            :src="ParthnerСooperationMd"
                            alt="cooperation"
                        />
                    </picture>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container partners-view__work">
                <h2 class="partners-view__work-h2">
                    Как мы работаем
                </h2>
                <div class="partners-view__work-list">
                    <div class="partners-view__work-list--item" v-for="work in works" :key="work.img">
                        <v-svg
                            :name="work.img"
                            :width="isTablet ? 48 : 93"
                            :height="isTablet ? 48 : 96"
                            class="partners-view__work-list--item-img"
                        />
                        <div class="partners-view__work-list--item-title">
                            <router-link class="partners-view__work-list--item-title-link" :to="work.link">
                                {{ work.linkTitle }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container partners-view__sales">
                <h2 class="partners-view__sales-h2">
                    Что нужно для продажи товаров
                </h2>
                <div class="partners-view__sales-list">
                    <div class="partners-view__sales-list--item" v-for="sale in sales" :key="sale.img">
                        <picture class="partners-view__sales-image--img">
                            <source media="(max-width: 479px)" :srcset="sale.img" />
                            <source media="(min-width: 480px)" :srcset="sale.img" />
                            <img class="partners-view__sales-image--img" :src="sale.img" alt="cooperation" />
                        </picture>
                        <div class="partners-view__sales-list--item-title">
                            {{ sale.title }}
                        </div>
                        <div class="partners-view__sales-list--item-subtitle">
                            {{ sale.subTitle }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section partners-view__feedback-section">
            <div class="container partners-view__feedback">
                <div class="partners-view__feedback-content">
                    <h1 class="partners-view__feedback-content-h1">
                        Заполнить заявку и стать продавцом
                    </h1>
                    <p class="partners-view__feedback-content-text">
                        Мы рассмотрим запрос и свяжемся с вами в течение 3-х рабочих дней.
                    </p>
                    <v-button
                        class="partners-view__feedback-content--action-btn btn--transparent"
                        iconName="download"
                        iconModifier="partners-view__feedback-content--action-btn--icon"
                    >
                        <span>Скачать презентацию</span></v-button
                    >
                </div>

                <form class="partners-view__feedback-form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                    <v-input class="partners-view__feedback-form-name" placeholder="Вашe имя" tag="input" name="name">
                        Имя и фамилия
                    </v-input>
                    <v-input-mask :options="maskOptions" >
                        Номер телефона
                    </v-input-mask>
                    <v-input
                        class="partners-view__feedback-form-email"
                        placeholder="Ваш email"
                        tag="input"
                        name="email"
                    >
                        Email
                    </v-input>
                    <v-input
                        class="partners-view__feedback-form-message"
                        tag="textarea"
                        placeholder="Укажите информацию о вашей компании и предложении (бренде, мастер-классе и т.д.)"
                        name="message"
                    >
                        Сообщение
                    </v-input>
                    <v-button class="partners-view__feedback-form-submit-btn">
                        Заполнить заявку
                    </v-button>
                </form>
            </div>
        </section>
    </section>
</template>

<script>
import './Partners.css';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue'

import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import { phoneMaskOptions } from '@settings'

import ParghnerTop from '@images/mock/ParghnerTop.png';
import ParthnerСooperationMd from '@images/mock/ParthnerСooperationMd.png';
import ParthnerСooperationLg from '@images/mock/ParthnerСooperationLg.png';

import ParthnerSales1 from '@images/mock/ParthnerSales1.png';
import ParthnerSales2 from '@images/mock/ParthnerSales2.png';
import ParthnerSales3 from '@images/mock/ParthnerSales3.png';

import '@images/sprites/download.svg';
import '@images/sprites/home.svg';

import '@images/sprites/Parthner1.svg';
import '@images/sprites/Parthner2.svg';
import '@images/sprites/Parthner3.svg';
import '@images/sprites/Parthner4.svg';
import '@images/sprites/Parthner5.svg';
import '@images/sprites/Parthner6.svg';

import '@images/sprites/ParthenerWork1.svg';
import '@images/sprites/ParthenerWork2.svg';
import '@images/sprites/ParthenerWork3.svg';
import '@images/sprites/ParthenerWork4.svg';
import '@images/sprites/ParthenerWork5.svg';

export default {
    name: 'partners',
    components: {
        VButton,
        VInput,
        VInputMask,
        Breadcrumbs,
        BreadcrumbItem,
        SeparatorSection,
    },
    data: () => ({
        ParghnerTop,
        ParthnerСooperationMd,
        ParthnerСooperationLg,
        ParthnerSales1,
        ParthnerSales2,
        ParthnerSales3,
        categories: [
            {
                img: 'Parthner1',
                link: '#',
                linkTitle: 'Для парикмахеров',
            },
            {
                img: 'Parthner2',
                link: '#',
                linkTitle: 'Для барберов',
            },
            {
                img: 'Parthner3',
                link: '#',
                linkTitle: 'Для nail-мастеров',
            },
            {
                img: 'Parthner4',
                link: '#',
                linkTitle: 'Для визажистов',
            },
            {
                img: 'Parthner5',
                link: '#',
                linkTitle: 'Мастер-классы',
            },
            {
                img: 'Parthner6',
                link: '#',
                linkTitle: 'Выставки и мероприятия',
            },
        ],
        works: [
            {
                img: 'ParthenerWork1',
                link: '#',
                linkTitle: 'Вы размещаете товары и/или мероприятия',
            },
            {
                img: 'ParthenerWork2',
                link: '#',
                linkTitle: 'Получаете уведомление, когда  покупатель оформил заказ',
            },
            {
                img: 'ParthenerWork3',
                link: '#',
                linkTitle: 'Передаете заказанные товары курьерской службе',
            },
            {
                img: 'ParthenerWork4',
                link: '#',
                linkTitle: 'Заказчик получает предоплаченный товар или билет на мероприятие',
            },
            {
                img: 'ParthenerWork5',
                link: '#',
                linkTitle: 'Вы получаете деньги за вычетом комиссии в конце отчетного периода',
            },
        ],
        sales: [
            {
                img: ParthnerSales1,
                title: 'Склад с товарами',
                subTitle: 'Возможность поштучной отгрузки товаров со склада в радиусе до 50 км от Москвы',
            },
            {
                img: ParthnerSales2,
                title: 'Автоматический обмен данными',
                subTitle: 'Мы поможем вам настроить интеграцию по остаткам и ценам в автоматическом режиме (API)',
            },
            {
                img: ParthnerSales3,
                title: 'ИП или юридическое лицо',
                subTitle:
                    'Мы работаем с индивидуальными предпринимателями, обществами с ограниченной ответственностью и бизнесом других форм',
            },
        ],
        maskOptions: { ...phoneMaskOptions },

    }),
    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
