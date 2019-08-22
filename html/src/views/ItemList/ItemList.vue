<template>
    <section class="news-view">
        <div class="container">
            <div class="news-list-nav">
                <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
                <a v-else class="disabled">&lt; prev</a>
                <span>{{ page }}/{{ maxPage }}</span>
                <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
                <a v-else class="disabled">more &gt;</a>
            </div>
            <transition :name="transition">
                <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
                    <transition-group tag="ul" name="item">
                        <item v-for="item in displayedItems" :key="item.id" :item="item"> </item>
                    </transition-group>
                </div>
            </transition>
        </div>
    </section>
</template>

<script>
import { watchList } from '../../api';
import Item from '../../components/Item/Item.vue';
import './ItemList.css';

export default {
    name: 'item-list',

    components: {
        Item,
    },

    props: {
        type: String,
    },

    data() {
        return {
            transition: 'slide-right',
            displayedPage: Number(this.$route.params.page) || 1,
            displayedItems: this.$store.getters['item_list/activeItems'],
        };
    },

    computed: {
        page() {
            return Number(this.$route.params.page) || 1;
        },
        maxPage() {
            const { itemsPerPage, lists } = this.$store.state.item_list;
            return Math.ceil(lists[this.type].length / itemsPerPage);
        },
        hasMore() {
            return this.page < this.maxPage;
        },
    },

    watch: {
        page(to, from) {
            this.loadItems(to, from);
        },
    },

    methods: {
        loadItems(to = this.page, from = -1) {
            this.$progress.start();
            this.$store
                .dispatch('item_list/FETCH_LIST_DATA', {
                    type: this.type,
                })
                .then(() => {
                    if (this.page < 0 || this.page > this.maxPage) {
                        this.$router.replace(`/${this.type}/1`);
                        return;
                    }
                    this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right';
                    this.displayedPage = to;
                    this.displayedItems = this.$store.getters['item_list/activeItems'];
                    this.$progress.finish();
                });
        },
    },

    beforeMount() {
        if (this.$root._isMounted) {
            this.loadItems(this.page);
        }
        // watch the current list for realtime updates
        this.unwatchList = watchList(this.type, ids => {
            this.$store.commit('item_list/SET_LIST', { type: this.type, ids });
            this.$store.dispatch('item_list/ENSURE_ACTIVE_ITEMS').then(() => {
                this.displayedItems = this.$store.getters['item_list/activeItems'];
            });
        });
    },

    beforeDestroy() {
        this.unwatchList();
    },
};
</script>
