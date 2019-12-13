<template>
    <div class="header-top">
        <div class="container header-top__container">
            <button class="header-top__city" title="Выбрать город">
                <v-svg name="pin" width="16" height="16" />&nbsp;{{ city }}
            </button>
            <div class="header-top__middle">
                <span class="header-top__middle-item">
                    <v-svg name="delivery" width="16" height="16" />{{ $t('header.top.delivery') }}
                </span>
                <span class="header-top__middle-item">
                    <v-svg name="box" width="16" height="16" />{{ $t('header.top.benefits') }}
                </span>
                <span class="header-top__middle-item">
                    <v-svg name="gift" width="16" height="16" />{{ $t('header.top.gifts') }}
                </span>
            </div>
            <button class="header-top__help" title="Помощь">
                {{ $t('header.top.help') }}<v-svg name="arrow-down" width="20" height="20" />
            </button>
        </div>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL } from '../../../store';

import { NAME as SEARCH_MODULE, SEARCH } from '../../../store/modules/Search';

import { NAME as GEO_MODULE, SELECTED_CITY } from '../../../store/modules/Geolocation';
import { SET_SELECTED_CITY } from '../../../store/modules/Geolocation/actions';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import '../../../assets/images/sprites/gift.svg';
import '../../../assets/images/sprites/box.svg';
import '../../../assets/images/sprites/delivery.svg';
import '../../../assets/images/sprites/pin.svg';
import '../../../assets/images/sprites/arrow-down.svg';

import './HeaderTop.critical.css';

export default {
    name: 'header-top',

    components: {
        VSvg,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(SEARCH_MODULE, [SEARCH]),
        ...mapState(GEO_MODULE, {
            city: state => state[SELECTED_CITY].data.city || state[SELECTED_CITY].data.settlement || 'Выберите город',
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),
    },
};
</script>
