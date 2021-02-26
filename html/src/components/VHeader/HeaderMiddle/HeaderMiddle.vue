<template>
    <div class="header-middle">
        <div class="container header-bottom__container header-middle__container">
            <search-filter
                class="header-middle__search"
                :class="{ 'header-middle__search--active': search }"
                input-id="upper-filter"
                v-show="!isTabletLg || (search && isTabletLg)"
            />

            <header-logo-panel v-show="!search && !isTabletLg">
                {{ $t('header.middle.professionals') }}
            </header-logo-panel>

            <header-user-panel class="header-middle__user" v-show="!search && !isTabletLg" />
        </div>
    </div>
</template>

<script>
import HeaderUserPanel from '@components/VHeader/HeaderUserPanel/HeaderUserPanel.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';
import SearchFilter from '@components/SearchFilter/SearchFilter.vue';

import { mapState } from 'vuex';
import { NAME as SEARCH_MODULE, SEARCH } from '@store/modules/Search';

// import './HeaderMiddle.critical.css';

export default {
    name: 'header-middle',

    components: {
        SearchFilter,
        HeaderLogoPanel,
        HeaderUserPanel,
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
