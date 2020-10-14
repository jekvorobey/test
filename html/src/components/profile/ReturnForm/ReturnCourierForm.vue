<template>
    <div class="return-courier-form">
        <div class="return-courier-form__block" v-for="item in courierItems" :key="item.id">
            <div class="return-courier-form__block-header">
                <div class="return-courier-form__block-title">
                    <span class="return-courier-form__delivery-title">{{ item.title }}</span>
                    <span class="return-courier-form__delivery-time">{{ item.time }}</span>
                </div>
                <div class="return-courier-form__block-controls">
                    <v-link class="return-courier-form__edit-btn"
                        ><v-svg name="edit" width="14" height="14" /> Изменить дату и время</v-link
                    >
                </div>
            </div>
            <ul class="return-courier-form__block-list" v-for="product in item.products" :key="product.id">
                <li class="return-courier-form__block-list-item">
                    <return-product-card
                        :href="generateItemProductUrl(product)"
                        :type="product.type"
                        :id="product.id"
                        :quantity="product.quantity"
                        :image="product.image"
                        :name="product.name"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :reason="product.reason"
                    />
                </li>
            </ul>
            <div class="return-courier-form__address-panel">
                <div class="return-courier-form__address-panel-header">
                    <div class="return-courier-form__address-panel-title">Адресс для приезда курьера</div>
                    <div class="return-courier-form__adress-panel-controls">
                        <v-link class="return-courier-form__edit-btn"
                            ><v-svg name="plus-small" width="14" height="14" /> Добавить новый адрес</v-link
                        >
                    </div>
                </div>
                <ul class="return-courier-form__address-panel-list">
                    <checkout-option-card
                        class="return-courier-form__address-panel-item"
                        v-for="(address, index) in item.addresses"
                        :key="`${address.region_guid}-${address.city_guid || address.settlment_guid}-${address.house}`"
                        :selected="item.selectedAddress && isEqualObject(item.selectedAddress, address)"
                        @cardClick="onSetAddress(item, address)"
                        @btnClick="onChangeAddress(address, index)"
                    >
                        {{
                            `${address.city || address.settlement}, ${address.area ? `${address.area}, ` : ''}${
                                address.street ? `${address.street}, ` : ''
                            }${address.house} ${address.block || ''}, ${address.post_index}`
                        }}
                    </checkout-option-card>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import ReturnProductCard from '@components/profile/ReturnProductCard/ReturnProductCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE, COURIER_DELIVERY, ADDRESSES } from '@store/modules/Profile/modules/ReturnPage';

import _isEqual from 'lodash/isEqual';
import { generateProductUrl } from '@util/catalog';
import '@images/sprites/edit.svg';
import '@images/sprites/plus-small.svg';
import './ReturnCourierForm.css';

const RETURN_MODULE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-courier-form',

    components: {
        VSvg,
        VLink,

        ReturnProductCard,
        CheckoutOptionCard,
    },

    data() {
        return {
            courierItems: [],
        };
    },

    computed: {
        ...mapState(RETURN_MODULE_PATH, [COURIER_DELIVERY, ADDRESSES]),
    },

    methods: {
        isEqualObject(obj1, obj2) {
            return _isEqual(obj1, obj2);
        },

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onSetAddress(item, address) {
            item.selectedAddress = address;
        },

        onChangeAddress() {},

        init() {
            this.courierItems = this[COURIER_DELIVERY].map((item) => {
                return {
                    ...item,
                    addresses: this[ADDRESSES].map((a) => ({ ...a })),
                };
            });
        },
    },

    beforeMount() {
        this.init();
    },
};
</script>
