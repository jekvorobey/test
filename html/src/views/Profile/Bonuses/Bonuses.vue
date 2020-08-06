<template>
    <section class="section bonuses-view">
        <h2 class="bonuses-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="bonuses-view__panel">
            <div class="bonuses-view__panel-col">
                <div class="text-grey bonuses-view__panel-label">Ваши бонусы</div>
                <div class="text-bold bonuses-view__panel-count">{{ info.available }}</div>
            </div>
            <div class="bonuses-view__panel-col">
                <div class="text-grey bonuses-view__panel-label">
                    Ближайшее&nbsp;сгорание:
                    <template v-if="info.next_debit_date">
                        {{ nextDebDate }}
                    </template>
                    <template v-else>
                        нет
                    </template>
                </div>
                <div class="text-medium bonuses-view__panel-burn" v-if="info.next_debit_sum">
                    {{ info.next_debit_sum }} бонусов
                </div>
            </div>
            <div class="bonuses-view__panel-col">
                <div class="text-bold bonuses-view__panel-amount">1 бонус = {{ info.bonus_per_rub }} рубль</div>
                <div>
                    <router-link to="/">Подробнее о бонусной программе</router-link>
                </div>
            </div>
        </div>

        <div class="container container--tablet-lg" v-if="!isTablet">
            <h3 class="bonuses-view__section-hl">Бонусная программа</h3>
            <table class="bonuses-view__table">
                <colgroup>
                    <col width="25%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="15%" />
                </colgroup>
                <thead class="bonuses-view__table-head">
                    <tr class="bonuses-view__table-tr bonuses-view__table-tr--header">
                        <th class="bonuses-view__table-th">Заказ / событие</th>
                        <th class="bonuses-view__table-th">Списано&nbsp;всего<br />{{ info.debit_all }}</th>
                        <th class="bonuses-view__table-th">Начислено&nbsp;всего<br />{{ info.received_all }}</th>
                        <th class="bonuses-view__table-th">Статус</th>
                        <th class="bonuses-view__table-th">Дата</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="bonuses-view__table-body">
                    <tr class="bonuses-view__table-tr" v-for="item in bonuses" :key="item.id">
                        <td class="bonuses-view__table-td">{{ item.name }}</td>
                        <td class="bonuses-view__table-td">
                            {{ item.status === bonusStatus.TAKEN ? item.value : '' }}
                        </td>
                        <td class="bonuses-view__table-td">
                            {{ item.status !== bonusStatus.TAKEN ? item.value : '' }}
                        </td>
                        <td class="bonuses-view__table-td">{{ item.statusString }}</td>
                        <td class="bonuses-view__table-td">{{ item.date }}</td>
                    </tr>
                </transition-group>
            </table>
        </div>

        <ul class="bonuses-view__list" v-else>
            <li class="bonuses-view__list-item" tabindex="0" v-for="item in bonuses" :key="item.id">
                <info-row class="bonuses-view__list-item-row" name="Заказ / событие" :value="item.name" />
                <info-row
                    class="bonuses-view__list-item-row"
                    name="Списано"
                    :value="item.status === bonusStatus.TAKEN ? item.value : 0"
                >
                </info-row>
                <info-row
                    class="bonuses-view__list-item-row"
                    name="Начислено"
                    :value="item.status !== bonusStatus.TAKEN ? item.value : 0"
                >
                </info-row>
                <info-row class="bonuses-view__list-item-row" name="Статус" :value="item.statusString" />
                <info-row class="bonuses-view__list-item-row" name="Дата" :value="item.date" />
            </li>
        </ul>

        <div class="bonuses-view__controls" v-if="pagesCount > 1">
            <div class="container container--tablet-lg">
                <show-more-button
                    v-if="activePage !== pagesCount"
                    btn-class="btn--outline bonuses-view__controls-btn"
                    @click="onShowMore"
                >
                    Показать ещё
                </show-more-button>
                <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
            </div>
        </div>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { mapActions, mapGetters, mapState } from 'vuex';
import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import {
    NAME as BONUSES_MODULE,
    ITEMS,
    ACTIVE_PAGE,
    RANGE,
    BONUSES,
    INFO,
} from '@store/modules/Profile/modules/Bonuses';
import { SET_LOAD_PATH, FETCH_BONUSES_DATA } from '@store/modules/Profile/modules/Bonuses/actions';
import { PAGES_COUNT } from '@store/modules/Profile/modules/Bonuses/getters';

import { $store, $progress } from '@services';
import { getDate } from '@util';
import { DEFAULT_PAGE } from '@constants';
import { numericYearDateSettings } from '@settings';
import { bonusStatus } from '@enums/profile';
import './Bonuses.css';

const BONUSES_MODULE_PATH = `${PROFILE_MODULE}/${BONUSES_MODULE}`;

export default {
    name: 'bonuses',

    components: {
        VLink,
        VButton,
        VInput,
        VPagination,

        InfoRow,
        ShowMoreButton,
    },

    data() {
        return {
            showMore: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(BONUSES_MODULE_PATH, [ITEMS, ACTIVE_PAGE, BONUSES, INFO]),
        ...mapGetters(BONUSES_MODULE_PATH, [PAGES_COUNT]),

        nextDebDate() {
            const { next_debit_date } = this[INFO] || {};
            return next_debit_date && getDate(next_debit_date).toLocaleDateString(this[LOCALE], numericYearDateSettings);
        },

        bonuses() {
            const items = this[ITEMS] || [];
            return items.map(i => {
                const date = i.created_at && getDate(i.created_at).toLocaleDateString(this[LOCALE], numericYearDateSettings);
                const statusString = this.$t(`bonusStatus.${i.status}`);
                
                return {
                    ...i,
                    statusString,
                    date,
                };
            });
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(BONUSES_MODULE_PATH, [FETCH_BONUSES_DATA]),

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { page = DEFAULT_PAGE },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][BONUSES_MODULE];

        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${BONUSES_MODULE_PATH}/${FETCH_BONUSES_DATA}`, { page })
                .then(() => {
                    $store.dispatch(`${BONUSES_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    $progress.fail();
                    next();
                });
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
            query: { page = DEFAULT_PAGE },
        } = to;

        try {
            this.$progress.start();
            await this[FETCH_BONUSES_DATA]({ page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },

    created() {
        this.bonusStatus = bonusStatus;
    },
};
</script>
