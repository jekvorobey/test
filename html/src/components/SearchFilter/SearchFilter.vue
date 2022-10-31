<template>
    <div class="search-filter" :class="{ 'search-filter--active': search }">
        <label class="search-filter__label" :for="inputId" @click="onSearchOpen">
            <v-svg name="search-middle" width="24" height="24" />
        </label>

        <input
            class="search-filter__input"
            type="text"
            ref="input"
            v-model="searchString"
            :id="inputId"
            :placeholder="searchPlaceholder"
            @focus.self="SET_SEARCH(true)"
            @focus="isFocus = true"
            @blur="isFocus = false"
            @keyup.enter="onSearch"
            :maxlength="limit"
            enterkeyhint="search"
        />

        <button class="search-filter__clear" @click="onClearClick">
            <v-svg name="cross" width="24" height="24" />
        </button>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as SEARCH_MODULE, SEARCH } from '@store/modules/Search';
import { SET_SEARCH, SEARCH_SUGGESTIONS } from '@store/modules/Search/actions';

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
            limit: 150,
        };
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH]),

        searchPlaceholder() {
            if (this.isFocus) return 'Что вы ищете?';
            return this.$t('header.middle.search');
        },
    },

    watch: {
        search(value) {
            if (!value && this.$refs.input) this.$refs.input.blur();
        },

        searchString(value) {
            this[SEARCH_SUGGESTIONS](value);
        },
    },

    methods: {
        ...mapActions(SEARCH_MODULE, [SEARCH_SUGGESTIONS, SET_SEARCH]),

        onClearClick() {
            this.searchString = '';
            this[SET_SEARCH](false);
        },

        onSearch() {
            if (!this.searchString) return;

            const searchRoute = {
                name: 'Catalog',
                params: { type: productGroupTypes.SEARCH },
                query: {
                    search_string: this.searchString,
                },
            };

            const { href } = this.$router.resolve(searchRoute);
            if (href !== this.$route.fullPath) this.$router.push(searchRoute, this.onClearClick);
            else this.onClearClick();
        },

        onSearchOpen() {
            this[SET_SEARCH](true);
        },
    },
};
</script>
