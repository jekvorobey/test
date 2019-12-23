<template>
    <section class="section profile-view">
        <div class="container">
            <breadcrumbs>
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="all" to="/profile">
                    Личный кабинет
                </breadcrumb-item>
            </breadcrumbs>
        </div>
        <div class="container">
            <div class="profile-view__grid">
                <v-sticky class="profile-view__panel">
                    <template v-slot:sticky>
                        <navigation-panel />
                    </template>
                </v-sticky>
                <div class="profile-view__main">
                    <transition name="fade" mode="out-in">
                        <router-view />
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import VSticky from '../../components/controls/VSticky/VSticky.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import NavigationPanel from '../../components/profile/NavigationPanel/NavigationPanel.vue';

import { $store } from '../../services/ServiceLocator';
import profileModule, { NAME as PROFILE_MODULE } from '../../store/modules/Profile';
import './Profile.css';

export default {
    name: 'profile',

    components: {
        VSticky,

        Breadcrumbs,
        BreadcrumbItem,
        NavigationPanel,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {},

    beforeRouteEnter(to, from, next) {
        // регистрируем модуль, если такого нет
        const register = !!$store._modulesNamespaceMap[`${PROFILE_MODULE}/`];
        if (!register)
            $store.registerModule(PROFILE_MODULE, profileModule, {
                preserveState: !!$store.state.profile,
            });

        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
