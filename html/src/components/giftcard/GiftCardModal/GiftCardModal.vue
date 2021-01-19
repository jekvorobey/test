<template>
    <general-modal type="sm" class="gift-card-modal" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="gift-card-modal__body">
                <h2>Заполните данные для получения сертификата</h2>

                <div class="gift-card-modal__top">
                    <div class="gift-card-modal__title">
                        <div class="gift-card-modal__preview">
                            <card-design-tag
                                class="product-view__header-detail-options-item"
                                :preview="preview"
                                :selected="true"
                            />
                        </div>
                        <div class="gift-card-modal__title-text">Электронный подарочный сертификат</div>
                    </div>
                    <div class="gift-card-modal__price">
                        <div class="gift-card-modal__amount">
                            <v-counter v-model="order.qty" min="1" max="200" />
                        </div>
                        <div class="gift-card-modal__price-value">
                            <price :value="orderSum" :currency="'RUB'" />
                        </div>
                    </div>
                </div>

                <div class="gift-card-modal__splitter"></div>

                <div class="gift-card-modal__delivery">
                    <div class="gift-card-modal__delivery-date">
                        <div class="gift-card-modal__input-title">Когда доставить</div>
                        <div class="gift-card-modal__delivery-date-input">
                            <div class="delivery-date-input">
                                <div
                                    class="delivery-date-input__item"
                                    v-for="option in dateOptions"
                                    v-bind:key="'do' + option.value"
                                    :class="{
                                        'delivery-date-input__item--active': isDeliveryDateOptionSelected(option.value),
                                    }"
                                    @click="onDeliveryDateClick(option.value)"
                                >
                                    <div v-html="option.label" />
                                </div>
                            </div>
                        </div>
                        <div v-if="isShowDatePicker" class="gift-card-modal__datepicker">
                            <v-datepicker
                                :value="[order.deliveryDate]"
                                inline
                                :allow-input="false"
                                :min-date="minDate"
                                :locale="datepickerLocale"
                                @input="onDeliveryDateSelected"
                            />
                        </div>
                    </div>
                    <div class="gift-card-modal__delivery-time">
                        <div class="gift-card-modal__input-title">Время доставки</div>
                        <div class="gift-card-modal__delivery-time-input">
                            <v-select
                                v-model="order.deliveryTime"
                                :options="deliveryTimeOptions"
                                :searchable="false"
                                label="label"
                            >
                                <template v-slot:error="{ error }">
                                    <transition name="slide-in-bottom" mode="out-in">
                                        <div :key="error" v-if="error">{{ error }}</div>
                                    </transition>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>

                <div class="gift-card-modal__textarea">
                    <v-input v-model="order.comment" tag="textarea" placeholder="Текст поздравления">
                        Ваше поздравление получателю
                    </v-input>
                </div>

                <div class="gift-card-modal__person">
                    <div class="gift-card-modal__person-input">
                        <v-input
                            v-model="order.to_name"
                            placeholder="Имя"
                            :disabled="order.is_to_self"
                            :error="errorNameTo"
                        >
                            Кому
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input>
                    </div>
                    <div class="gift-card-modal__person-input">
                        <div class="gift-card-modal__input-title">
                            <span
                                class="gift-card-modal__contact-tab-title"
                                :class="{
                                    'gift-card-modal__contact-tab-title--active': personTo.activeTab === 'email',
                                }"
                                @click="personTo.activeTab = 'email'"
                            >
                                Email
                            </span>
                            /
                            <span
                                class="gift-card-modal__contact-tab-title"
                                :class="{
                                    'gift-card-modal__contact-tab-title--active': personTo.activeTab === 'phone',
                                }"
                                @click="personTo.activeTab = 'phone'"
                            >
                                Телефон
                            </span>
                        </div>
                        <v-input
                            v-model="order.to_email"
                            placeholder="Email"
                            v-if="personTo.activeTab === 'email'"
                            :disabled="order.is_to_self"
                            :error="errorEmailTo"
                        >
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input>
                        <v-input-mask
                            v-model="order.to_phone"
                            placeholder="Телефон"
                            v-if="personTo.activeTab === 'phone'"
                            :options="maskOptions"
                            :disabled="order.is_to_self"
                            :error="errorPhoneTo"
                        >
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input-mask>
                    </div>
                </div>
                <v-check id="self" name="self" v-model="order.is_to_self" value="1">Отправить себе</v-check>

                <div class="gift-card-modal__person gift-card-modal__person--to">
                    <div class="gift-card-modal__person-input">
                        <v-input
                            v-model="order.from_name"
                            placeholder="Имя"
                            :disabled="order.is_to_self || order.is_anonymous"
                            :error="errorNameFrom"
                        >
                            От кого
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input>
                    </div>
                    <div class="gift-card-modal__person-input">
                        <div class="gift-card-modal__input-title">
                            <span
                                class="gift-card-modal__contact-tab-title"
                                :class="{
                                    'gift-card-modal__contact-tab-title--active': personFrom.activeTab === 'email',
                                }"
                                @click="personFrom.activeTab = 'email'"
                            >
                                Email
                            </span>
                            /
                            <span
                                class="gift-card-modal__contact-tab-title"
                                :class="{
                                    'gift-card-modal__contact-tab-title--active': personFrom.activeTab === 'phone',
                                }"
                                @click="personFrom.activeTab = 'phone'"
                            >
                                Телефон
                            </span>
                        </div>
                        <v-input
                            v-model="order.from_email"
                            placeholder="Email"
                            v-if="personFrom.activeTab === 'email'"
                            :disabled="order.is_to_self || order.is_anonymous"
                            :error="errorEmailFrom"
                        >
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input>
                        <v-input-mask
                            v-model="order.from_phone"
                            placeholder="Телефон"
                            v-if="personFrom.activeTab === 'phone'"
                            :options="maskOptions"
                            :disabled="order.is_to_self || order.is_anonymous"
                            :error="errorPhoneFrom"
                        >
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input-mask>
                    </div>
                </div>
                <v-check
                    id="anonymous"
                    name="anonymous"
                    v-model="order.is_anonymous"
                    value="1"
                    :disabled="order.is_to_self"
                    >Отправить анонимно</v-check
                >

                <v-check id="termsAccepted" name="termsAccepted" v-model="order.terms_accepted" value="1"
                    >Я согласен с <a href="#">условиями оферты</a> и <a>политикой конфиденциальности</a></v-check
                >
            </div>
            <div class="gift-card-modal__submit">
                <v-button
                    class="gift-card-modal__submit-btn"
                    @click="submitOrder()"
                    :disabled="isLoading || !valid"
                >
                    Перейти к оплате
                </v-button>
                <v-spinner :show="isLoading" width="30" height="30" />
            </div>
        </template>
    </general-modal>
