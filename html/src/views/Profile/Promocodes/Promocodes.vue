<template>
    <section class="section promocodes-view">
        <div class="container container--tablet-lg promocodes-view__header">
            <h2 class="promocodes-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <radio-switch
                class="promocodes-view__switch"
                v-model="selectedStatus"
                :items="promocodeStatus"
                id="promocode-switch"
                key-field="value"
                name="promocodeStatus"
            />
        </div>

        <div class="container container--tablet-lg">
            <table class="promocodes-view__table" v-if="!isTabletLg">
                <colgroup>
                    <col width="20%" />
                    <col width="25%" />
                    <col width="15%" />
                    <col width="40%" />
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
                    <tr class="promocodes-view__table-tr" v-for="promocode in promocodes" :key="promocode.code">
                        <td class="promocodes-view__table-td">
                            {{ promocode.code }}&nbsp;&nbsp;
                            <button class="promocodes-view__table-btn">
                                <v-svg name="copy" width="16" height="16" />
                            </button>
                        </td>
                        <td class="promocodes-view__table-td">{{ promocode.startDate }} – {{ promocode.endDate }}</td>
                        <td class="promocodes-view__table-td">{{ promocode.discount }}</td>
                        <td class="promocodes-view__table-td">
                            <template v-if="promocode.allow && isString(promocode.allow)">
                                {{ promocode.allow }}
                            </template>
                            <template
                                v-else-if="promocode.allow && Array.isArray(promocode.allow)"
                                v-for="{ name, items } in promocode.allow"
                            >
                                {{ name }}:
                                <div v-for="item in items" :key="item">- {{ item }}</div>
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
                    <button class="promocodes-view__table-btn">
                        <v-svg name="copy" width="16" height="16" />
                    </button>
                </info-row>
                <info-row class="promocodes-view__list-item-row" name="Срок действия">
                    {{ promocode.startDate }} – {{ promocode.endDate }}
                </info-row>
                <info-row class="promocodes-view__list-item-row" name="Скидка" :value="promocode.discount" />
                <info-row class="promocodes-view__list-item-row" name="Категория товаров">
                    <template v-if="promocode.allow && isString(promocode.allow)">
                        {{ promocode.allow }}
                    </template>
                    <div
                        v-else-if="promocode.allow && Array.isArray(promocode.allow)"
                        v-for="{ name, items } in promocode.allow"
                        :key="name"
                    >
                        <div>{{ name }}:</div>
                        <div v-for="item in items" :key="item">- {{ item }}</div>
                    </div>
                </info-row>
            </li>
        </ul>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as PROMOCODES_MODULE } from '@store/modules/Profile/modules/Promocodes';
import { PROMOCODES } from '@store/modules/Profile/modules/Promocodes/getters';
import { FETCH_PROMOCODES_DATA, SET_LOAD_PATH } from '@store/modules/Profile/modules/Promocodes/actions';

import { digit2DateSettings } from '@settings';
import { $store, $progress, $logger } from '@services';
import '@images/sprites/copy.svg';
import '@images/sprites/edit.svg';
import './Promocodes.css';

const PROMOCODES_MODULE_PATH = `${PROFILE_MODULE}/${PROMOCODES_MODULE}`;

export default {
    name: 'promocodes',

    components: {
        VSvg,
        VLink,

        RadioSwitch,
        InfoRow,
    },

    data() {
        const promocodeStatus = [
            {
                value: 'active',
                title: 'Действующие',
            },
            {
                value: 'archive',
                title: 'Архив',
            },
        ];

        return {
            selectedStatus: promocodeStatus[0].value,
            promocodeStatus,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapGetters(PROMOCODES_MODULE_PATH, [PROMOCODES]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        isString(obj) {
            return typeof obj === 'string';
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { isArchive = 0 },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][PROMOCODES_MODULE];

        // если все загружено, пропускаем
        if (fullPath === loadPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PROMOCODES_MODULE_PATH}/${FETCH_PROMOCODES_DATA}`, isArchive)
                .then(() => {
                    $store.dispatch(`${PROMOCODES_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => $progress.finish());
                })
                .catch(error => {
                    next(vm => $progress.fail());
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
            query: { isArchive = 0 },
        } = to;

        const {
            query: { isArchive: fromIsArchive },
        } = from;

        if (isArchive === fromIsArchive) return next();

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
};
</script>
