<template>
    <section class="section ui-kit">
        <button class="ui-kit-panel-btn" @click="isOpen = !isOpen">|||</button>
        <transition name="slide-left">
            <ul v-if="isOpen" class="ui-kit-panel" :class="{ 'ui-kit-panel--scroll': scroll }">
                <li v-for="(item, index) in links" :key="index">
                    <v-link :to="item.to">{{ item.desc }}</v-link>
                </li>
                <li>
                    <v-link @click="SET_LOCALE('en')">Язык: English</v-link>
                </li>
                <li>
                    <v-link @click="SET_LOCALE('ru')">Язык: Russian</v-link>
                </li>
            </ul>
        </transition>

        <div class="container">
            <transition name="fade" mode="out-in">
                <component :is="`ui-kit-${type}`" />
            </transition>
        </div>
    </section>
</template>

<script>
import VLink from '../../components/controls/VLink/VLink.vue';

import UiKitColors from './UiKitColors.vue';
import UiKitBase from './UiKitBase.vue';
import UiKitButtons from './UiKitButtons.vue';
import UiKitRadioButtons from './UiKitRadioButtons.vue';
import UiKitIcons from './UiKitIcons.vue';
import UiKitDatepicker from './UiKitDatepicker.vue';
import UiKitCheckboxes from './UiKitCheckboxes.vue';
import UiKitDropzones from './UiKitDropzones.vue';
import UiKitForms from './UiKitForms.vue';
import UiKitPaginations from './UiKitPaginations.vue';
import UiKitRangeSlider from './UiKitRangeSlider.vue';
import UiKitCounters from './UiKitCounters.vue';
import UiKitTooltips from './UiKitTooltips.vue';
import UiKitSwitches from './UiKitSwitches.vue';
import UiKitTabs from './UiKitTabs.vue';
import UiKitTables from './UiKitTables.vue';
import UiKitSelects from './UiKitSelects.vue';
import UiKitLinks from './UiKitLinks.vue';
import UiKitList from './UiKitList.vue';
import UiKitAccordions from './UiKitAccordions.vue';
import UiKitCustomComponent from './UiKitCustomComponent.vue';

import { mapActions, mapState } from 'vuex';
import './UiKit.css';

export default {
    name: 'ui-kit',
    components: {
        VLink,

        UiKitColors,
        UiKitBase,
        UiKitButtons,
        UiKitRadioButtons,
        UiKitIcons,
        UiKitDatepicker,
        UiKitCheckboxes,
        UiKitDropzones,
        UiKitForms,
        UiKitPaginations,
        UiKitRangeSlider,
        UiKitCounters,
        UiKitTooltips,
        UiKitSwitches,
        UiKitTabs,
        UiKitTables,
        UiKitSelects,
        UiKitLinks,
        UiKitList,
        UiKitAccordions,
        UiKitCustomComponent,
    },

    data() {
        return {
            isOpen: false,
            links: [
                {
                    to: '/',
                    desc: 'Главная',
                },
                {
                    to: 'base',
                    desc: 'Базовые стили',
                },
                {
                    to: 'list',
                    desc: 'Списки',
                },
                {
                    to: 'colors',
                    desc: 'Цвета',
                },
                {
                    to: 'icons',
                    desc: 'Иконки',
                },
                {
                    to: 'links',
                    desc: 'Ссылки',
                },
                {
                    to: 'buttons',
                    desc: 'Кнопки',
                },
                {
                    to: 'radio-buttons',
                    desc: 'Радиокнопки',
                },
                {
                    to: 'checkboxes',
                    desc: 'Чекбоксы',
                },
                {
                    to: 'switches',
                    desc: 'Переключатели',
                },
                {
                    to: 'forms',
                    desc: 'Формы',
                },
                {
                    to: 'selects',
                    desc: 'Селекты',
                },
                {
                    to: 'dropzones',
                    desc: 'Дропзоны',
                },
                {
                    to: 'datepicker',
                    desc: 'Календари',
                },
                {
                    to: 'range-slider',
                    desc: 'Слайдеры диапазона',
                },
                {
                    to: 'counters',
                    desc: 'Счетчики',
                },
                {
                    to: 'paginations',
                    desc: 'Пагинация',
                },
                {
                    to: 'tabs',
                    desc: 'Табы',
                },
                {
                    to: 'accordions',
                    desc: 'Аккордионы',
                },
                {
                    to: 'tooltips',
                    desc: 'Тултипы',
                },
                {
                    to: 'tables',
                    desc: 'Таблицы',
                },
                {
                    to: 'custom-component',
                    desc: 'Custom',
                },
            ],
        };
    },

    beforeRouteUpdate(to, from, next) {
        this.isOpen = false;
        this.$progress.start();
        next();
        this.$progress.finish();
    },

    computed: {
        ...mapState(['scroll']),
        ...mapState('route', {
            type: state => state.params.type,
        }),
    },

    methods: {
        ...mapActions(['SET_LOCALE']),
    },

    title() {
        return 'ui-kit';
    },
};
</script>
