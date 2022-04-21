<template>
    <section class="section university-view">
        <div class="university-view__header">
            <breadcrumbs class="container university-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="no-main" :to="$route.path">{{ pageTitle }}</breadcrumb-item>
            </breadcrumbs>
        </div>

        <section class="section">
            <div class="container university-view__top">
                <v-picture class="university-view__top-img">
                    <source media="(max-width: 479px)" :srcset="UniverMainMd" />
                    <source media="(min-width: 480px)" :srcset="UniverMain" />
                    <img class="university-view__top-img" :src="UniverMain" alt="UniverMain" />
                </v-picture>
            </div>
        </section>

        <section class="section">
            <div class="container university-view__main">
                <h1 class="university-view__main-h1">
                    Профессиональный образовательный проект с инновационным <br />
                    подходом для мастеров бьюти-индустрии
                </h1>

                <div class="university-view__main-row">
                    <div class="university-view__main-row--image">
                        <v-picture class="university-view__main-row--img">
                            <source media="(max-width: 479px)" :srcset="Univesity1Md" />
                            <source media="(min-width: 480px)" :srcset="Univesity1Lg" />
                            <img class="university-view__main-row--img" :src="Univesity1Lg" alt="University1" />
                        </v-picture>
                    </div>

                    <div class="university-view__main-row--content">
                        <h2 class="university-view__main-row-h2">Университет Бессовестно Талантливый</h2>
                        <p class="university-view__main-content-row--text">
                            Флагманский образовательный проект для мастеров бьюти-индустрии, цель которого —
                            поддерживать профессионалов в&nbsp;стремлении становиться сильнее в своем ремесле. Команда
                            университета находит лучшие решения для ежедневной работы, повышения уровня знаний
                            и&nbsp;вдохновения. В специальном разделе «Мастер-классы» маркетплейса iBT.ru представлены
                            собственные программы Университета и мероприятия партнеров.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <separator-section class="university-view__separator" />

        <section class="section">
            <div class="container university-view__main">
                <div class="university-view__main-row university-view__main-row--reverse">
                    <div class="university-view__main-row--content">
                        <h2 class="university-view__main-row-h2">Коллаборации</h2>
                        <p class="university-view__main-content-row--text">
                            Двери Университета открыты для сотрудничества и&nbsp;совместных проектов с&nbsp;лучшими
                            профессионалами индустрии России и мира. В&nbsp;качестве платформы для своих мастер-классов
                            Университет Бессовестно Талантливый выбирают такие значимые стилисты как: Владимир Сарбашев,
                            Павел Шефф, Игорь Хонин, Андрей Крупчинский, Максим Никиточкин, Алия Аскарова, Ричард
                            Эшфорт, Питер Грей, Шиничи Такахаши.
                        </p>
                    </div>

                    <div class="university-view__main-row--image">
                        <v-picture class="university-view__main-row--img">
                            <source media="(max-width: 479px)" :srcset="Univesity2Md" />
                            <source media="(min-width: 480px)" :srcset="Univesity2Lg" />
                            <img class="university-view__main-row--img" :src="Univesity2Lg" alt="University2" />
                        </v-picture>
                    </div>
                </div>
            </div>
        </section>

        <separator-section class="university-view__separator" />

        <section class="section">
            <div class="container university-view__main">
                <div class="university-view__main-row">
                    <div class="university-view__main-row--image">
                        <v-picture class="university-view__main-row--img">
                            <source media="(max-width: 479px)" :srcset="Univesity3Md" />
                            <source media="(min-width: 480px)" :srcset="Univer3" />
                            <img class="university-view__main-row--img" :src="Univer3" alt="Men" />
                        </v-picture>
                    </div>

                    <div class="university-view__main-row--content">
                        <p class="university-view__main-content-row--text">
                            Кампус Университета — это профессионально оснащенные студии в Москве общей площадью более
                            460&nbsp;м<sup>2</sup>, расположенные в бизнес-квартале Арма в пешей доступности от м.
                            Курская. Многофункциональные пространства позволяют комфортно разместить от 10 до 150
                            человек. Техническое оснащение подходит для проведения различных форматов: от практических и
                            креативных мероприятий в бьюти-сфере до шоу-показов и конференций.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <separator-section class="university-view__separator" />

        <section class="section">
            <div class="container">
                <frisbuy-product-container
                    script="https://www.frisbuy.ru/fb/widget?embed_id=e6718e5b-de39-11ea-ba01-0242ac150002"
                />
            </div>
        </section>

        <section class="section university-view__feedback-section">
            <div class="container university-view__feedback">
                <div class="university-view__feedback-content">
                    <h1 class="university-view__feedback-content-h1">Хотите провести у нас мероприятие?</h1>

                    <p class="university-view__feedback-content-text">
                        Заполните форму ниже — и мы с вами свяжемся asap.
                    </p>
                </div>

                <form v-if="!formSent" class="university-view__feedback-form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                    <v-input v-model="form.name" placeholder="Вашe имя" :error="nameError"> Имя и фамилия </v-input>

                    <v-input v-model="form.city" placeholder="Вашe город" :error="cityError"> Город </v-input>

                    <v-input v-model="form.email" placeholder="Ваш email" :error="emailError"> Email </v-input>

                    <v-input-mask v-model="form.phone" :options="maskOptions" :raw="false" :error="phoneError">
                        Номер телефона
                    </v-input-mask>

                    <v-input
                        class="university-view__feedback-form-message"
                        tag="textarea"
                        placeholder="Введите сообщение..."
                        v-model="form.body"
                        :error="bodyError"
                    >
                        Сообщение
                    </v-input>

                    <v-button class="partners-view__feedback-form-submit-btn" @click="onSubmit">
                        Заполнить заявку
                    </v-button>
                </form>
                <div v-else>
                    Сообщение отправлено
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import UniverMain from '@images/mock/UniverMain.png';
import UniverMainMd from '@images/mock/UniverMainMd.png';
import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';

