<template>
    <div class="search-filter" :class="{ 'search-filter--active': search }">
        <label class="search-filter__label" :for="inputId" @click="onSearchOpen">
            <v-svg name="search-middle" width="24" height="24" />
        </label>
        <input
            class="search-filter__input"
            type="text"
            v-model="searchString"
            :id="inputId"
            :placeholder="searchPlaceholder"
            @focus.self="SET_SEARCH(true)"
            @focus="isFocus = true"
            @focusout="isFocus = false"
            @keyup.enter="onSearch"
        />
        <button class="search-filter__clear" @click="onClearClick">
            <v-svg name="cross" width="24" height="24" />
        </button>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as SEARCH_MODULE, SEARCH as SEARCH_STATE } from '@store/modules/Search';
import { SET_SEARCH, SEARCH } from '@store/modules/Search/actions';

import { productGroupTypes } from '@enums/product';
import '@images/sprites/search-middle.svg';
import '@images/sprites/cross.svg';
import './SearchFilter.critical.css';

export default {
    name: 'search-filter',

    components: {
        VSvg,
    },

    props: {
        inputId: {
            type: [Number, String],
            required: true,
        },
    },

    data() {
        return {
            searchString: '',
            isFocus: false,
        };
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH_STATE]),

        searchPlaceholder() {
            if (this.isFocus) return 'Что вы ищете?';
            return this.$t('header.middle.search');
        },
    },

    watch: {
        searchString(value) {
            this[SEARCH](value);
        },
    },

    methods: {
        ...mapActions(SEARCH_MODULE, [SEARCH, SET_SEARCH]),

        onClearClick() {
            this.searchString = '';
            this[SET_SEARCH](false);
        },

        onSearch() {
            if (!this.searchString) return;
            this[SET_SEARCH](false);
            this.$router.push({
                path: `/${productGroupTypes.SEARCH}`,
                query: {
                    search_string: this.searchString,
                },
            });
        },

        onSearchOpen() {
            this[SET_SEARCH](true);
        },
    },
};
</script>

