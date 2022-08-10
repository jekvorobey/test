<template>
    <section class="section thank-you-view">
        <v-cart-header hide-city />

        <div class="container">
            <h1 class="thank-you-view__hl">
                {{ title }}
            </h1>

            <h2 v-if="canCreditPayment" class="thank-you-view__redirect">
                Сейчас вы будете перенаправлены на страницу оформления рассрочки
            </h2>
        </div>

        <div class="container thank-you-view__container">
            <v-sticky class="thank-you-view__sticky">
                <template v-slot:sticky>
                    <info-panel
                        class="thank-you-view__panel"
                        header="Информация о заказе"
                        :max-lines="isTablet ? 2 : 1"
                    >
                        <div v-if="order" class="container container--tablet">
                            <template v-if="isMasterClass">
                                <ul class="thank-you-view__panel-list">
                                    <info-row
                                        class="thank-you-view__panel-item"
                                        name="Номер заказа"
                                        :value="order.number"
                                    />
                                    <info-row
                                        class="thank-you-view__panel-item"
                                        name="Получатель"
                                        :value="order.email"
                                    />
                                </ul>
                                <attention-panel class="thank-you-view__panel-attention">
                                    Посмотреть информацию о дате и месте проведения мастер-классов можно в письме,
                                    отправленном на ваш email
                                </attention-panel>
                            </template>

                            <ul v-else class="thank-you-view__panel-list">
                                <info-row
                                    class="thank-you-view__panel-item"
                                    name="Номер заказа"
                                    :value="order.number"
                                />
                                <info-row class="thank-you-view__panel-item" name="Счёт-оферта">
                                    <a class="document-card__bottom-link" :href="order.invoiceOfferLink" download>Скачать</a>
                                </info-row>
                                <info-row class="thank-you-view__panel-item" name="Получатель" :value="fullUserInfo" />
                                <info-row
                                    class="thank-you-view__panel-item"
                                    name="Способ получения"
                                    :value="orderDelivery"
                                />
                                <info-row
                                    v-if="!isOrderCertificate"
                                    class="thank-you-view__panel-item"
                                    name="Адрес доставки"
                                    :value="deliveryAddress"
                                />
                                <info-row class="thank-you-view__panel-item" name="Даты доставки">
                                    <ul v-if="isOrderCertificate || isMasterClass">
                                        <li v-for="date in dates" :key="date">
                                            {{ date }}
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li v-for="date in dates" v-if="date" :key="date.date">
                                            {{ date.date }} ({{ date.count }} {{ date.suffix }} )
                                        </li>
                                    </ul>
                                </info-row>
                            </ul>

                            <div class="thank-you-view__panel-controls">
                                <v-button
                                    v-if="canContinuePayment"
                                    class="thank-you-view__panel-btn"
                                    :href="order.payment_url"
                                >
                                    Оплатить
                                </v-button>

                                <v-button
                                    v-if="canCreditPayment && creditWidgetIsInitialized"
                                    ref="buyCreditButton"
                                    type="button"
                                    class="thank-you-view__panel-btn"
                                    id="buy-credit"
                                >
                                    Купить в кредит
                                </v-button>

                                <v-link
                                    class="thank-you-view__panel-btn thank-you-view__panel-btn--link"
                                    :to="{ name: 'Orders' }"
                                >
                                    Перейти в мои заказы
                                </v-link>
                            </div>
                        </div>
                    </info-panel>
                </template>
            </v-sticky>

            <v-sticky class="thank-you-view__sticky" v-if="items && items.length > 0">
                <template v-slot:sticky>
                    <info-panel
                        class="thank-you-view__panel"
                        header="В корзине остались неоформленные позиции"
                        :max-lines="isTablet ? 2 : 1"
                    >
                        <ul v-if="!isMasterClass" class="thank-you-view__panel-list">
                            <cart-master-class-card
                                class="thank-you-view__panel-card"
                                v-for="{ id, p: product, type } in items"
                                :key="id"
                                :type="type"
                                :product-id="product.id"
                                :name="product.name"
                                :note="product.note"
                                :image="product.image"
                                :price="product.price"
                                :old-price="product.oldPrice"
                                :date="product.dateTime"
                                :author="product.author"
                                :href="product.url"
                            >
                                <template v-if="product.desktopImg">
                                    <source :data-srcset="product.desktopImg.webp" type="image/webp" />
                                    <source :data-srcset="product.desktopImg.orig" />
                                </template>
                                <img class="blur-up lazyload v-picture__img" :data-src="product.defaultImg" alt="" />
                            </cart-master-class-card>
                        </ul>
                        <ul v-else class="thank-you-view__panel-list">
                            <template v-for="{ p: product, count, type } in items">
                                <cart-product-card
                                    class="thank-you-view__panel-card"
                                    v-if="type === cartItemTypes.PRODUCT"
                                    :key="product.id"
                                    :offer-id="product.id"
                                    :product-id="product.productId"
                                    :type="type"
                                    :name="product.name"
                                    :image="product.image"
                                    :price="product.price"
                                    :old-price="product.oldPrice"
                                    :count="count"
                                    :href="product.url"
                                    @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                                    @toggle-favorite-item="onToggleFavorite(product)"
                                    @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                                >
                                    <template v-if="product.desktopImg">
                                        <source :data-srcset="product.desktopImg.webp" type="image/webp" />
                                        <source :data-srcset="product.desktopImg.orig" />
                                    </template>
                                    <img
                                        class="blur-up lazyload v-picture__img"
                                        :data-src="product.defaultImg"
                                        alt=""
                                    />
                                </cart-product-card>
                                <cart-bundle-product-card
                                    class="thank-you-view__panel-card"
                                    v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                                    :key="product.id"
                                    :bundle-id="product.id"
                                    :name="product.name"
                                    :price="product.price"
                                    :bonus="product.bonus"
                                    :old-price="product.oldPrice"
                                    :items="product.items"
                                    :count="count"
                                    @deleteBundle="onDeleteBundle"
                                />
                            </template>
                        </ul>

                        <div class="container container--tablet thank-you-view__panel-controls">
                            <v-button class="btn--outline thank-you-view__panel-btn" :to="{ name: 'Cart' }">
                                Перейти к оформлению
                            </v-button>
                        </div>
                    </info-panel>
                </template>
            </v-sticky>
        </div>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue';

