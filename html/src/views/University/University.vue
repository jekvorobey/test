<template>
    <section class="section university-view">
        <div class="container university-view__header">
            <breadcrumbs class="university-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item key="no-main" to="/university">Универститет</breadcrumb-item>
            </breadcrumbs>
        </div>
        <section class="section">
            <div class="container university-view__top">
                <picture class="university-view__top-img">
                    <source media="(max-width: 479px)" :srcset="UniverMainMd" />
                    <source media="(min-width: 480px)" :srcset="UniverMain" />
                    <img class="university-view__top-img" :src="UniverMain" alt="UniverMain" />
                </picture>
            </div>
        </section>
        <section class="section">
            <div class="container university-view__main">
                <h2 class="university-view__main-h2">
                    Профессиональный образовательный проект с инновационным <br />
                    подходом для мастеров бьюти-индустрии
                </h2>
                <div class="university-view__main-row">
                    <picture class="university-view__main-row--img">
                        <source media="(max-width: 479px)" :srcset="Univer1" />
                        <source media="(min-width: 480px)" :srcset="Univer1" />
                        <img class="university-view__main-img" :src="Univer1" alt="Men" />
                    </picture>
                    <div class="university-view__main-row--content">
                        <h1 class="university-view__main-row--content-h1">Университет Бессовестно Талантливый</h1>
                        <p class="university-view__main-content-row--text">
                            Образовательный проект для мастеров бьюти-индустрии, цель которого — поддерживать
                            профессионалов в стремлении становиться сильнее в своем ремесле. Наша команда находит лучшие
                            решения для ежедневной работы, повышения уровня знаний и вдохновения. В специальном разделе
                            «Обучение» маркетплейса iBT.ru представлены собственные программы Университета и мероприятия
                            партнеров.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container university-view__main">
                <div class="university-view__main-row university-view__main-row--reverse">
                    <div class="university-view__main-row--content">
                        <h1 class="university-view__main-row--content-h1">Коллаборации</h1>
                        <p class="university-view__main-content-row--text">
                            Мы открыты для сотрудничества и совместных проектов с лучшими профессионалами индустрии
                            России и мира. В качестве платформы для своих мастер-классов Университет Бессовестно
                            Талантливый выбирают такие значимые стилисты как: Владимир Сарбашев, Павел Шефф, Игорь
                            Хонин, Андрей Крупчинский, Максим Никиточкин, Алия Аскарова, Ричард Эшфорт, Питер Грей,
                            Шиничи Такахаши.
                        </p>
                    </div>
                    <picture class="university-view__main-row--img">
                        <source media="(max-width: 479px)" :srcset="Univer2" />
                        <source media="(min-width: 480px)" :srcset="Univer2" />
                        <img class="university-view__main-img" :src="Univer2" alt="Men" />
                    </picture>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container university-view__main">
                <div class="university-view__main-row">
                    <picture class="university-view__main-row--img">
                        <source media="(max-width: 479px)" :srcset="Univer3" />
                        <source media="(min-width: 480px)" :srcset="Univer3" />
                        <img class="university-view__main-img" :src="Univer3" alt="Men" />
                    </picture>
                    <div class="university-view__main-row--content">
                        <p class="university-view__main-content-row--text">
                            Кампус Университета — это 8 профессионально оснащенных студий в Москве общей площадью 800 м2
                            на «Винзаводе» и «Арме», расположенных в пешей доступности от м. Курская. Все пространства
                            многофункциональны и вмещают от 10 человек для камерных практических форматов до 150 человек
                            для конференций и шоу-показов.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <separator-section class="partners-view__separator" />
        <section class="section">
            <div class="container university-view__slider">
                <div class="university-view__slider-title">
                    <h1 class="university-view__slider-title-h1">Галлерея</h1>
                </div>
                <v-slider class="university-view__slider-gallery" name="gallery" :options="univerSliderOptions">
                    <div
                        v-if="!univerSlider || !univerSlider.length"
                        class="swiper-slide university-view__slider-gallery-item"
                    >
                        <v-svg name="logo" width="56" height="56" />
                    </div>
                    <div
                        class="swiper-slide university-view__slider-gallery-item"
                        v-for="item in univerSlider"
                        :key="item.id"
                    >
                        <v-picture class="university-view__slider-gallery-item-img">
                            <source media="(max-width: 479px)" :srcset="UniverSlide" />
                            <source media="(min-width: 480px)" :srcset="UniverSlide" />
                            <img class="university-view__slider-gallery-item-img" :src="UniverSlide" alt="" />
                        </v-picture>
                    </div>
                </v-slider>
            </div>
        </section>
        <section class="section university-view__feedback-section">
            <div class="container university-view__feedback">
                <div class="university-view__feedback-content">
                    <h1 class="university-view__feedback-content-h1">
                        Хотите провести у нас мероприятие?
                    </h1>
                    <p class="university-view__feedback-content-text">
                        Заполните форму ниже — и мы с вами свяжемся asap.
                    </p>
                    <v-button
                        class="university-view__feedback-content--action-btn btn--transparent"
                        iconName="download"
                        iconModifier="university-view__feedback-content--action-btn--icon"
                    >
                        <span>Скачать презентацию</span></v-button
                    >
                </div>

                <form class="university-view__feedback-form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                    <v-input class="university-view__feedback-form-name" placeholder="Вашe имя" tag="input" name="name">
                        Имя и фамилия
                    </v-input>
                    <v-input
                        class="university-view__feedback-form-city"
                        placeholder="Ваш город"
                        tag="input"
                        name="city"
                    >
                        Город
                    </v-input>
                    <v-input
                        class="university-view__feedback-form-email"
                        placeholder="Ваш email"
                        tag="input"
                        name="email"
                    >
                        Email
                    </v-input>
                    <v-input-mask :options="maskOptions">
                        Номер телефона
                    </v-input-mask>
                    <v-input
                        class="university-view__feedback-form-message"
                        tag="textarea"
                        placeholder="Введите сообщение..."
                        name="message"
                    >
                        Ваш вопрос
                    </v-input>
                    <v-button class="university-view__feedback-form-submit-btn">
                        Заполнить заявку
                    </v-button>
                </form>
            </div>
        </section>
    </section>
</template>

<script>
import './University.css';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';

import '@images/sprites/home.svg';
import { breakpoints } from '@enums';
import { phoneMaskOptions } from '@settings'

import UniverMain from '@images/mock/UniverMain.png';
import UniverMainMd from '@images/mock/UniverMainMd.png';
import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import Univer1 from '@images/mock/Univer1.png';
import Univer2 from '@images/mock/Univer2.png';
import Univer3 from '@images/mock/Univer3.png';
import UniverSlide from '@images/mock/UniverSlide.png';

export default {
    name: 'university',
    components: {
        Breadcrumbs,
        BreadcrumbItem,
        SeparatorSection,
        VSlider,
        VButton,
        VInput,
        VInputMask,
    },
    data: () => ({
        UniverMain,
        UniverMainMd,
        Univer1,
        Univer2,
        Univer3,
        UniverSlide,
        univerSlider: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
        univerSliderOptions: {
            spaceBetween: 8,
            slidesPerView: 4,
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