</template>

<script>
import { $http } from '@services';
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import CardDesignTag from '@components/giftcard/CardDesignTag/CardDesignTag.vue';
import VCounter from '@controls/VCounter/VCounter.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VDatepicker from '@controls/VDatepicker/VDatepicker.vue';
import Price from '@components/Price/Price.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { DELETE_ALL_ITEMS } from '@store/modules/Cart/actions';
import { NAME as CART_MODULE, CART_DATA, RELATIVE_PRODUCTS } from '@store/modules/Cart';

import { modalName } from '@enums';
import './GiftCardModal.css';

const NAME = modalName.TICKET_EDIT;
import FlatpickrI18n from 'flatpickr/dist/l10n/ru.js';
import { dateToString, addDays } from '@util';

import { phoneMaskOptions } from '@settings';

function createGiftCertificate(order) {
    return $http.post('/v1/certificate/buy', order);
}

export default {
    name: NAME,

    components: {
        CardDesignTag,
        VButton,
        VLink,
        VSpinner,

        GeneralModal,
        VCounter,
        VSelect,
        VInput,
        VInputMask,
        VCheck,
        VDatepicker,
        Price,
    },
    props: {
        designCode: {
            type: [String, Number],
            required: true,
        },

        nominalId: {
            type: [String, Number],
            required: true,
        },

        preview: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            isLoading: false,
            isShowDatePicker: false,
            order: {
                qty: 1,
                is_to_self: false,
                is_anonymous: false,
                terms_accepted: false,
                comment: '',
                from_name: '',
                from_email: '',
                from_phone: '',
                to_name: '',
                to_email: '',
                to_phone: '',
                deliveryDate: this.isoDate(new Date()),
                deliveryTime: { code: '10:00:00', label: '10:00' },
            },

            maskOptions: { ...phoneMaskOptions },

            personFrom: {
                activeTab: 'email',
            },

            personTo: {
                activeTab: 'email',
            },

            deliveryTimeOptions: [
                { code: '00:00:00', label: '00:00' },
                { code: '01:00:00', label: '01:00' },
                { code: '02:00:00', label: '02:00' },
                { code: '03:00:00', label: '03:00' },
                { code: '04:00:00', label: '04:00' },
                { code: '05:00:00', label: '05:00' },
                { code: '06:00:00', label: '06:00' },
                { code: '07:00:00', label: '07:00' },
                { code: '08:00:00', label: '08:00' },
                { code: '09:00:00', label: '09:00' },
                { code: '10:00:00', label: '10:00' },
                { code: '11:00:00', label: '11:00' },
                { code: '12:00:00', label: '12:00' },
                { code: '13:00:00', label: '13:00' },
                { code: '14:00:00', label: '14:00' },
                { code: '15:00:00', label: '15:00' },
                { code: '16:00:00', label: '16:00' },
                { code: '17:00:00', label: '17:00' },
                { code: '18:00:00', label: '18:00' },
                { code: '19:00:00', label: '19:00' },
                { code: '20:00:00', label: '20:00' },
                { code: '21:00:00', label: '21:00' },
                { code: '22:00:00', label: '22:00' },
                { code: '23:00:00', label: '23:00' },
                // {
                //     code: '10:00:00',
                //     label: 'С 10:00 до 18:00',
                // },
                // {
                //     code: '12:00:00',
                //     label: 'С 12:00 до 14:00',
                // },
                // {
                //     code: '13:00:00',
                //     label: 'С 13:00 до 16:00',
                // },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) =>
                state[MODALS][modalName.cart.CLEAR_CART] && state[MODALS][modalName.cart.CLEAR_CART].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        orderSum() {
            return this.order.qty * this.price;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        datepickerLocale() {
            return FlatpickrI18n.ru;
        },

        minDate() {
            return this.isoDate(new Date());
        },

        minOtherDate() {
            return this.isoDate(addDays(new Date(), 4));
        },

        dateOptions() {
            const options = [];
            let date = new Date();
            options.push({ label: 'Сейчас', value: this.isoDate(date) });

            for (let i = 0; i < 3; i++) {
                date = addDays(date, 1);
                options.push({ label: this.uiDate(date), value: this.isoDate(date) });
            }
            options.push({
                label:
                    this.order.deliveryDate >= this.minOtherDate
                        ? this.uiDate(new Date(this.order.deliveryDate))
                        : 'Другая дата',
                value: null,
            });
            return options;
        },

        valid() {
            return this.order.terms_accepted
                && this.isCommentValid(this.order.comment)
                && (
                    this.order.is_to_self || (
                        this.isNameValid(this.order.to_name) && (
                            this.isTabValid(
                                this.personTo.activeTab,
                                this.order['to_'+this.personTo.activeTab]
                            )
                        )
                    )
                )
                && (
                    this.order.is_anonymous || (
                        this.isNameValid(this.order.from_name) && (
                            this.isTabValid(
                                this.personFrom.activeTab,
                                this.order['from_'+this.personFrom.activeTab]
                            )
                        )
                    )
                )
        },

        errorNameTo() {
            return !this.order.is_to_self && this.order.to_name && !this.isNameValid(this.order.to_name) ? "Имя не должно быть пустым" : null
        },

        errorNameFrom() {
            return !this.order.is_anonymous && this.order.from_name && !this.isNameValid(this.order.from_name) ? "Имя не должно быть пустым" : null
        },

        errorEmailTo() {
            return !this.order.is_to_self && this.order['to_email'] && !this.isTabValid('email',this.order['to_email']) ? this.$t('validation.errors.email') : null
        },

        errorEmailFrom() {
            return !this.order.is_anonymous && this.order['from_email'] && !this.isTabValid('email',this.order['from_email']) ? this.$t('validation.errors.email') : null
        },

        errorPhoneTo() {
            return !this.order.is_to_self && this.order['to_phone'] && !this.isTabValid('phone',this.order['to_phone']) ? "Формат +7 XXX XXX-XX-XX" : null
        },

        errorPhoneFrom() {
            return !this.order.is_anonymous && this.order['from_phone'] && !this.isTabValid('phone',this.order['from_phone']) ? "Формат +7 XXX XXX-XX-XX" : null
        }
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [DELETE_ALL_ITEMS]),

        isCommentValid(comment) {
            return true; // не обязательное поле
        },

        isNameValid(name) {
            return name.trim().length > 0;
        },

        isPhoneValid(phone) {
            return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.trim());
        },

        isEmailValid(email) {
            return /^(.+)@(.+){1,}\.(.+){2,}$/.test(email.trim());
        },

        isTabValid(tab, value) {
            switch (tab) {
                case 'email':
                    return this.isEmailValid(value);
                case 'phone':
                    return this.isPhoneValid(value);
            }
            return value.length > 0;
        },

        isoDate(day) {
            return dateToString(day).split('.').reverse().join('-');
        },

        uiDate(day) {
            const wd = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'][day.getDay()];
            return wd + '<br/>' + dateToString(day).substr(0, 5);
        },

        isDeliveryDateOptionSelected(value) {
            if (this.isShowDatePicker) {
                return value === null;
            }
            return value !== null ? value === this.order.deliveryDate : this.order.deliveryDate >= this.minOtherDate;
        },

        onDeliveryDateClick(value) {
            this.isShowDatePicker = value === null;
            if (value !== null) {
                this.order.deliveryDate = value;
            }
        },

        onDeliveryDateSelected(value) {
            this.order.deliveryDate = value[0];
            this.isShowDatePicker = false;
        },

        submitOrder() {
            let orderGenerated = {
                ...this.order,
                nominal_id: this.nominalId,
                design_id: this.designCode,
                delivery_at: this.order.deliveryDate + ' ' + this.order.deliveryTime.code,
            };

            delete orderGenerated.deliveryDate;
            delete orderGenerated.deliveryTime;

            createGiftCertificate(orderGenerated).then((response) => {
                if (response && response.paymentUrl) {
                    document.location.href = response.paymentUrl;
                }
            });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        async onClearCart() {
            const { cartType } = this;

            this.isLoading = true;

            await this[DELETE_ALL_ITEMS](cartType);
            this.isLoading = false;
            this.onClose();
        },
    },
};
</script>