import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';
import CartMasterClassCard from '@components/cart/CartMasterClassCard/CartMasterClassCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as ORDERS_MODULE } from '@store/modules/Profile/modules/Orders';
import { GET_ORDER_PAYMENT_LINK } from '@store/modules/Profile/modules/Orders/actions';

import { NAME as CHECKOUT_MODULE, ORDER } from '@store/modules/Checkout';
import { FETCH_CHECKOUT_ORDER } from '@store/modules/Checkout/actions';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';

import { NAME as THANKYOU_MODULE, COMPLETED_ORDERS } from '@store/modules/ThankYou';
import { GET_COMPLETED_ORDERS, SET_COMPLETED_ORDERS } from '@store/modules/ThankYou/actions';

import { $store, $progress, $retailRocket } from '@services';
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';
import { getProfileOrder } from '@api';
import { fileExtension, httpCodes } from '@enums';
import { receiveMethods } from '@enums/checkout';
import { orderPaymentStatus } from '@enums/order';
import { cartItemTypes } from '@enums/product';
import { dayMonthLongDateSettings, hourMinuteTimeSettings, cancelRoute } from '@settings';
import { formatPhoneNumber, getDate } from '@util';
import { createNotFoundRoute } from '@util/router';
import { toAddressString, toPointAddressString } from '@util/address';
import { generatePictureSourcePath } from '@util/file';
import { generateMasterclassUrl, generateProductUrl } from '@util/catalog';
import metaMixin from '@plugins/meta';
import './ThankYou.css';
import { loadCreditWidget } from '@util/order';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

