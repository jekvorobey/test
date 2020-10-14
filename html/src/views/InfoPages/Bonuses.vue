<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <div class="info-pages-block__content">
            <h3 class="info-pages-block__subtitle">Получай бонусы за покупки</h3>
            <ul class="list">
                <li>до 10% стоимости товаров</li>
                <li>бонусный счет активируется при регистрации</li>
                <li>актуальный баланс в Личном кабинете в разделе Бонусная программа</li>
            </ul>
            <br />

            <h3 class="info-pages-block__subtitle">Простая и понятная система начисления баллов</h3>
            <ul class="list">
                <li>количество бонусов за покупку смотри на странице товара и в корзине при оформлении заказа</li>
                <li>начисление через 7 дней после совершения покупки</li>
                <li>бонусы действуют 60 дней со дня начисления</li>
            </ul>
            <br />

            <h3 class="info-pages-block__subtitle">Оплачивай товары: один бонус — один рубль</h3>
            <ul class="list">
                <li>до 15% стоимости товаров по полной цене и до 10%, если товар уже со скидкой</li>
                <li>
                    максимальное количество бонусов, доступных для оплаты, указывается в корзине при оформлении заказа
                </li>
                <li>используй бонусы частично или полностью по своему усмотрению</li>
            </ul>
            <br />

            <span>
                С полными правилами бонусной программы можно ознакомиться по
                <strong>
                    <router-link :to="bonusProgramLink">ссылке</router-link>
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
