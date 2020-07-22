<template>
    <div class="cart-masterclass-panel">
        <transition-group
            class="cart-masterclass-panel__list"
            tag="ul"
            name="cart-item"
            @before-enter="onBeforeEnterItems"
            @enter="onEnterItems"
            @after-enter="onAfterEnterItems"
            @leave="onLeaveItems"
        >
            <cart-master-class-card
                class="cart-masterclass-panel__list-item"
                type="masterclass"
                v-for="({ p: product, count }, index) in masterclasses"
                :data-index="index"
                :key="product.id"
                :product-id="product.id"
                :name="product.name"
                :note="product.note"
                :image="product.image"
                :price="product.price"
                :old-price="product.oldPrice"
                :date="product.dateTime"
                :author="product.author"
                :count="count"
                :href="product.url"
                @deleteItem="onDeleteMasterclassItem(product.id)"
                @countChange="onAddMasterclassItem(product.id, $event.count)"
            >
                <source :data-srcset="product.desktopImg.webp" type="image/webp" media="(min-width: 426px)" />
                <source :data-srcset="product.desktopImg.orig" media="(min-width: 426px)" />
                <source :data-srcset="product.mobileImg.webp" type="image/webp" media="(max-width: 425px)" />
                <source :data-srcset="product.mobileImg.orig" media="(max-width: 425px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="product.defaultImg" alt="" />
            </cart-master-class-card>
        </transition-group>
    </div>
</template>

<script>
import CartMasterClassCard from '@components/cart/CartMasterClassCard/CartMasterClassCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_MASTERCLASS_ITEM, DELETE_MASTERCLASS_ITEM } from '@store/modules/Cart/actions';

import { fileExtension } from '@enums';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import { generatePictureSourcePath } from '@util/file';
import { generateMasterclassUrl } from '@util/catalog';

import './CartMasterclassPanel.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'cart-masterclass-panel',

    components: {
        CartMasterClassCard,
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    computed: {
        ...mapState([LOCALE]),

        masterclasses() {
            return this.items.map(i => {
                const { p } = i;
                const dateObj = new Date(`${p.nearestDate} ${p.nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date}, ${time}`;
                const url = generateMasterclassUrl(p.code);
                const speaker = p.speakers && p.speakers[0];
                const author = speaker && `${speaker.firstName} ${speaker.lastName}, ${speaker.profession}`;
                const note = `Входной билет ${p.ticketTypeName}`;

                const defaultImg = p.image && generatePictureSourcePath(288, 184, p.image.id);
                const desktopImg = p.image && {
                    webp: generatePictureSourcePath(288, 184, p.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(288, 184, p.image.id),
                };

                const mobileImg = p.image && {
                    webp: generatePictureSourcePath(144, 92, p.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(144, 92, p.image.id),
                };

                return {
                    ...i,
                    p: {
                        ...p,
                        note,
                        url,
                        author,
                        dateTime,
                        desktopImg,
                        mobileImg,
                        defaultImg,
                    },
                };
            });
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_MASTERCLASS_ITEM, DELETE_MASTERCLASS_ITEM]),

        onAddMasterclassItem(offerId, count) {
            this[ADD_MASTERCLASS_ITEM]({ offerId, count });
        },

        onDeleteMasterclassItem(offerId) {
            this[DELETE_MASTERCLASS_ITEM]({ offerId });
        },

        onBeforeEnterItems(el) {
            el.dataset.index = counter;
            counter += 1;
            el.style.opacity = 0;
        },

        itemAnimation(el, delay) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = 1;
                            resolve();
                        });
                    }, delay);
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnterItems(el, done) {
            const delay = el.dataset.index * itemAnimationDelayDelta;
            await this.itemAnimation(el, delay);
            done();
        },

        onAfterEnterItems(el) {
            delete el.dataset.index;
            counter = 0;
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },
    },
};
</script>

