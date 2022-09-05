<template>
    <div class="page-403">
        <header class="page-403__header">
            <div class="container">
                <a class="page-403__header-logo" href="/">
                    <v-svg name="logo" width="30" height="30" />
                </a>
                <header-logo-panel class="page-403__header-panel">
                    Mаркетплейс для мастеров бьюти-индустрии
                </header-logo-panel>
            </div>
        </header>

        <main class="page-403__main">
            <div class="container">
                <div class="page-403__main-body">
                    <h1 class="page-403__main-hl">403</h1>
                    <p>
                        Мы заметили подозрительную активность с вашего IP адреса. <br />
                        Если вы считаете, что произошла ошибка, то, пожалуйста, обратитеть в нашу службу поддержки
                    </p>
                    <div class="page-403__main-info">
                        <p>
                            <a class="text-bold page-403__main-info-tel" href="tel:88007079070">8 800 707-90-70</a>
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
import './Page403.critical.css';

import VSvg from '@controls/VSvg/VSvg.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-text.svg';

import './Page403.css';

export default {
    name: 'page-403',
    components: {
        VSvg,
        HeaderLogoPanel,
    },
};
</script>
