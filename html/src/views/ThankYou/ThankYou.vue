<template>
    <section class="section thank-you-view">
        <v-cart-header hide-city />

        <div class="container">
            <h1 class="thank-you-view__hl">
                {{ title }}
            </h1>
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
                                        :value="order.id"
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
                                <info-row class="thank-you-view__panel-item" name="Номер заказа" :value="order.id" />
                                <info-row class="thank-you-view__panel-item" name="Получатель" :value="fullUserInfo" />
                                <info-row
                                    class="thank-you-view__panel-item"
                                    name="Способ получения"
                                    :value="orderDelivery"
                                />
                                <info-row
                                    class="thank-you-view__panel-item"
                                    name="Адрес доставки"
                                    :value="deliveryAddress"
                                />
                                <info-row class="thank-you-view__panel-item" name="Даты доставки">
                                    <ul>
                                        <li v-for="date in dates" :key="date">
                                            {{ date }}
                                        </li>
                                    </ul>
                                </info-row>
                            </ul>
                            <v-button class="btn--outline thank-you-view__panel-btn" to="/"
                                >На главную страницу</v-button
                            >
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

                        <div class="container container--tablet">
                            <v-button class="thank-you-view__panel-btn" :to="{ name: 'Cart' }">
                                Перейти в оформлению
                            </v-button>
                        </div>
                    </info-panel>
                </template>
            </v-sticky>
        </div>
    </section>
</template>

<script>
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

import { NAME as CHECKOUT_MODULE, ORDER } from '@store/modules/Checkout';
import { FETCH_CHECKOUT_ORDER } from '@store/modules/Checkout/actions';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';

import { $store, $progress } from '@services';
import { fileExtension } from '@enums';
import { receiveMethods } from '@enums/checkout';
import { cartItemTypes } from '@enums/product';
import { dayMonthLongDateSettings, hourMinuteTimeSettings, cancelRoute } from '@settings';
import { formatPhoneNumber, getDate } from '@util';
import { toAddressString } from '@util/address';
import { generatePictureSourcePath } from '@util/file';
import { generateMasterclassUrl, generateProductUrl } from '@util/catalog';
import './ThankYou.css';

export default {
    name: 'thank-you',

    components: {
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

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapState(CHECKOUT_MODULE, [ORDER]),
        ...mapState('route', {
            id: state => state.params.id,
        }),

        dates() {
            const {
                order: { delivery },
            } = this;

            const { dates = [] } = delivery;

            return dates.map(s => {
                const dateObj = getDate(s);
                const date = dateObj.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const weekday = this.$t(`weekdays.long.${dateObj.getDay()}`);
                return `${date}, ${weekday}, ${time}`;
            });
        },

        items() {
            const { order, cartData = {} } = this;
            let cartType = null;

            switch (order.type) {
                case cartItemTypes.PRODUCT: {
                    const { items = [] } = cartData[cartItemTypes.MASTERCLASS] || {};
                    return items.map(i => {
                        const { p } = i;
                        const dateObj = new Date(`${p.nearestDate} ${p.nearestTimeFrom}`);
                        const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                        const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                        const dateTime = `${date}, ${time}`;
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
                    return items.map(i => {
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
            return this.$t(`deliveryMethod.${this.order.delivery.deliveryMethod}`);
        },

        fullUserInfo() {
            const {
                order: {
                    user: { name, phone, email },
                },
            } = this;
            return `${name}, ${formatPhoneNumber(phone)}, ${email}`;
        },

        deliveryAddress() {
            const { delivery } = this[ORDER] || { delivery: {} };
            const { point, address, deliveryMethod } = delivery;
            let deliveryAddress = null;

            switch (deliveryMethod) {
                case receiveMethods.PICKUP:
                    deliveryAddress = point.address;
                    break;
                default:
                    deliveryAddress = address;
                    break;
            }

            return deliveryAddress && toAddressString(deliveryAddress);
        },

        isMasterClass() {
            const { order } = this;
            return order && order.type === cartItemTypes.MASTERCLASS;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { id },
        } = to;

        const { order } = $store.state[CHECKOUT_MODULE];

        // если все загружено, пропускаем
        if (order) next();
        else {
            $progress.start();
            $store
                .dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_ORDER}`, id)
                .then(() => {
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(error => {
                    $progress.fail();
                    if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                    else next(new Error(error.message));
                    $progress.finish();
                });
        }
    },

    beforeCreate() {
        this.cartItemTypes = cartItemTypes;
    },
};
</script>
