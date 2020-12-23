<template>
    <section class="section product-view__section product-view__history" v-if="!!items.length">
        <div class="container product-view__history-container">
            <h2 class="container container--tablet-lg product-view__section-hl product-view__history-hl">
                {{ $t('product.title.history') }}
            </h2>

            <history-panel class="product-view__history-panel" :items="items" />
        </div>
    </section>
</template>

<script>
import { FETCH_RECENTLY_VIEWED_PRODUCTS } from '@store/actions.js';
import { mapActions, mapState } from 'vuex';
import { RECENTLY_VIEWED_PRODUCTS } from '@store';
import { generateProductUrl } from '@util/catalog.js';
import HistoryPanel from '@components/HistoryPanel/HistoryPanel.vue';

export default {
    name: 'recently-viewed-panel',
    components: { HistoryPanel },
    computed: {
        ...mapState([RECENTLY_VIEWED_PRODUCTS]),

        items() {
            const items = this[RECENTLY_VIEWED_PRODUCTS] || [];
            return items.map((i) => {
                const { code, categoryCodes } = i;
                const categoryCode = categoryCodes && categoryCodes[categoryCodes.length - 1];

                return {
                    ...i,
                    url: categoryCode && generateProductUrl(categoryCode, code),
                };
            });
        },
    },
    methods: {
        ...mapActions([FETCH_RECENTLY_VIEWED_PRODUCTS]),
    },
    beforeMount() {
        this[FETCH_RECENTLY_VIEWED_PRODUCTS]();
    },
};
</script>
