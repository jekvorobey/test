<template>
    <div class="product-delivery-panel">
        <p>
            Получить в
            <a>г. Москва&nbsp;<v-svg name="arrow-down" width="12" height="12"/></a>
        </p>
        <p>
            Экспресс доставка курьером — 550 ₽,
            <span class="text-grey">сегодня,&nbsp;21&nbsp;июня</span>
        </p>
        <p>Доставка курьером — 350 ₽, <span class="text-grey">завтра,&nbsp;22&nbsp;июня</span></p>
        <p>
            Из пунктов <a>выдачи</a> или <a>постаматов</a> — бесплатно,
            <span class="text-grey">23&nbsp;июня</span>
        </p>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/arrow-down.svg';
import './ProductDeliveryPanel.css';

export default {
    name: 'product-delivery-panel',

    components: {
        VSvg,
    },

    props: {},
};
</script>