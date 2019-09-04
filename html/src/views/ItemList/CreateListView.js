import itemListModule from '../../store/modules/ItemList';
import { $store, $progress } from '../../services/ServiceLocator';

const ItemList = () => import(/* webpackChunkName: "item-list" */ './ItemList.vue');

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1);

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView(type) {
    return {
        name: `${type}-stories-view`,

        // Server-side only
        // This will be called by the server renderer automatically
        serverPrefetch() {
            // return the Promise from the action
            // so that the component waits before rendering
            this.$store.registerModule('item_list', itemListModule);
            return this.$store.dispatch('item_list/FETCH_LIST_DATA', { type });
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
            if (!register) {
                $store.registerModule(itemListModule.name, itemListModule, {
                    preserveState: !!$store.state.item_list,
                });
            }

            $progress.start();
            $store.dispatch('item_list/FETCH_LIST_DATA', { type }).then(() => {
                next(() => $progress.finish());
            });
        },

        title: camelize(type),

        render(h) {
            return h(ItemList, { props: { type } });
        },
    };
}
