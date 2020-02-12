<template>
    <section class="section profile-view">
        <transition name="fade-in">
            <div v-if="!isTabletLg" class="container profile-view__container--desktop">
                <breadcrumbs>
                    <breadcrumb-item key="main" to="/">
                        Главная
                    </breadcrumb-item>
                    <breadcrumb-item key="Cabinet" :to="{ name: 'Cabinet' }">
                        {{ $t('profile.routes.Cabinet') }}
                    </breadcrumb-item>
                    <breadcrumb-item
                        v-if="$route.name !== 'Cabinet' && breadcrumbs.length === 0"
                        :key="$route.name"
                        :to="$route.path"
                    >
                        {{ $t(`profile.routes.${$route.name}`) }}
                    </breadcrumb-item>
                    <breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name" :to="breadcrumb.to">
                        {{ breadcrumb.name }}
                    </breadcrumb-item>
                </breadcrumbs>

                <div class="profile-view__grid">
                    <v-sticky class="profile-view__panel">
                        <template v-slot:sticky>
                            <navigation-panel />
                        </template>
                    </v-sticky>
                    <div class="profile-view__main">
                        <transition name="fade-absolute">
                            <router-view class="profile-view__main-view" />
                        </transition>
                    </div>
                </div>
            </div>
            <v-sticky v-else class="profile-view__panel profile-view__container--mobile">
                <template v-slot:sticky>
                    <v-button class="profile-view__panel-btn" @click="onOpenNavigation">
                        {{ $t(`profile.routes.${$route.name}`) }}<v-svg name="arrow-updown" width="16" height="16" />
                    </v-button>
                </template>
                <breadcrumbs class="container">
                    <breadcrumb-item key="main" to="/">
                        Главная
                        <!-- <v-svg name="home" width="16" height="16" /> -->
                    </breadcrumb-item>
                    <breadcrumb-item key="Cabinet" :to="{ name: 'Cabinet' }">
                        {{ $t('profile.routes.Cabinet') }}
                    </breadcrumb-item>
                    <breadcrumb-item
                        v-if="$route.name !== 'Cabinet' && breadcrumbs.length === 0"
                        :key="$route.name"
                        :to="$route.path"
                    >
                        {{ $t(`profile.routes.${$route.name}`) }}
                    </breadcrumb-item>
                    <breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name" :to="breadcrumb.to">
                        {{ breadcrumb.name }}
                    </breadcrumb-item>
                </breadcrumbs>
                <div class="profile-view__main">
                    <transition name="fade-absolute">
                        <router-view class="profile-view__main-view" />
                    </transition>
                </div>
            </v-sticky>
        </transition>

        <transition name="fade-in">
            <navigation-modal v-if="isNavigationOpen && isTabletLg" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';

import InfoPanel from '../../components/profile/InfoPanel/InfoPanel.vue';
import InfoRow from '../../components/profile/InfoRow/InfoRow.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import NavigationPanel from '../../components/profile/NavigationPanel/NavigationPanel.vue';
import NavigationModal, {
    NAME as NAVIGATION_MODAL_NAME,
} from '../../components/profile/NavigationModal/NavigationModal.vue';

import { mapState, mapActions } from 'vuex';
import profileModule, { NAME as PROFILE_MODULE, BREADCRUMBS } from '../../store/modules/Profile';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { $store } from '../../services/ServiceLocator';
import { registerModuleIfNotExists } from '../../util/store';
import '../../assets/images/sprites/arrow-updown.svg';
import '../../assets/images/sprites/home.svg';
import './Profile.css';

export default {
    name: 'profile',

    components: {
        VSvg,
        VButton,
        VSticky,

        Breadcrumbs,
        BreadcrumbItem,
        NavigationPanel,
        NavigationModal,
    },

    computed: {
        ...mapState(PROFILE_MODULE, [BREADCRUMBS]),

        ...mapState(MODAL_MODULE, {
            isNavigationOpen: state =>
                state[MODALS][NAVIGATION_MODAL_NAME] && state[MODALS][NAVIGATION_MODAL_NAME].open,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onOpenNavigation() {
            this[CHANGE_MODAL_STATE]({ name: NAVIGATION_MODAL_NAME, open: true });
        },
    },

    beforeRouteEnter(to, from, next) {
        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, PROFILE_MODULE, profileModule);
        next();
    },
};
</script>