import { breakpoints } from '@enums';
import { phoneMaskOptions } from '@settings';
import validationMixin, { required, email, minLength } from '@plugins/validation';
import metaMixin from '@plugins/meta';

import Univer3 from '@images/mock/Univer3.png';
import UniverSlide from '@images/mock/UniverSlide.png';

import Univesity1Lg from '@images/mock/Univesity1Lg.png';
import Univesity1Md from '@images/mock/Univesity1Md.png';
import Univesity2Lg from '@images/mock/Univesity2Lg.png';
import Univesity2Md from '@images/mock/Univesity2Md.png';
import Univesity3Md from '@images/mock/Univesity3Md.png';

import '@images/sprites/home.svg';
import './University.css';
import { sendFeedback } from '@api';
import { convertObjectToMetaProperties } from '@util';

export default {
    name: 'university',
    mixins: [metaMixin, validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,
        VSlider,
        VPicture,

        Breadcrumbs,
        BreadcrumbItem,
        SeparatorSection,
        FrisbuyProductContainer,
    },

    metaInfo() {
        const { pageTitle } = this;

        return {
            title: pageTitle,
            meta: convertObjectToMetaProperties({
                description:
                    'Профессиональный образовательный проект с инновационным подходом для мастеров бьюти-индустрии',
            }),
        };
    },

    validations: {
        form: {
            name: {
                required,
            },

            city: {
                required,
            },

            phone: {
                required,
                minLength: minLength(16),
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

    data: () => ({
        UniverMain,
        UniverMainMd,
        Univer3,
        UniverSlide,
        Univesity1Lg,
        Univesity1Md,
        Univesity2Lg,
        Univesity2Md,
        Univesity3Md,
        formSent: false,
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

        form: {
            name: '',
            city: '',
            email: '',
            phone: '',
            body: '',
        },

        maskOptions: { ...phoneMaskOptions },
    }),

    computed: {
        mailTo() {
            const { form } = this;
            const subject = `${form.name}, ${form.city}, ${form.phone}, ${form.email}`;
            return `mailto:education@ibt.ru?subject=${subject}&body=${form.body}`;
        },

        nameError() {
            if (this.$v.form.name.$dirty && !this.$v.form.name.required) {
                return this.$t('validation.errors.required');
            }
        },

        cityError() {
            if (this.$v.form.city.$dirty && !this.$v.form.city.required) {
                return this.$t('validation.errors.required');
            }
        },

        phoneError() {
            if (this.$v.form.phone.$dirty) {
                if (!this.$v.form.phone.required) return this.$t('validation.errors.required');
                if (!this.$v.form.phone.minLength) return this.$t('validation.errors.required');
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
            return 'Университет';
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
            this.sendFeedback();
        },

        sendFeedback() {
            return sendFeedback({
                page: 'university',
                ...this.form,
            }).then(() => {
                this.formSent = true;
            });
        },
    },

    mounted() {
        window.frisbuy.loadScript('https://www.frisbuy.ru/fb/widget?embed_id=e6718e5b-de39-11ea-ba01-0242ac150002');
    },
};
</script>
