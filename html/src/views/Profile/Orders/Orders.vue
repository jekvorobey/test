<template>
    <section class="section orders-view">
        <h2 class="container container--tablet-lg orders-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <!-- <div class="orders-view__panels">
            <div class="orders-view__panel">
                <div class="orders-view__panel-item">
                    <div class="text-grey orders-view__panel-name">Ваш уровень</div>
                    <div class="orders-view__panel-level">Золотой</div>
                </div>
                <div class="orders-view__panel-item">
                    <div class="text-grey orders-view__panel-name">Следующий уровень</div>
                    <div class="text-grey orders-view__panel-level">Платиновый</div>
                </div>

                <a class="orders-view__panel-link">Подробнее о реферальной программе</a>
            </div>

            <div class="orders-view__panel">
                <div class="orders-view__panel-item">
                    <div class="orders-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            text="2"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="10"
                            :activeCount="2"
                        />
                        <div class="text-grey orders-view__panel-item-label">
                            <span>2</span>
                            <span>10</span>
                        </div>
                    </div>

                    <div class="text-grey">Новых заказов</div>
                </div>
                <div class="orders-view__panel-item">
                    <div class="orders-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            text="15 780 ₽"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="10"
                            :activeCount="1"
                        />
                        <div class="text-grey orders-view__panel-item-label">
                            <span>0</span>
                            <span>300к</span>
                        </div>
                    </div>
                    <div class="text-grey">Сумма моих заказов</div>
                </div>
            </div>
        </div> -->

        <div class="container container--tablet-lg">
            <filter-button class="orders-view__filter-btn" @click="filterModal = !filterModal">
                Фильтр и сортировка&nbsp;&nbsp;
                <span class="text-grey">4</span>
            </filter-button>

            <table class="orders-view__table" v-if="!isTabletLg">
                <colgroup>
                    <col width="20%" />
                    <col width="15%" />
                    <col width="20%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead class="orders-view__table-head">
                    <tr class="orders-view__table-tr orders-view__table-tr--header">
                        <th class="orders-view__table-th">
                            <v-link tag="button" class="orders-view__table-th-link">
                                Номер заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th">
                            <v-link tag="button" class="orders-view__table-th-link">
                                Дата заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th">
                            <v-link tag="button" class="orders-view__table-th-link">
                                Дата доставки&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th">
                            Сумма
                        </th>
                        <th class="orders-view__table-th">
                            <v-link tag="button" class="orders-view__table-th-link">
                                Статус заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th" />
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="orders-view__table-body">
                    <tr
                        class="orders-view__table-tr"
                        v-for="order in orders"
                        :key="order.id"
                        @click="onOpenOrder(order.id)"
                    >
                        <td class="orders-view__table-td">{{ order.number }}</td>
                        <td class="orders-view__table-td">{{ order.created_at }}</td>
                        <td class="orders-view__table-td">{{ order.deliveryDate }}</td>
                        <td class="orders-view__table-td">
                            <price v-bind="order.price" />
                        </td>
                        <td class="orders-view__table-td">
                            <v-button class="btn--outline" v-if="order.status === 'created'" @click.stop>
                                Оплатить
                            </v-button>
                            <span v-else>{{ $t(`profile.format.orderStatus.${order.status}`) }}</span>
                        </td>
                        <td class="orders-view__table-td">
                            <v-link
                                v-if="order.status === 'created'"
                                class="orders-view__table-td-link"
                                tag="button"
                                @click.stop
                            >
                                Отменить
                            </v-link>
                            <v-link v-else class="orders-view__table-td-link" tag="button" @click.stop>
                                Повторить
                            </v-link>
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>

        <ul class="orders-view__list" v-if="isTabletLg">
            <li
                class="orders-view__list-item"
                tabindex="0"
                v-for="order in orders"
                :key="order.id"
                @click="onOpenOrder(order.id)"
            >
                <info-row class="orders-view__list-item-row" name="Номер заказа" :value="order.number" />
                <info-row class="orders-view__list-item-row" name="Сумма">
                    <price v-bind="order.price" />
                </info-row>
                <info-row class="orders-view__list-item-row" name="Дата заказа" :value="order.orderDate" />
                <info-row class="orders-view__list-item-row" name="Дата доставки" :value="order.deliveryDate" />

                <template v-if="order.status === 'created'">
                    <info-row class="orders-view__list-item-row">
                        <v-button class="btn--outline">
                            Оплатить
                        </v-button>
                    </info-row>
                    <info-row class="orders-view__list-item-row">
                        <v-link tag="button" @click.stop>
                            Отменить
                        </v-link>
                    </info-row>
                </template>

                <template v-else>
                    <info-row class="orders-view__list-item-row" name="Cтатус">
                        {{ $t(`profile.format.orderStatus.${order.status}`) }}
                    </info-row>
                    <info-row class="orders-view__list-item-row">
                        <v-link tag="button" @click.stop>
                            Повторить
                        </v-link>
                    </info-row>
                </template>
            </li>
        </ul>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';
