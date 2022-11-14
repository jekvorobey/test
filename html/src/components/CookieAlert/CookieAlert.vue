<template>
    <transition name="slip">
        <div class="cookie-alert" :class="{'cookie-alert-show': show}">
            <div class="cookie-alert__wrapper">
                <div class="cookie-alert__text">
                    {{ textToShow }}
                    <router-link to="/agreements/privacy-policy">Политикой конфиденциальности</router-link>
                </div>
                <button @click="onClose" class="cookie-alert_btn">
                    <v-svg name="cross" width="24" height="23" modifier="cookie-alert-close"/>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
    import './CookieAlert.css';
    import '@images/sprites/trash.svg';

    import VSvg from "@controls/VSvg/VSvg.vue";
    import {$cookie} from "@services";

    export default {
        name: 'cookie-alert',
        components: {VSvg},
        data() {
            return {
                show: false,
            };
        },
        methods: {
            onClose() {
                this.show = false;

                $cookie.set('agreeCookie', true, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    path: '/',
                });
            },
        },
        computed: {
            isTabletLg() {
                return this.$mq.tabletLg;
            },
            textToShow() {
                return this.isTabletLg ? 'Мы собираем куки. Посещая страницы сайта, вы соглашаетесь с ' : 'На сайте используются файлы cookies, которые его делают более удобным для каждого пользователя. Посещая страницы сайта, вы соглашаетесь с '
            }
        },
        mounted() {
            setTimeout(() => {
                this.show = !$cookie.get('agreeCookie');
            }, 4000)
        }
    };
</script>

