<template>
    <section class="section about-us-view">
        <div class="about-us-view__header">
            <breadcrumbs class="container about-us-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="no-main" :to="$route.path">{{ pageTitle }}</breadcrumb-item>
            </breadcrumbs>
        </div>

        <section class="section">
            <div class="container about-us-view__top">
                <video
                    class="about-us-view__top-video"
                    autoplay="autoplay"
                    loop="loop"
                    muted="muted"
                    playsinline="playsinline"
                >
                    <source :src="AboutIBT" type="video/mp4" />
                    <img class="about-us-view__top-img" :src="AboutIBTStatic" alt="About IBT" />
                </video>

                <div class="about-us-view__top-content">
                    <h1 class="about-us-view__top-content-h1">О нас</h1>
                    <p class="about-us-view__top-content-text">
                        Бессовестно Талантливый — масштабная инициатива, цель которой поддерживать мастеров индустрии
                        красоты в&nbsp;стремлении становиться сильнее в своем ремесле. Для ее&nbsp;достижения мы находим
                        и предлагаем лучшие решения для ежедневной работы, образования и вдохновения.
                    </p>
                    <p class="about-us-view__top-content-text">
                        Хештег #БессовестноТалантливый стал основой дружного быстрорастущего комьюнити — более 100 000
                        упоминаний в&nbsp;Инстаграм медиаканала @bessovestnotalantlivy, одноименного университета
                        и&nbsp;флагманского бутика в&nbsp;Москве, где&nbsp;также представлена часть партнерских брендов.
                    </p>
                    <p class="about-us-view__top-content-text">
                        Новый Бессовестно Талантливый проект — первый в России маркетплейс товаров и событий
                        бьюти-индустрии, предназначенный для мастеров.
                    </p>
                </div>
            </div>
        </section>

        <separator-section class="about-us-view__separator about-us-view__separator-p0" />

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
                        Запросы покупателей меняются. Искать товары и цены в&nbsp;разных магазинах становится все
                        сложнее.
                    </p>

                    <p class="about-us-view__brands-content-text">
                        Маркетплейс Бессовестно Талантливый — это&nbsp;онлайн-площадка, которая объединяет выгодные
                        предложения от официальных представителей брендов для&nbsp;бьюти-профессионалов и
                        персонализированные рекомендации, отзывы профессионального сообщества и&nbsp;систему бонусов,
                        удобную оплату и логистику.
                    </p>

                    <router-link class="about-us-view__brands-content-link" to="/catalog">
                        Перейти в каталог
                    </router-link>
                </div>

                <picture class="about-us-view__top-img">
                    <source media="(max-width: 479px)" :srcset="AboutChoiseMd" />
                    <source media="(min-width: 480px)" :srcset="AboutChoiseLg" />
                    <img class="about-us-view__top-img" :src="AboutChoiseLg" alt="Choise" />
                </picture>
            </div>
        </section>

        <separator-section class="about-us-view__separator" />

        <section class="section">
            <div class="container about-us-view__mclass">
                <picture class="about-us-view__top-img">
                    <source media="(max-width: 479px)" :srcset="AboutLearningMd" />
                    <source media="(min-width: 480px)" :srcset="AboutLearningLg" />
                    <img class="about-us-view__top-img" :src="AboutLearningLg" alt="Learning" />
                </picture>

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
                        Делайте свой выбор, изучив полную информацию о&nbsp;событии: описание и фото, видео и
                        пользовательский контент, включая публикации из Инстаграм и отзывы покупателей на iBT.ru.
                    </p>

                    <router-link class="about-us-view__mclass-content-link" to="/masterclasses">
                        Перейти к мастер-классам
                    </router-link>
                </div>
            </div>
        </section>

        <section class="section about-us-view__feedback-section">
            <div class="container about-us-view__feedback">
                <div class="about-us-view__feedback-content">
                    <h1 class="about-us-view__feedback-content-h1">Напишите нам</h1>

                    <p class="about-us-view__feedback-content-text">
                        Мы делаем все, чтобы процесс покупки на маркетплейсе всегда оставался легким и комфортным.
                    </p>

                    <p class="about-us-view__feedback-content-text">
                        Заполните форму обратной связи, чтобы поделиться вашими пожеланиями и помочь нам стать лучше.
                    </p>
                </div>

                <form class="about-us-view__feedback-form" @submit.prevent>
                    <v-input
                        class="about-us-view__feedback-form-name"
                        placeholder="Вашe имя"
                        v-model="form.name"
                        :error="nameError"
                    >
                        Ваше имя
                    </v-input>

                    <v-input
                        class="about-us-view__feedback-form-email"
                        placeholder="Ваш email"
                        v-model="form.email"
                        :error="emailError"
                    >
                        Email
                    </v-input>

                    <v-input
                        class="about-us-view__feedback-form-message"
                        tag="textarea"
                        placeholder="Введите сообщения"
                        v-model="form.body"
                        :error="bodyError"
                    >
                        Сообщение
                    </v-input>

                    <v-button class="about-us-view__feedback-form-submit-btn" :href="mailTo" @click="onSubmit">
                        Напишите нам
                    </v-button>
                </form>
            </div>
        </section>

        <section class="section">
            <div class="container about-us-view__insta">
                <frisbuy-product-container :script="frisbuyScript" />
            </div>
        </section>
    </section>
