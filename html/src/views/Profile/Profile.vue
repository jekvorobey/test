<template>
    <section class="section profile-view">
        <transition name="fade-in">
            <div v-if="!isTabletLg" class="container profile-view__container--desktop">
                <breadcrumbs>
                    <breadcrumb-item key="main" to="/">
                        <v-svg v-if="isTablet" name="home" width="10" height="10" />
                        <span v-else>Главная</span></breadcrumb-item
                    >
                    <breadcrumb-item key="Cabinet" :to="{ name: 'Cabinet' }"
                        >{{ $t('profile.routes.Cabinet') }}
                    </breadcrumb-item>
                    <breadcrumb-item
                        v-if="$route.name !== 'Cabinet' && breadcrumbs && breadcrumbs.length === 0"
                        :key="$route.name"
                        :to="$route.path"
                        >{{ routeTitle }}
                    </breadcrumb-item>
                    <breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name" :to="breadcrumb.to"
                        >{{ breadcrumb.name }}
                    </breadcrumb-item>
                </breadcrumbs>

                <div class="profile-view__grid" data-v-sticky-container>
                    <v-sidebar
                        class="profile-view__panel"
                        v-if="!isTabletLg"
                        container-selector=".profile-view__grid"
                        top="64"
                        bottom="0"
                        :routeTitle="routeTitle"
                    >
                        <template v-slot:sticky>
                            <navigation-panel :groups="groups" @link-click="scrollToTop" />
                            <br />
                        </template>
                    </v-sidebar>

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
                        {{ routeTitle }}<v-svg name="arrow-updown" width="16" height="16" />
                    </v-button>
                </template>
                <breadcrumbs class="container">
                    <breadcrumb-item key="main" to="/">
                        <v-svg v-if="isTablet" name="home" width="10" height="10" />
                        <span v-else>Главная</span></breadcrumb-item
                    >
                    <breadcrumb-item key="Cabinet" :to="{ name: 'Cabinet' }">{{
                        $t('profile.routes.Cabinet')
                    }}</breadcrumb-item>
                    <breadcrumb-item
                        v-if="$route.name !== 'Cabinet' && breadcrumbs && breadcrumbs.length === 0"
                        :key="$route.name"
                        :to="$route.path"
                        >{{ routeTitle }}</breadcrumb-item
                    >
                    <breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name" :to="breadcrumb.to">{{
                        breadcrumb.name
                    }}</breadcrumb-item>
                </breadcrumbs>
                <div class="profile-view__main">
                    <transition name="fade-absolute">
                        <router-view class="profile-view__main-view" />
                    </transition>
                </div>
            </v-sticky>
        </transition>

        <transition name="fade-in">
            <navigation-modal v-if="isNavigationOpen && isTabletLg" :groups="groups" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VSidebar from '@controls/VSidebar/VSidebar.vue';

import '@components/profile/InfoPanel/InfoPanel.vue';
import '@components/profile/InfoRow/InfoRow.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import NavigationPanel from '@components/profile/NavigationPanel/NavigationPanel.vue';
import NavigationModal from '@components/profile/NavigationModal/NavigationModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as PROFILE_MODULE, BREADCRUMBS } from '@store/modules/Profile';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, USER, REFERRAL_PARTNER, UNREAD_MESSAGES } from '@store/modules/Auth';

import { cancelRoute } from '@settings';
import { modalName } from '@enums';
import '@images/sprites/arrow-updown.svg';
import '@images/sprites/home.svg';
import './Profile.css';

export default {
    name: 'profile',

    components: {
        VSvg,
        VButton,
        VSticky,
        VSidebar,

        Breadcrumbs,
        BreadcrumbItem,
        NavigationPanel,
        NavigationModal,
    },

    computed: {
        ...mapState(PROFILE_MODULE, [BREADCRUMBS]),
        ...mapState(AUTH_MODULE, [HAS_SESSION, UNREAD_MESSAGES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        ...mapState(MODAL_MODULE, {
            isNavigationOpen: (state) =>
                state[MODALS][modalName.profile.NAVIGATION] && state[MODALS][modalName.profile.NAVIGATION].open,
        }),

        groups() {
            const groups = [
                {
                    id: 1,
                    name: this.$t('profile.groups.profile'),
                    routes: [
                        { name: 'Cabinet', exact: true },
                        { name: 'Preferences', exact: true },
                        { name: 'Addresses', exact: true },
                        // { name: 'Payment', exact: true },
                        { name: 'Subscribes', exact: true },
                        {
                            name: 'Messages',
                            displayName:
                                `${this.$tc('profile.format.messages')}` +
                                (this[UNREAD_MESSAGES] ? ` (${this[UNREAD_MESSAGES]})` : ''),
                        },
                        // { name: 'Certificates', exact: true },
                        { name: 'Bonuses', exact: true, hidden: this[REFERRAL_PARTNER] },
                        { name: 'Orders' },
                        { name: 'Certificates' },
                        { name: 'Documents' },
                    ],
                },
            ];

            if (this[REFERRAL_PARTNER])
                groups.push({
                    id: 2,
                    name: this.$t('profile.groups.business'),
                    routes: [
                        { name: 'Referal' },
                        { name: 'ProPreferences', exact: true },
                        { name: 'Promopage', exact: true },
                        { name: 'Seo' },
                        { name: 'Promocodes' },
                        { name: 'Account' },
                    ],
                });

            // #58322
            // groups.push({
            //     id: 3,
            //     name: this.$t('profile.groups.training'),
            //     routes: [
            //         { name: 'HowItWorks', exact: true },
            //         { name: 'Guides' },
            //         { name: 'Masterclasses', exact: true },
            //         { name: 'QnA', exact: true },
            //     ],
            // });

            return groups;
        },

        routeTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
        routeTitle() {
            window.scrollTo(0,0);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onOpenNavigation() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.NAVIGATION, open: true });
        },

        scrollToTop() {
            window.scrollTo(0,0);
        },
    },
};
</script>
