<template>
    <section class="section promocodes-view">
        <div class="container container--tablet-lg promocodes-view__header">
            <h2 class="promocodes-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

            <div class="promocodes-view__header-controls">
                <radio-switch
                    class="promocodes-view__header-switch"
                    :value="selectedStatus"
                    :items="promocodeStatus"
                    id="promocode-switch"
                    key-field="value"
                    name="promocodeStatus"
                    @input="onStatusChanged"
                />

                <button class="btn btn--outline promocodes-view__header-btn" @click="onPromocodeRequest">
                    Запрос промокода
                </button>
            </div>
        </div>

        <template v-if="items && items.length">
            <div class="container container--tablet-lg">
                <table class="promocodes-view__table" v-if="!isTabletLg">
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="15%" />
                        <col width="35%" />
                    </colgroup>

                    <thead class="promocodes-view__table-head">
                        <tr class="promocodes-view__table-tr promocodes-view__table-tr--header">
                            <th class="promocodes-view__table-th">Промокод</th>
                            <th class="promocodes-view__table-th">Срок действия</th>
                            <th class="promocodes-view__table-th">Скидка</th>
                            <th class="promocodes-view__table-th">Категория товаров</th>
                        </tr>
                    </thead>

                    <transition-group tag="tbody" name="fade-in" appear class="promocodes-view__table-body">
                        <tr class="promocodes-view__table-tr" v-for="promocode in items" :key="promocode.code">
                            <td class="promocodes-view__table-td">
                                {{ promocode.code }}&nbsp;&nbsp;
                                <button class="promocodes-view__table-btn" @click="onCopyCode($event, promocode.code)">
                                    <v-svg name="copy" width="16" height="16" />
                                </button>
                            </td>
                            <td class="promocodes-view__table-td">
                                <template v-if="!promocode.endDate && promocode.startDate">c</template>
                                {{ promocode.startDate }}
                                <template
                                    v-if="
                                        (promocode.startDate && promocode.endDate) ||
                                        (!promocode.startDate && !promocode.endDate)
                                    "
                                >
                                    –
                                </template>
                                <template v-if="!promocode.startDate && promocode.endDate">по</template>
                                {{ promocode.endDate }}
                            </td>
                            <td class="promocodes-view__table-td">
                                <template v-if="promocode.discount">
                                    {{ promocode.discount }}
                                </template>
                                <template v-else> – </template>
                            </td>
                            <td class="promocodes-view__table-td">
                                <template v-if="promocode.type !== promocodeType.PRODUCT">Все товары</template>
                                <div
                                    class="promocodes-view__category-panel"
                                    v-else-if="promocode.brands && promocode.brands.items.length > 0"
                                >
                                    <div class="promocodes-view__category-panel-header">
                                        <button
                                            class="promocodes-view__category-panel-btn"
                                            @click="onToggleIsOpen(promocode.brands)"
                                        >
                                            Бренды:
                                        </button>
                                        &nbsp;<v-svg
                                            :class="{ 'icon--rotate-deg180': promocode.brands.isOpen }"
                                            name="arrow-down"
                                            width="16"
                                            height="16"
                                        />
                                    </div>

                                    <ul class="promocodes-view__category-panel-list" v-if="promocode.brands.isOpen">
                                        <li v-for="brand in promocode.brands.items" :key="brand.id">
                                            - {{ brand.name }}
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    class="promocodes-view__category-panel"
                                    v-else-if="promocode.categories && promocode.categories.items.length > 0"
                                >
                                    <div class="promocodes-view__category-panel-header">
                                        <button
                                            class="promocodes-view__category-panel-btn"
                                            @click="onToggleIsOpen(promocode.categories)"
                                        >
                                            Категории:
                                        </button>
                                        &nbsp;<v-svg name="arrow-down" width="16" height="16" />
                                    </div>

                                    <ul class="promocodes-view__category-panel-list" v-if="promocode.categories.isOpen">
                                        <li v-for="category in promocode.categories.items" :key="category.id">
                                            - {{ category.name }}
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    class="promocodes-view__category-panel"
                                    v-else-if="promocode.offers"
                                    v-for="key in Object.keys(promocode.offers)"
                                    :key="key"
                                >
                                    <div class="promocodes-view__category-panel-header">
                                        <button
                                            class="promocodes-view__category-panel-btn"
                                            @click="onToggleIsOpen(promocode.offers[key])"
                                        >
                                            {{ key }}:
                                        </button>
                                        &nbsp;<v-svg
                                            :class="{ 'icon--rotate-deg180': promocode.offers[key].isOpen }"
                                            name="arrow-down"
                                            width="16"
                                            height="16"
                                        />
                                    </div>

                                    <ul
                                        class="promocodes-view__category-panel-list"
                                        v-if="promocode.offers[key].isOpen"
                                    >
                                        <li v-for="offer in promocode.offers[key].items" :key="offer.name">
                                            - {{ offer.name }}
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>

            <ul class="promocodes-view__list" v-if="isTabletLg">
                <li
                    class="container container--tablet-lg promocodes-view__list-item"
                    v-for="promocode in promocodes"
                    :key="promocode.id"
                >
                    <info-row class="promocodes-view__list-item-row" name="Промокод">
                        {{ promocode.code }}&nbsp;&nbsp;
                        <button class="promocodes-view__table-btn" @click="onCopyCode($event, promocode.code)">
                            <v-svg name="copy" width="16" height="16" />
                        </button>
                    </info-row>
                    <info-row class="promocodes-view__list-item-row" name="Срок действия">
                        <template v-if="!promocode.endDate && promocode.startDate">c</template>
                        {{ promocode.startDate }}
                        <template v-if="promocode.startDate && promocode.endDate">–</template>
                        <template v-if="!promocode.startDate && promocode.endDate">по</template>
                        {{ promocode.endDate }}
                    </info-row>
                    <info-row class="promocodes-view__list-item-row" name="Скидка" :value="promocode.discount" />
                    <info-row class="promocodes-view__list-item-row" name="Категория товаров">
                        <template v-if="promocode.type !== promocodeType.PRODUCT">Все товары</template>
                        <div
                            class="promocodes-view__category-panel"
                            v-else-if="promocode.brands && promocode.brands.items.length > 0"
                        >
                            <div class="promocodes-view__category-panel-header">
                                <button
                                    class="promocodes-view__category-panel-btn"
                                    @click="onToggleIsOpen(promocode.brands)"
                                >
                                    Бренды:
                                </button>
                                &nbsp;<v-svg
                                    :class="{ 'icon--rotate-deg180': promocode.brands.isOpen }"
                                    name="arrow-down"
                                    width="16"
                                    height="16"
                                />
                            </div>

                            <ul class="promocodes-view__category-panel-list" v-if="promocode.brands.isOpen">
                                <li v-for="brand in promocode.brands.items" :key="brand.id">- {{ brand.name }}</li>
                            </ul>
                        </div>
                        <div
                            class="promocodes-view__category-panel"
                            v-else-if="promocode.categories && promocode.categories.items.length > 0"
                        >
                            <div class="promocodes-view__category-panel-header">
                                <button
                                    class="promocodes-view__category-panel-btn"
                                    @click="onToggleIsOpen(promocode.categories)"
                                >
                                    Категории:
                                </button>
                                &nbsp;<v-svg name="arrow-down" width="16" height="16" />
                            </div>

                            <ul class="promocodes-view__category-panel-list" v-if="promocode.categories.isOpen">
                                <li v-for="category in promocode.categories.items" :key="category.id">
                                    - {{ category.name }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="promocodes-view__category-panel"
                            v-else-if="promocode.offers"
                            v-for="key in Object.keys(promocode.offers)"
                            :key="key"
                        >
                            <div class="promocodes-view__category-panel-header">
                                <button
                                    class="promocodes-view__category-panel-btn"
                                    @click="onToggleIsOpen(promocode.offers[key])"
                                >
                                    {{ key }}:
                                </button>
                                &nbsp;<v-svg
                                    :class="{ 'icon--rotate-deg180': promocode.offers[key].isOpen }"
                                    name="arrow-down"
                                    width="16"
                                    height="16"
                                />
                            </div>

                            <ul class="promocodes-view__category-panel-list" v-if="promocode.offers[key].isOpen">
                                <li v-for="offer in promocode.offers[key].items" :key="offer.name">
                                    - {{ offer.name }}
                                </li>
                            </ul>
                        </div>
                    </info-row>
                </li>
            </ul>
        </template>
        <empty-placeholder-panel
            class="promocodes-view__attention"
            v-else
            :show-btn="!isTablet"
            @btn-click="onPromocodeRequest"
        >
            <template v-if="!isArchive">
                У вас пока нет активных промо-кодов.<br />
                Воспользуйтесь функцией «Запросить промо-код» для привлечения аудитории к определенным продуктам или
                категориям товаров.
            </template>
            <template v-else>
                Архив ваших промо-кодов пуст.
            </template>

            <template v-slot:btn>
                Запрос промокода
            </template>
        </empty-placeholder-panel>

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" @created="onChatCreated" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as PROMOCODES_MODULE, ITEMS } from '@store/modules/Profile/modules/Promocodes';

import { PROMOCODES } from '@store/modules/Profile/modules/Promocodes/getters';
import { FETCH_PROMOCODES_DATA, SET_LOAD_PATH } from '@store/modules/Profile/modules/Promocodes/actions';

import { modalName, themeCodes } from '@enums';
import { promocodeType } from '@enums/checkout';
import { digit2DateSettings } from '@settings';
import { saveToClipboard } from '@util';
import { $store, $progress, $logger } from '@services';
import '@images/sprites/copy.svg';
import '@images/sprites/arrow-down.svg';
import '@images/sprites/info-middle.svg';
import './Promocodes.css';

const PROMOCODES_MODULE_PATH = `${PROFILE_MODULE}/${PROMOCODES_MODULE}`;

export default {
    name: 'promocodes',

    components: {
        VSvg,
        VLink,
        VButton,

        RadioSwitch,
        InfoRow,
        EmptyPlaceholderPanel,

        MessageModal,
    },

    data() {
        const promocodeStatus = [
            {
                value: 0,
                title: 'Действующие',
            },
            {
                value: 1,
                title: 'Архив',
            },
        ];

        return {
            selectedStatus: promocodeStatus[0].value,
            promocodeStatus,
            items: [],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapGetters(PROMOCODES_MODULE_PATH, [PROMOCODES]),

        ...mapState(MODAL_MODULE, {
            isMessageOpen: state =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),

        isArchive() {
            const {
                query: { isArchive = 0 },
            } = this.$route;

            return Number(isArchive) === 1;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROMOCODES_MODULE_PATH, [FETCH_PROMOCODES_DATA]),

        onStatusChanged(value) {
            this.$router.replace({ path: this.$route.path, query: { isArchive: value } });
        },

        setFilterValue(value = 0) {
            this.selectedStatus = Number(value);
        },

        onCopyCode(e, code) {
            const result = saveToClipboard(code);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });
            e.target.focus();
        },

        onToggleIsOpen(item) {
            item.isOpen = !item.isOpen;
        },

        onChatCreated() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message: 'Запрос отправлен, администратор свяжется с вами в ближайшее время.',
                },
            });
        },

        onPromocodeRequest() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.MESSAGE,
                open: true,
                state: {
                    themeCode: themeCodes.PROMOCODE,
                },
            });
        },
    },

    watch: {
        [PROMOCODES](value) {
            this.items = value || [];
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { isArchive = 0 },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][PROMOCODES_MODULE];

        // если все загружено, пропускаем
        if (fullPath === loadPath) next(vm => vm.setFilterValue(isArchive));
        else {
            $progress.start();
            $store
                .dispatch(`${PROMOCODES_MODULE_PATH}/${FETCH_PROMOCODES_DATA}`, isArchive)
                .then(() => {
                    $store.dispatch(`${PROMOCODES_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        vm.setFilterValue(isArchive);
                        $progress.finish();
                    });
                })
                .catch(error =>
                    next(vm => {
                        $progress.fail();
                    })
                );
        }
    },

    async beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            query: { isArchive = 0 },
        } = to;

        const {
            query: { isArchive: fromIsArchive },
        } = from;

        if (isArchive == fromIsArchive) return next();

        try {
            this.$progress.start();
            await this[FETCH_PROMOCODES_DATA](isArchive);
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }
    },

    created() {
        this.promocodeType = promocodeType;
        this.items = this[PROMOCODES];
        this.setFilterValue(this.$route.query.isArchive);
    },
};
</script>
