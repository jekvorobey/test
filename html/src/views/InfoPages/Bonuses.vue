<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <div class="info-pages-block__content">
            <h3 class="info-pages-block__subtitle">Получай бонусные баллы за&nbsp;покупки</h3>
            <ul class="list">
                <li>до 10% стоимости товаров</li>
                <li>бонусный счет активируется при&nbsp;регистрации</li>
                <li>актуальный баланс в&nbsp;разделе Бонусная программа Личного кабинета</li>
            </ul>
            <br />

            <h3 class="info-pages-block__subtitle">Простая и понятная система начисления бонусных баллов</h3>
            <ul class="list">
                <li>количество баллов за покупку смотри на&nbsp;странице товара и в&nbsp;корзине при оформлении заказа</li>
                <li>начисление через 7&nbsp;дней после доставки покупки</li>
                <li>бонусные баллы действуют 60&nbsp;дней со&nbsp;дня начисления</li>
            </ul>
            <br />

            <h3 class="info-pages-block__subtitle">Оплачивай товары: один бонусный&nbsp;балл&nbsp;&mdash; один рубль</h3>
            <ul class="list">
                <li>до&nbsp;15%&nbsp;стоимости товаров по&nbsp;полной цене и до&nbsp;10%, если товар со&nbsp;скидкой</li>
                <li>максимальное количество бонусных баллов, доступных для оплаты, указывается в&nbsp;корзине при оформлении заказа</li>
                <li>используй доступные баллы частично или полностью по своему усмотрению</li>
            </ul>
            <br />

            <span>
                С&nbsp;полными Правилами бонусной программы можно ознакомиться 
                <strong>
                    <router-link :to="bonusProgramLink">здесь</router-link>
                </strong>
            </span>
        </div>
    </div>
</template>

<script>
import metaMixin from '@plugins/meta';
import { agreementTypes } from '@enums';

export default {
    name: 'info-pages-bonuses',
    mixins: [metaMixin],

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    computed: {
        bonusProgramLink() {
            return { name: 'Agreements', params: { type: agreementTypes.BONUS_PROGRAM } };
        },

        pageTitle() {
            return 'Бонусы за покупки';
        },
    },
};
</script>
