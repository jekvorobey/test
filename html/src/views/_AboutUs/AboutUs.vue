<template>
    <section class="section about-us-view">
        <div class="container about-us-view__header">
            <breadcrumbs class="about-us-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item key="no-main" to="/about-us">О нас</breadcrumb-item>
            </breadcrumbs>
        </div>
        <section class="section">
            <div class="container about-us-view__top">
                <picture class="about-us-view__top-img">
                    <source media="(max-width: 479px)" :srcset="AboutManMd" />
                    <source media="(min-width: 480px)" :srcset="AboutManLg" />
                    <img class="about-us-view__top-img" :src="AboutManLg" alt="Men" />
                </picture>
                <div class="about-us-view__top-content">
                    <h1 class="about-us-view__top-content-h1">О нас</h1>
                    <p class="about-us-view__top-content-text">
                        Бессовестно Талантливый — масштабная инициатива, цель которой поддерживать мастеров индустрии
                        красоты в стремлении становиться сильнее в своем ремесле. Для ее достижения мы находим и
                        предлагаем лучшие решения для ежедневной работы, образования и вдохновения.
                    </p>
                    <p class="about-us-view__top-content-text">
                        Хештег #БессовестноТалантливый стал основой дружного быстрорастущего комьюнити — более 100 000
                        упоминаний в Инстаграм медиаканала @bessovestnotalantlivy, одноименного университета и бутика
                        в Москве, где представлена часть нашей коллекции товаров.
                    </p>
                    <p class="about-us-view__top-content-text">
                        Наш новый проект — первый в России маркетплейс товаров и событий бьюти-индустрии,
                        предназначенный только для профессионалов.
                    </p>
                </div>
            </div>
        </section>
        <separator-section class="about-us-view__separator" />
        <section class="section">
            <div class="container about-us-view__edge">
                <div class="about-us-view__edge-block" v-for="edge in edges" :key="edge.img">
                    <v-svg
                        :name="edge.img"
                        :width="isTablet ? 48 : 93"
                        :height="isTablet ? 48 : 96"
                        class="about-us-view__edge-block-img"
                    />
                    <div class="about-us-view__edge-block-title">
                        <p>{{ edge.subTitle }}</p>
                        <router-link class="about-us-view__edge-block-link" :to="edge.link">
                            {{ edge.linkTitle }}
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="about-us-view__separator" />
        <section class="section">
            <div class="container about-us-view__brands">
                <div class="about-us-view__brands-content">
                    <h1 class="about-us-view__brands-content-h1">Выбор профессионалов</h1>
                    <p class="about-us-view__brands-content-text">
                        Запросы покупателей меняются. Искать товары и цены в разных магазинах становится все сложнее.
                    </p>
                    <p class="about-us-view__brands-content-text">
                        Маркетплейс Бессовестно Талантливый — это онлайн-площадка, которая объединяет выгодные
                        предложения от официальных представителей брендов для бьюти-профессионалов и персонализированные
                        рекомендации, отзывы профессионального сообщества и систему бонусов, удобную оплату и логистику.
                    </p>
                    <router-link class="about-us-view__brands-content-link" to="/">
                        Перейти в каталог
                    </router-link>
                </div>
                <div class="about-us-view__brands-list">
                    <div class="about-us-view__brands-list-card" v-for="brand in brands" :key="brand.img">
                        <v-svg :name="brand.img" :height="isTabletLg ? 30 : 50" width="100%" />
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="about-us-view__separator" />
        <section class="section">
            <div class="container about-us-view__mclass">
                <div class="about-us-view__mclass-list">
                    <div class="about-us-view__mclass-list-mentor" v-for="mentor in mentors" :key="mentor.img">
                        <v-picture v-if="mentor.img" :image="mentor.img" />
                    </div>
                </div>
                <div class="about-us-view__mclass-content">
                    <h1 class="about-us-view__mclass-content-h1">
                        Обучение — <br />
                        как часть концепции
                    </h1>
                    <p class="about-us-view__mclass-content-text">
                        Мы формируем глобальное сообщество бьюти-специалистов по всем профессиональным направлениям и
                        представляем на маркетплейсе экспертную подборку мастер-классов и мероприятий.
                    </p>
                    <p class="about-us-view__mclass-content-text">
                        Делайте свой выбор, изучив полную информацию о событии: описание и фото, видео и
                        пользовательский контент, включая публикации из Инстаграм и отзывы покупателей на iBT.ru.
                    </p>
                    <router-link class="about-us-view__mclass-content-link" to="/">
                        Перейти к мастер-классам
                    </router-link>
                </div>
            </div>
        </section>
        <section class="section about-us-view__feedback-section">
            <div class="container about-us-view__feedback">
                <div class="about-us-view__feedback-content">
                    <h1 class="about-us-view__feedback-content-h1">
                        Напишите нам
                    </h1>
                    <p class="about-us-view__feedback-content-text">
                        Мы делаем все, чтобы процесс покупки на маркетплейсе всегда оставался легким и комфортным.
                    </p>
                    <p class="about-us-view__feedback-content-text">
                        Заполните форму обратной связи, чтобы поделиться вашими пожеланиями и помочь нам стать лучше.
                    </p>
                </div>

                <form class="about-us-view__feedback-form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                    <v-input class="about-us-view__feedback-form-name" placeholder="Вашe имя" tag="input" name="name">
                        Ваше имя
                    </v-input>
                    <v-input
                        class="about-us-view__feedback-form-email"
                        placeholder="Ваш email"
                        tag="input"
                        name="email"
                    >
                        Email
                    </v-input>
                    <v-input
                        class="about-us-view__feedback-form-message"
                        tag="textarea"
                        placeholder="Введите сообщения"
                        name="message"
                    >
                        Сообщение
                    </v-input>
                    <v-button class="about-us-view__feedback-form-submit-btn">
                        Напишите нам
                    </v-button>
                </form>
            </div>
        </section>
        <section class="section">
            <div class="container about-us-view__insta">
                <frisbuy-product-container :script="instagramFrisbuy" id="frisbuy-widget" />
            </div>
        </section>
    </section>
