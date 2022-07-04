<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ landing.name }}
        </h1>

        <div class="info-pages-block__content typo" v-html="landing.content"></div>
    </div>
</template>

<script>
import metaMixin from '@plugins/meta';
import { httpCodes } from '@enums';
import { createNotFoundRoute } from '@util/router';
import { convertObjectToMetaProperties } from '@util';
import { $progress, $store } from '@services';
import { LANDING, NAME as INFO_PAGE_MODULE } from '@store/modules/InfoPage';
import { FETCH_LANDING } from '@store/modules/InfoPage/actions';
import _debounce from 'lodash/debounce';
import { mapActions, mapState } from 'vuex';

import './InfoPage.css';

export default {
    name: 'info-page',
    mixins: [metaMixin],
    metaInfo() {
        const { name, metaTitle, metaDescription } = this[LANDING];

        return {
            title: metaTitle || name,
            meta: convertObjectToMetaProperties({
                description: metaDescription,
            }),
        };
    },
    computed: {
        ...mapState(INFO_PAGE_MODULE, [LANDING]),
    },
    methods: {
        ...mapActions(INFO_PAGE_MODULE, [FETCH_LANDING]),

        async fetchLanding(to, from, next) {
            const {
                params: { code },
                query: { draft },
            } = to;

            try {
                this.$progress.start();
                await this[FETCH_LANDING]({ code, draft });
                this.$progress.finish();
                next();
            } catch (error) {
                this.$progress.fail();
                if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                else next(false);
                this.$progress.finish();
            }
        },
    },
    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
            query: { draft },
        } = to;

        function proceed() {
            if ($store.state[INFO_PAGE_MODULE]) {
                const { landingCode } = $store.state[INFO_PAGE_MODULE];

                // если все загружено, пропускаем
                if (landingCode === code) next();
                else {
                    $progress.start();
                    $store
                        .dispatch(`${INFO_PAGE_MODULE}/${FETCH_LANDING}`, { code, draft })
                        .then(() => next(() => $progress.finish()))
                        .catch((thrown) => {
                            if (thrown && thrown.isCancel === true) return next();

                            $progress.fail();
                            if (thrown && thrown.status === httpCodes.NOT_FOUND) return next(createNotFoundRoute(to));
                            else next();
                        });

                }
            }
        }

        if ($store.state[INFO_PAGE_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[INFO_PAGE_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },
    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            params: { code },
        } = to;

        const {
            params: { code: fromCode },
        } = from;

        if (code === fromCode) next();
        else this.debounce_fetchLanding(to, from, next);
    },
    beforeMount() {
        this.debounce_fetchLanding = _debounce(this.fetchLanding, 500);
    },
};
</script>