export default {
    name: 'thank-you',
    mixins: [metaMixin],

    components: {
        VLink,
        VButton,
        VSticky,
        VCartHeader,

        InfoRow,
        InfoPanel,

        AttentionPanel,

        CartMasterClassCard,
        CartProductCard,
        CartBundleProductCard,
    },

    metaInfo() {
        const { title } = this;
        return {
            title,
        };
    },

    data() {
        return {
            creditWidgetIsInitialized: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapState(CHECKOUT_MODULE, [ORDER]),
        ...mapState(THANKYOU_MODULE, [COMPLETED_ORDERS]),
        ...mapState('route', {
            id: (state) => state.params.id,
        }),

        canContinuePayment() {
            const { order } = this;
            const { payment_status, payment_url } = order || {};

            return payment_status === orderPaymentStatus.NOT_PAID && payment_url;
        },

        canCreditPayment: function () {
            const {
                order: { orderCreditInfo },
            } = this;

            if (typeof orderCreditInfo !== 'undefined' && orderCreditInfo && Array.isArray(orderCreditInfo.goods)) {
                return true;
            } else {
                return false;
            }
        },

        dates() {
            const {
                order: { delivery },
            } = this;

            const { dates = [] } = delivery;
            const dateRow = [];
            const eqDateRow = [];

            const result = dates.map(({ date, time }) => {
                const dateObj = getDate(date);
                const timeFromObj = time && time.from && getDate(`${date} ${time.from}`);
                const timeToObj = time && time.to && getDate(`${date} ${time.to}`);

                const dateString = dateObj.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings);
                const timeFrom = timeFromObj && timeFromObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const timeTo = timeToObj && timeToObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const weekday = this.$t(`weekdays.long.${dateObj.getDay()}`);

                let dateTimeString = `${dateString}, ${weekday}${timeFrom || timeTo ? ',' : ''}`;
                if (timeFrom) dateTimeString += (timeTo && timeFrom !== timeTo ? ' с ' : ' ') + `${timeFrom}`;
                if (timeTo && timeFrom !== timeTo) dateTimeString += ` по ${timeTo}`;
                return dateTimeString;
            });
            if (this.isOrderCertificate || this.isMasterClass) {
                return result;
            }

            for (let i = 0; i < result.length; i++) {
                const dateTimeString = result[i];
                if (!eqDateRow[dateTimeString] && eqDateRow[dateTimeString] !== 0) {
                    const key = Object.keys(eqDateRow).length;
                    dateRow[key] = {
                        date: dateTimeString,
                        count: 1,
                        suffix: 'доставка',
                    };
                    eqDateRow[dateTimeString] = key;
                } else {
                    const key = eqDateRow[dateTimeString];
                    dateRow[key].count += 1;
                    dateRow[key].suffix = this.getSuffixDelivery(dateRow[key].count);
                }
            }
            return dateRow;
        },

        items() {
            const { order, cartData = {} } = this;
            let cartType = null;
            if (!order) return [];

            switch (order.type) {
                case cartItemTypes.PRODUCT: {
                    const { items = [] } = cartData[cartItemTypes.MASTERCLASS] || {};
                    return items.map((i) => {
                        const { p } = i;
                        const dateObj = new Date(`${p.nearestDate} ${p.nearestTimeFrom}`);
                        const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                        const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                        const dateTime = `${date} (${this.$t(`weekdays.short.${dateObj.getDay()}`)}), ${time}`;
                        const url = generateMasterclassUrl(p.code);
                        const speaker = p.speakers && p.speakers[0];
                        const author = speaker && `${speaker.firstName} ${speaker.lastName}, ${speaker.profession}`;
                        const name = `${p.name} (${p.ticketTypeName})`;

                        const defaultImg = p.image && generatePictureSourcePath(144, 96, p.image.id);
                        const desktopImg = p.image && {
                            webp: generatePictureSourcePath(144, 96, p.image.id, fileExtension.image.WEBP),
                            orig: generatePictureSourcePath(144, 96, p.image.id),
                        };
                        return { ...i, p: { ...p, name, url, author, dateTime, desktopImg, defaultImg } };
                    });
                }

                case cartItemTypes.MASTERCLASS: {
                    const { items = [] } = cartData[cartItemTypes.PRODUCT] || {};
                    return items.map((i) => {
                        const { p } = i;
                        const categoryCode = p.categoryCodes && p.categoryCodes[p.categoryCodes.length - 1];
                        const href = generateProductUrl(categoryCode, p.code);
                        const hasImage = p.type === cartItemTypes.PRODUCT && p.image;

                        const defaultImg = hasImage && generatePictureSourcePath(64, 64, p.image.id);
                        const desktopImg = hasImage && {
                            webp: generatePictureSourcePath(64, 64, p.image.id, fileExtension.image.WEBP),
                            orig: generatePictureSourcePath(64, 64, p.image.id),
                        };

                        return {
                            ...i,
                            p: {
                                ...p,
                                href,
                                defaultImg: defaultImg || undefined,
                                desktopImg: desktopImg || undefined,
                            },
                        };
                    });
                }

                default:
                    return [];
            }
        },

        title() {
            const { order } = this;

            switch (order && order.type) {
                case cartItemTypes.PRODUCT:
                    return 'Заказ успешно оформлен';
                case cartItemTypes.MASTERCLASS:
                    return 'Билеты успешно оформлены';
                default:
                    return 'Заказ';
            }
        },

        orderDelivery() {
            if (this.isOrderCertificate) {
                const {
                    order: {
                        user: { email },
                    },
                } = this;
                return email ? 'E-mail' : 'SMS';
            }
            return this.$t(`deliveryMethod.${this.order.delivery.deliveryMethod}`);
        },

        fullUserInfo() {
            const {
                order: {
                    user: { name, phone, email },
                },
            } = this;

            const fullInfo = phone ? `${name}, ${formatPhoneNumber(phone)}` : `${name}`;
            if (email && $retailRocket) {
                $retailRocket.setEmail(email);
            }
            return email ? `${fullInfo}, ${email}` : fullInfo;
        },

        deliveryAddress() {
            const { delivery } = this[ORDER] || { delivery: {} };
            const { point, address, deliveryMethod } = delivery;
            let deliveryAddress = null;

            switch (deliveryMethod) {
                case receiveMethods.PICKUP:
                    deliveryAddress = toPointAddressString(point.address);
                    break;
                default:
                    deliveryAddress = toAddressString(address);
                    break;
            }
            return deliveryAddress;
        },

        isMasterClass() {
            const { order } = this;
            return order && order.type === cartItemTypes.MASTERCLASS;
        },

        isOrderCertificate() {
            const { order } = this;
            return order && order.type === cartItemTypes.CERTIFICATE;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        wasShown() {
            return this[COMPLETED_ORDERS].includes(this.id);
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    methods: {
        ...mapActions(ORDERS_MODULE_PATH, [GET_ORDER_PAYMENT_LINK]),
        ...mapActions([GET_COMPLETED_ORDERS], [SET_COMPLETED_ORDERS]),

        async onContinuePayment() {
            const { order } = this;
            const { id } = order;
            await this[GET_ORDER_PAYMENT_LINK]();
        },
        getSuffixDelivery(delivery) {
            let n = Math.abs(delivery);
            n %= 100;
            if (n >= 5 && n <= 20) {
                return 'доставок';
            }
            n %= 10;
            if (n === 1) {
                return 'доставка';
            }
            if (n >= 2 && n <= 4) {
                return 'доставки';
            }
            return 'доставок';
        },

        async initializeCreditPayment() {
            if (typeof window.CLObject === 'undefined') {
                await loadCreditWidget();
            }

            this.creditWidgetIsInitialized = true;

            this.$nextTick(() => {
                window.CLObject.create({
                    ...this.order.orderCreditInfo,
                    elm: 'buy-credit',
                });

                this.$refs.buyCreditButton.click();
            });
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { id },
        } = to;

        function proceed() {
            if ($store.state[CHECKOUT_MODULE]) {
                const { order } = $store.state[CHECKOUT_MODULE];

                // если все загружено, пропускаем
                if (order && order.id == id) next();
                else {
                    $progress.start();
                    $store
                        .dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_ORDER}`, id)
                        .then(() => {
                            next((vm) => {
                                $progress.finish();
                            });
                        })
                        .catch((error) => {
                            $progress.fail();
                            if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                            else next(new Error(error.message));
                            $progress.finish();
                        });
                }
            }
        }

        if ($store.state[CHECKOUT_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[CHECKOUT_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    beforeCreate() {
        this.cartItemTypes = cartItemTypes;
    },

    async mounted() {
        $store.dispatch(`${THANKYOU_MODULE}/${GET_COMPLETED_ORDERS}`);

        async function createSeoEventPurchase() {
            const orderData = await getProfileOrder(this.id);
            if (orderData.order.type !== 'product' || !orderData.deliveries) return;
            const { products, actionField } = new ProductsBuilder().createForPurchase(orderData);
            seoEvents.purchase(products, actionField);
        }

        const purchase = createSeoEventPurchase.bind(this);

        if (!this.wasShown) {
            await purchase();
            $store.dispatch(`${THANKYOU_MODULE}/${SET_COMPLETED_ORDERS}`, this.id);
        }

        if (this.canCreditPayment) {
            this.initializeCreditPayment();
        }
    },
};
</script>
