<template>
    <section class="section main-view">
        <div class="container">
            <ul>
                <li></li>
            </ul>
        </div>
    </section>
</template>

<script>
import { $store, $progress } from '../../services/ServiceLocator';

import './Main.css';

export default {
    name: 'main',
    components: {},
    title() {
        return 'main';
    },
    data() {
        return {
            links,
        };
    },

    computed: {},

    methods: {},

    beforeMount() {},

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        if (process.env.VUE_ENV === 'server') {
            next();
            return;
        }

        // const register = !!$store._modulesNamespaceMap[`${itemListModule.name}/`];
        // if (!register)
        //     $store.registerModule(itemListModule.name, itemListModule, {
        //         preserveState: !!$store.state.item_list,
        //     });
        // $progress.start();
        // if (!$store.state.item_list.items[to.params.id]) {
        //     $store.dispatch(`${itemListModule.name}/FETCH_ITEMS`, { ids: [to.params.id] }).then(() => {
        //         next(vm => $progress.finish());
        //     });
        // } else next(vm => $progress.finish());
        next();
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        // if (!this.$store.state.item_list.items[to.params.id]) {
        //     this.$progress.start();
        //     this.fetchItems().then(() => {
        //         this.$progress.finish();
        //         next();
        //     });
        // } else next();
        next();
    },

    // Server-side only
    // This will be called by the server renderer automatically
    serverPrefetch() {
        // return the Promise from the action
        // so that the component waits before rendering
        //this.$store.registerModule(itemListModule.name, itemListModule);
        return Promise.resolve();
    },
};
</script>
