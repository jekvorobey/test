<template>
    <section class="user-view">
        <div class="container">
            <template v-if="user">
                <h1>User : {{ user.id }}</h1>
                <ul class="meta">
                    <li><span class="label">Created:</span> {{ user.created | timeAgo }} ago</li>
                    <li><span class="label">Karma:</span> {{ user.karma }}</li>
                    <li v-if="user.about" v-html="user.about" class="about"></li>
                </ul>
                <p class="links">
                    <a :href="`https://news.ycombinator.com/submitted?id=${user.id}`">submissions</a> |
                    <a :href="`https://news.ycombinator.com/threads?id=${user.id}`">comments</a>
                </p>
            </template>
            <template v-else-if="user === false">
                <h1>User not found.</h1>
            </template>
        </div>
    </section>
</template>

<script>
import itemListModule from '../../store/modules/ItemList';
import ServiceLocator from '../../services/ServiceLocator';
import './UserDetail.css';

export default {
    name: 'user-view',
    computed: {
        user() {
            return this.$store.state.item_list ? this.$store.state.item_list.users[this.$route.params.id] : null;
        },
    },

    methods: {
        fetchUser() {
            return this.$store.dispatch(`${itemListModule.name}/FETCH_USER`, { id: this.$route.params.id });
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

        const store = ServiceLocator.$store();
        const progress = ServiceLocator.$progress();
        const register = !!store._modulesNamespaceMap[`${itemListModule.name}/`];
        if (!register) {
            store.registerModule(itemListModule.name, itemListModule, {
                preserveState: !!store.state.item_list,
            });
        }

        if (!store.state.item_list.users[to.params.id]) {
            progress.start();
            store.dispatch(`${itemListModule.name}/FETCH_USER`, { id: to.params.id }).then(user => {
                progress.finish();
                next();
            });
        } else next();
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.
        this.$progress.start();
        this.fetchUser().then(() => {
            this.$progress.finish();
            next();
        });
    },

    // Server-side only
    // This will be called by the server renderer automatically
    serverPrefetch() {
        // return the Promise from the action
        // so that the component waits before rendering
        const register = !!this.$store._modulesNamespaceMap[`${itemListModule.name}/`];
        if (!register) {
            this.$store.registerModule(itemListModule.name, itemListModule, {
                preserveState: !!this.$store.state.item_list,
            });
        }
        return this.fetchUser();
    },

    title() {
        return this.user ? this.user.id : 'User not found';
    },
};
</script>
