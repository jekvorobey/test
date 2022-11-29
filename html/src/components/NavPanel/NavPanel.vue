<template>
    <div class="nav-panel" v-scroll-lock="isMenuOpen">
        <div class="container">
            <div class="nav-panel__main">
                <group-list class="nav-panel__main-list" :items="categoriesCatalog" @link-click="onHandleClick" count="11"/>

                <remote-banner
                    class="nav-panel__main-banner"
                    :banner="banner"
                    :desktop-size="[392, 502]"
                    :tablet-size="[515, 512]"
                    :mobile-size="[515, 512]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import GroupList from '@components/GroupList/GroupList.vue';

import { BANNER, IS_MENU_OPEN } from '@store';
import { CATEGORIES_CATALOG } from '@store/getters';
import { SET_MENU_OPEN } from '@store/actions';
import { mapState, mapGetters, mapActions } from 'vuex';
import './NavPanel.css';
import RemoteBanner from '@components/RemoteBanner/RemoteBanner.vue';

export default {
    name: 'nav-panel',

    components: {
        RemoteBanner,
        GroupList,
    },

    computed: {
        ...mapState([BANNER, IS_MENU_OPEN]),
        ...mapGetters([CATEGORIES_CATALOG]),
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),

        onHandleClick() {
            this[SET_MENU_OPEN](false);
        },
    },
};
</script>
