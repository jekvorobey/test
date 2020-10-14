<template>
    <div class="return-result">
        <div class="return-result__section">
            <h3 class="return-result__title">Возврат курьеру</h3>
            <div class="return-result-package" v-for="item in courierDelivery" :key="item.id">
                <div class="return-result-package__header">
                    <h4 class="return-result-package__title">
                        {{ item.title }}
                    </h4>
                    <div class="return-result-package__header-info">
                        <span class="return-result-package__address">г. Москва, ул. Стратонавтов, д. 11</span>
                        <span class="return-result-package__date">24 июня (пн), с 10:00 до 18:00</span>
                    </div>
                </div>
                <ul class="return-result-package__content return-result-package__list">
                    <li class="return-result-package__list-item" v-for="product in item.products" :key="product.id">
                        <return-result-card
                            :id="product.id"
                            :href="generateItemProductUrl(product)"
                            :image="product.image"
                            :name="product.name"
                        />
                    </li>
                </ul>
            </div>
        </div>
        <div class="return-result__section">
            <h3 class="return-result__title">Ваши дальнейшие шаги</h3>
            <span class="return-result__description">1. Упакуйте товары в коробку или пакет</span>
            <ul class="return-result__list">
                <li class="return-result__list-item" v-for="(item, index) in courierDelivery" :key="item.id">
                    <span class="return-result__list-item-title">Коробка {{ index + 1 }}</span>
                    <div class="return-result__list-item-product" v-for="product in item.products" :key="product.id">
                        <return-result-card
                            :id="product.id"
                            :href="generateItemProductUrl(product)"
                            :image="product.image"
                            :name="product.name"
                        />
                    </div>
                </li>
            </ul>
            <span class="return-result__description"
                >2. На ваш адрес ya@gmail.ru придет заявление на возврат. Распечатайте заявление в каждую коробку.</span
            >
            <span class="return-result__description"
                >3. Заполните и подпишите заявления. Приложите их в соответствующие коробки.</span
            >
        </div>
        <div class="return-result__controls">
            <v-button class="return-result__subit">Готово</v-button>
            <v-button class="return-result__cancel btn--transparent">Отменить заказ</v-button>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import ReturnResultCard from '@components/profile/ReturnResultCard/ReturnResultCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE, COURIER_DELIVERY } from '@store/modules/Profile/modules/ReturnPage';

import { generateProductUrl } from '@util/catalog';

import './ReturnResult.css';

const RETURN_MODULE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-result',

    components: {
        VButton,

        ReturnResultCard,
    },

    computed: {
        ...mapState(RETURN_MODULE_PATH, [COURIER_DELIVERY]),
    },

    methods: {
        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },
    },
};
</script>
