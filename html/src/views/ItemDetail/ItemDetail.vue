<template>
    <section class="section item-view" v-if="item">
        <div class="container">
            <template v-if="item">
                <div class="item-view-header">
                    <a :href="item.url" target="_blank">
                        <h1>{{ item.title }}</h1>
                    </a>
                    <span v-if="item.url" class="host"> ({{ item.url | host }}) </span>
                    <p class="meta">
                        {{ item.score }} points | by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
                        {{ item.time | timeAgo }} ago
                    </p>
                </div>
                <div class="item-view-comments">
                    <p class="item-view-comments-header">
                        {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
                        <spinner :show="loading"></spinner>
                    </p>
                    <ul v-if="!loading" class="comment-children">
                        <comment v-for="id in item.kids" :key="id" :id="id"></comment>
                    </ul>
                </div>
            </template>
        </div>
    </section>
</template>

<script>
import Spinner from '../../components/Spinner/Spinner.vue';
import Comment from '../../components/Comment/Comment.vue';

import itemListModule from '../../store/modules/ItemList';
import { $store, $progress } from '../../services/ServiceLocator';

import './ItemDetail.css';

export default {
    name: 'item-detail',
    components: {
        Spinner,
        Comment,
    },

    data() {
        return {
            loading: true,
        };
    },

    computed: {
        item() {
            return this.$store.state.item_list ? this.$store.state.item_list.items[this.$route.params.id] : null;
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        if (process.env.VUE_ENV === 'server') {
            next();
            return;
        }

        const register = !!$store._modulesNamespaceMap[`${itemListModule.name}/`];
        if (!register)
            $store.registerModule(itemListModule.name, itemListModule, {
                preserveState: !!$store.state.item_list,
            });
        $progress.start();
        if (!$store.state.item_list.items[to.params.id]) {
            $store.dispatch(`${itemListModule.name}/FETCH_ITEMS`, { ids: [to.params.id] }).then(() => {
                next(vm => $progress.finish());
            });
        } else next(vm => $progress.finish());
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        if (!this.$store.state.item_list.items[to.params.id]) {
            this.$progress.start();
            this.fetchItems().then(() => {
                this.$progress.finish();
                next();
            });
        } else next();
    },

    // Server-side only
    // This will be called by the server renderer automatically
    serverPrefetch() {
        // return the Promise from the action
        // so that the component waits before rendering
        this.$store.registerModule(itemListModule.name, itemListModule);
        return this.fetchItems();
    },

    beforeMount() {
        this.fetchComments();
    },

    title() {
        return this.item ? this.item.title : null;
    },

    // refetch comments if item changed
    watch: {
        item: 'fetchComments',
    },

    methods: {
        fetchItems() {
            return this.$store.dispatch(`${itemListModule.name}/FETCH_ITEMS`, { ids: [this.$route.params.id] });
        },
        fetchComments() {
            if (!this.item || !this.item.kids) {
                return;
            }

            this.loading = true;
            fetchComments(this.$store, this.item).then(() => {
                this.loading = false;
            });
        },
    },
};

// recursively fetch all descendent comments
function fetchComments(store, item) {
    if (item && item.kids) {
        return store
            .dispatch(`${itemListModule.name}/FETCH_ITEMS`, {
                ids: item.kids,
            })
            .then(() =>
                Promise.all(
                    item.kids.map(id => {
                        return fetchComments(store, store.state.item_list.items[id]);
                    })
                )
            );
    }
}
</script>
