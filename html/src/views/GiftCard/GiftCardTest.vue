<template>
    <section class="section product-view" :class="{ 'product-view--scroll': scroll }">
        <breadcrumbs class="container university-view__breadcrumbs">
            <breadcrumb-item key="main" to="/">
                <v-svg v-if="isTablet" name="home" width="10" height="10" />
                <span v-else>Главная</span>
            </breadcrumb-item>
            <breadcrumb-item key="sec" to="/podarocnye-sertifikaty">Подарочные сертификаты</breadcrumb-item>
            <breadcrumb-item key="last" to="/podarocnye-sertifikaty">Проверка</breadcrumb-item>
        </breadcrumbs>

        <section class="section" v-if="askLogin">
            <div class="container">
                Действия с сертификатами доступны только залогиненным пользователям.
                <v-button @click="doLogin">Войти</v-button>
            </div>
        </section>
        <section class="section" v-else>
            <div class="container">
                <div class="my-container">
                    <div>
                        <v-input v-model="cardId" placeholder="ID">ID сертификата</v-input>
                        <v-button @click="doBalance">Запросить баланс</v-button>
                        <hr />
                        <v-input v-model="pin" placeholder="PIN">PIN</v-input>
                        <v-button @click="doActivate">Активировать</v-button>
                        <hr />
                        <v-input v-model="sum" placeholder="Сумма">Сумма</v-input>
                        <v-button @click="doPay">Списать</v-button>
                    </div>
                    <div :class="{ output: true, hasError: lastError }">{{ lastOutput }}</div>
                </div>
            </div>
        </section>
        <br />
        <br />
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { authMode, modalName } from '@enums';
import { SCROLL } from '@store';

import '@images/sprites/home.svg';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { mapActions, mapState } from 'vuex';
import { $http } from '@services';
import { cartItemTypes } from '@enums/product.js';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

export default {
    name: 'GiftCard',

    components: {
        VButton,
        VInput,
        Breadcrumbs,
        BreadcrumbItem,
    },

    data: () => ({
        isLoading: false,
        cardId: '',
        pin: '',
        lastOutput: '',
        lastError: false,
        sum: '',
    }),

    computed: {
        ...mapState([SCROLL]),

        ...mapState(MODAL_MODULE, {
            isModalOpen: (state) => state[MODALS][modalName.TICKET_EDIT] && state[MODALS][modalName.TICKET_EDIT].open,
        }),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        productType() {
            return cartItemTypes.CERTIFICATE;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
        askLogin() {
            return !this[HAS_SESSION];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        doLogin() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.AUTH,
                open: true,
                state: {
                    activeTab: authMode.LOGIN,
                },
            });
        },

        startLoading() {
            this.lastError = false;
            this.lastOutput = 'Отправка запроса в апи...';
        },

        outputSuccess(response) {
            this.lastError = false;
            this.lastOutput = JSON.stringify(response, null, '\t');
        },

        outputError(error) {
            this.lastError = true;
            this.lastOutput = 'ОШИБКА:\n' + JSON.stringify(error, null, '\t');
        },

        doBalance() {
            this.startLoading();
            $http
                .get('/v1/certificate/card/' + this.cardId)
                .then(this.outputSuccess)
                .catch(this.outputError);
        },

        doActivate() {
            this.startLoading();
            $http.post('/v1/certificate/activate', { pin: this.pin }).then(this.outputSuccess).catch(this.outputError);
        },

        doPay() {
            this.startLoading();
            $http
                .post('/v1/certificate/card/' + this.cardId + '/pay', { sum: this.sum })
                .then(this.outputSuccess)
                .catch(this.outputError);
        },

        onScrollTo(ref, offset = 0) {
            window.scrollTo({ top: ref.offsetTop + offset, behavior: 'smooth' });
        },
    },
};
</script>

<style>
.my-container {
    display: flex;
}
.output {
    background: #d4c6a3;
    flex-grow: 1;
    margin-left: 20px;
    padding: 10px;
    border-radius: 10px;
    white-space: pre;
}
.output.hasError {
    background: #ea9595;
}

.product-view__header-detail-brand-link {
    margin-left: 23px;
}

.university-view__breadcrumbs .breadcrumb-item {
    color: #7d7d7d !important;
}
</style>