import VArcCounter from '../../../components/controls/VArcCounter/VArcCounter.vue';

import FilterButton from '../../../components/FilterButton/FilterButton.vue';
import Price from '../../../components/Price/Price.vue';
import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { NAME as ORDERS_MODULE, ORDERS } from '../../../store/modules/Profile/modules/Orders';
import { FETCH_ORDERS } from '../../../store/modules/Profile/modules/Orders/actions';

import { orderStatus } from '../../../assets/scripts/enums';
import '../../../assets/images/sprites/arrow-updown.svg';
import './Orders.css';
import { mapState, mapActions } from 'vuex';
import { $store, $progress, $logger } from '../../../services/ServiceLocator';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

export default {
    name: 'orders',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VArcCounter,

        FilterButton,
        Price,
        InfoRow,
    },

    data() {
        return {
            filterModal: false,
            // orders: [
            //     {
            //         id: 124589524,
            //         orderDate: '2019-08-18',
            //         deliveryDate: '2019-08-20',
            //         price: {
            //             value: 12788,
            //             currency: 'RUB',
            //         },
            //         status: orderStatus.CREATED,
            //     },
            //     {
            //         id: 454654545,
            //         orderDate: '2019-08-18',
            //         deliveryDate: '2019-08-20',
            //         price: {
            //             value: 12788,
            //             currency: 'RUB',
            //         },
            //         status: orderStatus.PROCESS,
            //     },
            //     {
            //         id: 24823875,
            //         orderDate: '2019-08-18',
            //         deliveryDate: '2019-08-20',
            //         price: {
            //             value: 12788,
            //             currency: 'RUB',
            //         },
            //         status: orderStatus.DONE,
            //     },
            //     {
            //         id: 123547899,
            //         orderDate: '2019-08-18',
            //         deliveryDate: '2019-08-20',
            //         price: {
            //             value: 12788,
            //             currency: 'RUB',
            //         },
            //         status: orderStatus.CANCEL,
            //     },
            // ],
        };
    },

    computed: {
        ...mapState(ORDERS_MODULE_PATH, [ORDERS]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(ORDERS_MODULE_PATH, [FETCH_ORDERS]),

        onOpenOrder(id) {
            this.$router.push({ name: 'OrderDetails', params: { orderId: id } });
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            query: { page = 1, orderField = 'number', orderDirection = 'desc' },
        } = to;

        // регистрируем модуль, если такого нет
        const { loadPath } = $store.state[PROFILE_MODULE][ORDERS_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${ORDERS_MODULE_PATH}/${FETCH_ORDERS}`, {
                    page,
                    orderField,
                    orderDirection,
                })
                .then(data => {
                    //$store.dispatch(`${ORDERS_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return next();
                    $progress.fail();
                    $logger.error('beforeRouteEnter', thrown);
                    $progress.finish();
                    next();
                });
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        // if (this.showMore) {
        //     this.fetchCatalog(to, from, this.showMore);
        // } else this.debounce_fetchCatalog(to, from);
        next();
    },
};
</script>