</template>

<script>
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';

import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';

import validationMixin, { required, email } from '@plugins/validation';
import metaMixin from '@plugins/meta';
import '@images/sprites/home.svg';
import '@images/sprites/About1.svg';
import '@images/sprites/About2.svg';
import '@images/sprites/About3.svg';
import '@images/sprites/About4.svg';
import '@images/sprites/AboutBrand1.svg';
import '@images/sprites/AboutBrand2.svg';
import '@images/sprites/AboutBrand3.svg';
import '@images/sprites/AboutBrand4.svg';

import AboutChoiseLg from '@images/mock/AboutChoiseLg.png';
import AboutChoiseMd from '@images/mock/AboutChoiseMd.png';
import AboutLearningLg from '@images/mock/AboutLearningLg.png';
import AboutLearningMd from '@images/mock/AboutLearningMd.png';

import AboutIBT from '@videos/AboutIBT.mp4';
import AboutIBTStatic from '@images/mock/AboutIBTStatic.png';

import AboutMk1 from '@images/mock/AboutMk1.png';
import AboutMk2 from '@images/mock/AboutMk2.png';
import AboutMk3 from '@images/mock/AboutMk3.png';
import AboutMk4 from '@images/mock/AboutMk4.png';
import './AboutUs.css';

export default {
    name: 'about-us',
    mixins: [metaMixin, validationMixin],

    components: {
        VInput,
        VButton,
        Breadcrumbs,
        BreadcrumbItem,
        SeparatorSection,
        FrisbuyProductContainer,
    },

    validations: {
        form: {
            name: {
                required,
            },

            email: {
                required,
                email,
            },

            body: {
                required,
            },
        },
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            AboutChoiseLg,
            AboutChoiseMd,
            AboutLearningLg,
            AboutLearningMd,
            AboutIBT,
            AboutIBTStatic,

            form: {
                name: '',
                email: '',
                body: '',
            },

            edges: [
                {
                    img: 'About2',
                    subTitle: 'Коллекция культовых брендов и экспертная подборка профильных событий',
                    link: '/catalog/',
                    linkTitle: 'Перейти к покупкам',
                },
                {
                    img: 'About1',
                    subTitle: 'Специальные цены для профессионалов от официальных поставщиков',
                    link: '/promo/',
                    linkTitle: 'Смотреть акции',
                },
                {
                    img: 'About3',
                    subTitle: 'Доставка заказов по всей России. Более 16 000 населенных пунктов',
                    link: '/delivery-and-payment/',
                    linkTitle: 'Подробнее о доставке',
                },
                {
                    img: 'About4',
                    subTitle: 'Система накопления бонусов',
                    link: '/bonuses/',
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

            frisbuyScript: `https://www.frisbuy.ru/fb/widget?embed_id=9b48d527-a4dc-11ea-ba01-0242ac150002`,
        };
    },

    computed: {
        mailTo() {
            const { form } = this;
            const subject = `${form.name}, ${form.email}`;
            return `mailto:support@ibt.ru?subject=${subject}&body=${form.body}`;
        },

        nameError() {
            if (this.$v.form.name.$dirty && !this.$v.form.name.required) {
                return this.$t('validation.errors.required');
            }
        },

        emailError() {
            if (this.$v.form.email.$dirty) {
                if (!this.$v.form.email.required) return this.$t('validation.errors.required');
                if (!this.$v.form.email.email) return this.$t('validation.errors.email');
            }
        },

        bodyError() {
            if (this.$v.form.body.$dirty && !this.$v.form.body.required) {
                return this.$t('validation.errors.required');
            }
        },

        pageTitle() {
            return 'О нас';
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onSubmit(e) {
            this.$v.$touch();
            if (this.$v.$invalid) e.preventDefault();
        },
    },

    mounted() {
        window.frisbuy.loadScript(this.frisbuyScript);
    },
};
</script>