</template>

<script>
import './AboutUs.css';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';

import VPicture from '@controls/VPicture/VPicture.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import { breakpoints } from '@enums';

import '@images/sprites/home.svg';
import '@images/sprites/About1.svg';
import '@images/sprites/About2.svg';
import '@images/sprites/About3.svg';
import '@images/sprites/About4.svg';
import '@images/sprites/AboutBrand1.svg';
import '@images/sprites/AboutBrand2.svg';
import '@images/sprites/AboutBrand3.svg';
import '@images/sprites/AboutBrand4.svg';

import AboutManLg from '@images/mock/AboutManLg.png';
import AboutManMd from '@images/mock/AboutManMd.png';

import AboutMk1 from '@images/mock/AboutMk1.png';
import AboutMk2 from '@images/mock/AboutMk2.png';
import AboutMk3 from '@images/mock/AboutMk3.png';
import AboutMk4 from '@images/mock/AboutMk4.png';



export default {
    name: 'about-us',
    components: {
        VPicture,
        VInput,
        VButton,
        VSlider,
        Breadcrumbs,
        BreadcrumbItem,
        SeparatorSection,
        FrisbuyProductContainer,
    },

    data: () => ({
        AboutManLg,
        AboutManMd,
        edges: [
            {
                img: 'About2',
                subTitle: 'Коллекция культовых брендов и экспертная подборка профильных событий',
                link: '#',
                linkTitle: 'Перейти к покупкам',
            },
            {
                img: 'About1',
                subTitle: 'Специальные цены для профессионалов от официальных поставщиков',
                link: '#',
                linkTitle: 'Смотреть акции',
            },
            {
                img: 'About3',
                subTitle: 'Доставка заказов по всей России. Более 16 000 населенных пунктов',
                link: '#',
                linkTitle: 'Подробнее о доставке',
            },
            {
                img: 'About4',
                subTitle: 'Система накопления бонусов',
                link: '#',
                linkTitle: 'Подробнее о бонусах',
            },
        ],
        brands: [
            {
                img: 'AboutBrand1',
            },
            {
                img: 'AboutBrand2',
            },
            {
                img: 'AboutBrand3',
            },
            {
                img: 'AboutBrand4',
            },
        ],
        mentors: [
            {
                img: AboutMk1,
            },
            {
                img: AboutMk2,
            },
            {
                img: AboutMk3,
            },
            {
                img: AboutMk4,
            },
        ],
        instagrams: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
        aboutGalleryOptions: {
            spaceBetween: 8,
            slidesPerView: 1,
            grabCursor: true,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                [breakpoints.tablet - 1]: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                },
            },
        },
        instagramFrisbuy: `https://www.frisbuy.ru/fb/widget?embed_id=9b48d527-a4dc-11ea-ba01-0242ac150002`,
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
