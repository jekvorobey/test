<template>
    <div class="page-502">
        <header class="page-502__header">
            <div class="container">
                <a class="page-502__header-logo" href="/">
                    <v-svg name="logo" width="30" height="30" />
                </a>
                <header-logo-panel class="page-502__header-panel">
                    Mаркетплейс для мастеров бьюти-индустрии
                </header-logo-panel>
            </div>
        </header>

        <main class="page-502__main">
            <div class="container">
                <div class="page-502__main-body">
                    <h1 class="page-502__main-hl">502</h1>
                    <p>Ой, кажется, на стороне сайта возникли проблемы</p>
                    <div class="page-502__main-info">
                        <p>Если у вас возникли вопросы, обратитесь в службу поддержки:</p>
                        <p>
                            <a class="text-bold page-502__main-info-tel" href="tel:88007079070">8 800 707-90-70</a>
                            &nbsp;(звонок бесплатный)
                        </p>
                        Или напишите нам на почту <a href="mailto:support@ibt.ru">support@ibt.ru</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import './Page502.critical.css';

import VSvg from '@controls/VSvg/VSvg.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-text.svg';

import './Page502.css';

export default {
    name: 'page-502',
    components: {
        VSvg,
        HeaderLogoPanel,
    },
};
</script>
