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
                    <tr class="promocodes-view__table-tr" v-for="promocode in promocodes" :key="promocode.id">
                        <td class="promocodes-view__table-td">
                            {{ promocode.name }}&nbsp;&nbsp;
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
                    {{ promocode.name }}&nbsp;&nbsp;
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

import '@images/sprites/copy.svg';
import '@images/sprites/edit.svg';
import './Promocodes.css';

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
            promocodes: [
                {
                    id: 1,
                    name: 'SOKOLOV',
                    startDate: '1.07.2019',
                    endDate: '31.08.2019',
                    discount: '5%',
                    allow: 'Все товары',
                },
                {
                    id: 2,
                    name: 'SOKOLOV777',
                    startDate: '8.07.2019',
                    endDate: '13.08.2019',
                    discount: '10%',
                    allow: [
                        {
                            id: 1,
                            name: 'Товары для волос Aveda',
                            items: ['Шампуни', 'Кондиционеры', 'Маски'],
                        },
                    ],
                },
            ],
        };
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {},

    methods: {
        isString(obj) {
            return typeof obj === 'string';
        },
    },

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
