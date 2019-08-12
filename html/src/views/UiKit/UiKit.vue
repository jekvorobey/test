<template>
    <section class="section ui-kit">
        <button class="ui-kit-panel-btn" @click="isOpen = !isOpen">|||</button>
        <transition name="slide-left">
            <ul v-if="isOpen" class="ui-kit-panel">
                <li v-for="(item, index) in links" :key="index">
                    <router-link :to="item.to">{{ item.desc }}</router-link>
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
import UiKitColors from './UiKitColors.vue';
import UiKitBase from './UiKitBase.vue';
import UiKitButtons from './UiKitButtons.vue';
import UiKitRadioButtons from './UiKitRadioButtons.vue';
import UiKitIcons from './UiKitIcons.vue';
import UiKitCalendar from './UiKitCalendar.vue';
import UiKitCheckBoxes from './UiKitCheckBoxes.vue';
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

export default {
    name: 'ui-kit',
    components: {
        UiKitColors,
        UiKitBase,
        UiKitButtons,
        UiKitRadioButtons,
        UiKitIcons,
        UiKitCalendar,
        UiKitCheckBoxes,
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
    },

    data() {
        return {
            isOpen: false,
            links: [
                {
                    to: 'base',
                    desc: 'Базовые стили',
                },
                {
                    to: 'icons',
                    desc: 'Иконки',
                },
                {
                    to: 'colors',
                    desc: 'Цвета',
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
                    to: 'buttons',
                    desc: 'Кнопки',
                },
                {
                    to: 'links',
                    desc: 'Ссылки',
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
                    to: 'calendar',
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
                    to: 'tooltips',
                    desc: 'Тултипы',
                },
                {
                    to: 'tables',
                    desc: 'Таблицы',
                },
            ],
        };
    },

    beforeRouteUpdate(to, from, next) {
        this.isOpen = false;
        next();
    },

    computed: {
        type() {
            return this.$route.params.type;
        },
    },

    methods: {},

    title() {
        return 'ui-kit';
    },
};
</script>

<style lang="postcss">
/**
 * Стили для красивой страницы ui kit
 * Это стили только для оформления самой статичной страницы, это НЕ стили базовых элементов сайта
 * В прод сборку не попадают
 */

.ui-kit-panel-btn {
    position: fixed;
    z-index: 101;
    width: calc(var(--gs) * 5);
    height: calc(var(--gs) * 5);
    border: 1px solid var(--cl-global);
    background: white;

    @media (--tablet) {
        width: calc(var(--gs) * 4);
        height: calc(var(--gs) * 4);
    }
}

.ui-kit-panel {
    position: fixed;
    background: var(--cl-white);
    z-index: 100;
    top: 139px;
    padding: calc(var(--gs) * 2) calc(var(--gs) * 4);
    border: 1px solid var(--cl-global);
    max-height: 80vh;
    overflow: auto;

    @media (--tablet) {
        top: 86px;
    }
}

.ui-kit-main {
    counter-reset: uiSectionCounter;
}

.ui-kit-section {
    padding: var(--g) 0;
    border-bottom: 1px dashed var(--cl-divider-grey);

    &__hl {
        margin: 0 0 calc(var(--gs) * 2) 0;
        font-size: 32px;
        font-weight: bold;
    }

    &__desc {
        opacity: 0.6;
        margin-bottom: calc(var(--gs) * 2);
    }
}

.ui-kit-colors {
    display: flex;
    flex-wrap: wrap;

    &__col {
        margin-right: calc(var(--gs) * 2);
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: calc(var(--gs) * 2);
        width: calc(100% / 5);

        @media (--tablet) {
            width: 100%;
            margin-right: 0;
        }
    }

    &__name {
        width: 100%;
        height: 100px;
        margin-bottom: calc(var(--gs) * 2);
    }

    &__desc {
        color: var(--cl-grey);
        font-size: 14px;
        text-align: center;
        margin-bottom: 0;
    }
}

.ui-kit-cols {
    display: flex;
    flex-wrap: wrap;
    position: relative;

    &__col {
        flex: 1;
    }
}

.ui-kit-bg-block {
    padding: calc(var(--gs) * 3) 0;
    background-color: var(--cl-bg-grey);
}

.ui-kit-desc {
    font-size: 11px;
    opacity: 0.6;
}

.ui-kit-sidebar {
    background: rgba(#000, 0.5);
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;

    &.is-visible {
        display: block;
    }

    &-open {
        background: #ccc;
        box-shadow: 0 0 10px rgba(#000, 0.3);
        position: fixed;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: calc(var(--gs) * 4);
        height: calc(var(--gs) * 4);
        font-size: 0;
        line-height: 0;
        cursor: pointer;
        z-index: 9999;

        span {
            background: #000;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(var(--gs) * 2);
            height: calc(var(--gs) / 2);
            text-indent: -9999px;

            &::before,
            &::after {
                content: '';
                background: #000;
                display: inline-block;
                position: absolute;
                left: 0;
                width: calc(var(--gs) * 2);
                height: calc(var(--gs) / 2);
            }

            &::before {
                top: -var(--gs);
            }

            &::after {
                bottom: -var(--gs);
            }
        }
    }

    &__content {
        background: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 300px;
        padding: calc(var(--gs) * 2);
    }

    &__hl {
        margin-bottom: calc(var(--gs) * 3);
        font-weight: bold;
        line-height: 1;
    }

    &__scroll {
        overflow-x: hidden;
        overflow: auto;
        position: absolute;
        top: calc(var(--gs) * 7);
        right: calc(var(--gs) * 2);
        bottom: calc(var(--gs) * 2);
        left: calc(var(--gs) * 2);
    }

    &__close {
        position: absolute;
        top: calc(var(--gs) * 2);
        right: calc(var(--gs) * 2);
        width: calc(var(--gs) * 2);
        height: calc(var(--gs) * 2);
        font-size: 0;
        cursor: pointer;

        .icon {
            width: calc(var(--gs) * 2);
            height: calc(var(--gs) * 2);
        }
    }
}

.ui-kit-catalog {
    margin-bottom: 200px;
}

.kit-test-list-slider {
    .swiper-pagination-bullet {
        background-color: var(--cl-grey);

        &-active {
            background-color: var(--cl-white);
        }
    }
}

.ui-adaptive-accordion {
    @media (--tablet-lg-min) {
        display: flex;
    }

    &__col {
        width: calc((99.9% - 48px) / 3);
        margin-right: calc(var(--gs) * 3);
        flex-shrink: 0;

        &:nth-child(3n) {
            margin-right: 0;
        }
    }

    &__title {
        font-weight: bold;
    }
}
</style>
