<template>
    <section class="section promocodes-view">
        <div class="container container--tablet-lg promocodes-view__header">
            <h2 class="promocodes-view__hl">
                {{ pageTitle }}
            </h2>

            <div class="promocodes-view__header-controls">
                <radio-switch
                    class="promocodes-view__header-switch"
                    v-if="showSwitch"
                    id="promocode-switch"
                    key-field="value"
                    name="promocodeStatus"
                    :value="selectedStatus"
                    :items="promocodeStatus"
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
                        <col width="35%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="30%" />
                    </colgroup>

                    <thead class="promocodes-view__table-head">
                        <tr class="promocodes-view__table-tr promocodes-view__table-tr--header">
                            <th class="promocodes-view__table-th">Промокод</th>
                            <th class="promocodes-view__table-th">Срок действия</th>
                            <th class="promocodes-view__table-th">Скидка</th>
                            <th class="promocodes-view__table-th">Категория товаров/услуг</th>
                        </tr>
                    </thead>

                    <transition-group tag="tbody" name="fade-in" appear class="promocodes-view__table-body">
                        <tr class="promocodes-view__table-tr" v-for="promocode in items" :key="promocode.code">
                            <td class="promocodes-view__table-td">
                                {{ promocode.code }}&nbsp;&nbsp;
                                <button
                                    class="promocodes-view__table-btn promocodes-view__copy-btn"
                                    @click="onCopyCode($event, promocode.code)"
                                >
                                    <v-svg name="copy" width="16" height="16" />
                                    <span v-if="!isTablet">Скопировать</span>
                                </button>
                            </td>
                            <td class="promocodes-view__table-td">
                                <template v-if="!promocode.endDate && promocode.startDate">c</template>
                                {{ promocode.startDate }}
                                <template v-if="promocode.startDate && promocode.endDate"> - </template>
                                <template v-else-if="!promocode.startDate && !promocode.endDate">Бессрочный</template>
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
                                <template v-if="promocode.type === promocodeType.DELIVERY">
                                    Бесплатная доставка
                                </template>
                                <template v-if="promocode.type === promocodeType.GIFT"> Подарок </template>
                                <template v-else-if="promocode.type === promocodeType.BONUS"> Бонусы </template>
                                <template v-else-if="promocode.type === promocodeType.PRODUCT">
                                    <template v-if="promocode.discountType === promocodeDiscountType.DELIVERY">
                                        Скидка на доставку
                                    </template>
                                    <template v-else-if="promocode.discountType === promocodeDiscountType.CART">
                                        Скидка на сумму корзины
                                    </template>
                                    <template v-else-if="promocode.discountType === promocodeDiscountType.BUNDLE">
                                        Скидка на комплект
                                    </template>
                                    <div
                                        class="promocodes-view__category-panel"
                                        v-else-if="promocode.discountType === promocodeDiscountType.OFFER"
                                        v-for="key in Object.keys(promocode.offers)"
                                        :key="key"
                                    >
                                        <button
                                            class="promocodes-view__category-panel-header-btn"
                                            @click="onToggleIsOpen(promocode.offers[key])"
                                        >
                                            {{ key }}: &nbsp;<v-svg
                                                :class="{ 'icon--rotate-deg180': promocode.offers[key].isOpen }"
                                                name="arrow-down"
                                                width="16"
                                                height="16"
                                            />
                                        </button>

                                        <ul
                                            class="promocodes-view__category-panel-list"
                                            v-if="promocode.offers[key].isOpen"
                                        >
                                            <li v-for="offer in promocode.offers[key].items" :key="offer.name">
                                                - {{ offer.name }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="promocodes-view__category-panel" v-else>
                                        <template v-if="promocode.discountType === promocodeDiscountType.BRAND">
                                            <button
                                                class="promocodes-view__category-panel-header-btn"
                                                @click="onToggleIsOpen(promocode.brands)"
                                            >
                                                Бренды: &nbsp;<v-svg
                                                    :class="{ 'icon--rotate-deg180': promocode.brands.isOpen }"
                                                    name="arrow-down"
                                                    width="16"
                                                    height="16"
                                                />
                                            </button>

                                            <ul
                                                class="promocodes-view__category-panel-list"
                                                v-if="promocode.brands.isOpen"
                                            >
                                                <li v-for="brand in promocode.brands.items" :key="brand.id">
                                                    - {{ brand.name }}
                                                </li>
                                            </ul>
                                        </template>
                                        <template v-else-if="promocode.discountType === promocodeDiscountType.CATEGORY">
                                            <button
                                                class="promocodes-view__category-panel-header-btn"
                                                @click="onToggleIsOpen(promocode.categories)"
                                            >
                                                Категории: &nbsp;<v-svg name="arrow-down" width="16" height="16" />
                                            </button>

                                            <ul
                                                class="promocodes-view__category-panel-list"
                                                v-if="promocode.categories.isOpen"
                                            >
                                                <li v-for="category in promocode.categories.items" :key="category.id">
                                                    - {{ category.name }}
                                                </li>
                                            </ul>
                                        </template>
                                    </div>
                                </template>
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
                        <button
                            class="promocodes-view__table-btn promocodes-view__copy-btn"
                            @click="onCopyCode($event, promocode.code)"
                        >
                            <v-svg name="copy" width="16" height="16" />
                            Скопировать
                        </button>
                    </info-row>
                    <info-row class="promocodes-view__list-item-row" name="Срок действия">
                        <template v-if="!promocode.endDate && promocode.startDate">c</template>
                        {{ promocode.startDate }}
                        <template v-if="promocode.startDate && promocode.endDate">–</template>
                        <template v-else-if="!promocode.startDate && !promocode.endDate">Бессрочный</template>
                        <template v-if="!promocode.startDate && promocode.endDate">по</template>
                        {{ promocode.endDate }}
                    </info-row>
                    <info-row class="promocodes-view__list-item-row" name="Скидка" :value="promocode.discount" />
                    <info-row class="promocodes-view__list-item-row" name="Категория товаров/услуг">
                        <template v-if="promocode.type === promocodeType.DELIVERY"> Бесплатная доставка </template>
                        <template v-if="promocode.type === promocodeType.GIFT"> Подарок </template>
                        <template v-else-if="promocode.type === promocodeType.BONUS"> Бонусы </template>
                        <template v-else-if="promocode.type === promocodeType.PRODUCT">
                            <template v-if="promocode.discountType === promocodeDiscountType.DELIVERY">
                                Скидка на доставку
                            </template>
                            <template v-else-if="promocode.discountType === promocodeDiscountType.CART">
                                Скидка на сумму корзины
                            </template>
                            <div
                                class="promocodes-view__category-panel"
                                v-else-if="promocode.discountType === promocodeDiscountType.OFFER"
                                v-for="key in Object.keys(promocode.offers)"
                                :key="key"
                            >
                                <button
                                    class="promocodes-view__category-panel-header-btn"
                                    @click="onToggleIsOpen(promocode.offers[key])"
                                >
                                    {{ key }}: &nbsp;<v-svg
                                        :class="{ 'icon--rotate-deg180': promocode.offers[key].isOpen }"
                                        name="arrow-down"
                                        width="16"
                                        height="16"
                                    />
                                </button>

                                <ul class="promocodes-view__category-panel-list" v-if="promocode.offers[key].isOpen">
                                    <li v-for="offer in promocode.offers[key].items" :key="offer.name">
                                        - {{ offer.name }}
                                    </li>
                                </ul>
                            </div>
                            <div class="promocodes-view__category-panel" v-else>
                                <template v-if="promocode.discountType === promocodeDiscountType.BRAND">
                                    <button
                                        class="promocodes-view__category-panel-header-btn"
                                        @click="onToggleIsOpen(promocode.brands)"
                                    >
                                        Бренды: &nbsp;<v-svg
                                            :class="{ 'icon--rotate-deg180': promocode.brands.isOpen }"
                                            name="arrow-down"
                                            width="16"
                                            height="16"
                                        />
                                    </button>

                                    <ul class="promocodes-view__category-panel-list" v-if="promocode.brands.isOpen">
                                        <li v-for="brand in promocode.brands.items" :key="brand.id">
                                            - {{ brand.name }}
                                        </li>
                                    </ul>
                                </template>
                                <template v-else-if="promocode.discountType === promocodeDiscountType.CATEGORY">
                                    <button
                                        class="promocodes-view__category-panel-header-btn"
                                        @click="onToggleIsOpen(promocode.categories)"
                                    >
                                        Категории: &nbsp;<v-svg name="arrow-down" width="16" height="16" />
                                    </button>

                                    <ul class="promocodes-view__category-panel-list" v-if="promocode.categories.isOpen">
                                        <li v-for="category in promocode.categories.items" :key="category.id">
                                            - {{ category.name }}
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </template>
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
            <template v-else>Архив ваших промо-кодов пуст.</template>

            <template v-slot:btn>Запрос промокода</template>
        </empty-placeholder-panel>

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" @created="onChatCreated" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as PROMOCODES_MODULE } from '@store/modules/Profile/modules/Promocodes';

import { PROMOCODES } from '@store/modules/Profile/modules/Promocodes/getters';
import { FETCH_PROMOCODES_DATA, SET_LOAD } from '@store/modules/Profile/modules/Promocodes/actions';

import { modalName, themeCodes } from '@enums';
import { promocodeType, promocodeDiscountType } from '@enums/checkout';
import { saveToClipboard } from '@util';
import { $store, $progress, $context } from '@services';
import metaMixin from '@plugins/meta';
import '@images/sprites/copy.svg';
import '@images/sprites/arrow-down.svg';
import '@images/sprites/info-middle.svg';
import './Promocodes.css';

const PROMOCODES_MODULE_PATH = `${PROFILE_MODULE}/${PROMOCODES_MODULE}`;

export default {
    name: 'promocodes',
    mixins: [metaMixin],

    components: {
        VSvg,

        RadioSwitch,
        InfoRow,
        EmptyPlaceholderPanel,

        MessageModal,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
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
            isMessageOpen: (state) =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),

        showSwitch() {
            const { isArchive, items = [] } = this;
            return (!isArchive && items && items.length > 0) || isArchive;
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

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
        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][PROMOCODES_MODULE]) {
                const {
                    query: { isArchive = 0 },
                } = to;
                const { load } = $store.state[PROFILE_MODULE][PROMOCODES_MODULE];
                const { isServer } = $context;

                // если все загружено, пропускаем
                if (load) {
                    $store.dispatch(`${PROMOCODES_MODULE_PATH}/${SET_LOAD}`, false);
                    return next((vm) => vm.setFilterValue(isArchive));
                }

                $progress.start();
                $store
                    .dispatch(`${PROMOCODES_MODULE_PATH}/${FETCH_PROMOCODES_DATA}`, isArchive)
                    .then(() => {
                        $store.dispatch(`${PROMOCODES_MODULE_PATH}/${SET_LOAD}`, isServer);
                        next((vm) => {
                            vm.setFilterValue(isArchive);
                            $progress.finish();
                        });
                    })
                    .catch(() =>
                        next(() => {
                            $progress.fail();
                        })
                    );
            }
        }

        if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][PROMOCODES_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][PROMOCODES_MODULE],
                (value) => {
                    if (value) proceed();
                }
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
            this.setFilterValue(isArchive);
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }
    },

    beforeCreate() {
        this.promocodeType = promocodeType;
        this.promocodeDiscountType = promocodeDiscountType;
    },

    created() {
        this.items = this[PROMOCODES];
        this.setFilterValue(this.$route.query.isArchive);
    },
};
</script>
