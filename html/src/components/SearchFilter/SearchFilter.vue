<template>
    <div class="search-filter" :class="{ 'search-filter--active': search }">
        <label class="search-filter__label" :for="inputId">
            <v-svg name="search-middle" width="20" height="20" />
        </label>
        <input
            class="search-filter__input"
            v-model="searchString"
            :id="inputId"
            :placeholder="searchPlaceholder"
            @focus.self="SET_SEARCH(true)"
        />
        <button class="search-filter__clear" @click="onClearClick">
            <v-svg name="cross" width="20" height="20" />
        </button>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import '../../assets/images/sprites/search-middle.svg';
import '../../assets/images/sprites/cross.svg';

import './SearchFilter.critical.css';

import { mapState, mapActions } from 'vuex';

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
        };
    },

    computed: {
        ...mapState('search', ['search']),

        searchPlaceholder() {
            return this.$t('header.middle.search');
        },
    },

    watch: {
        searchString(value) {
            this.SEARCH(value);
        },
    },

    methods: {
        ...mapActions('search', ['SEARCH', 'SET_SEARCH']),

        onClearClick() {
            this.SET_SEARCH(false);
        },
    },
};
</script>

