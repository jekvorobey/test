<template>
  <div class="hf-modal-overlay" :class="{tablet: isTablet}">
    <general-modal
        type="sm"
        :is-mobile="isTablet"
        @close="onClose"
        class="modal-mask hf-modal-mask"
        :showCloseBtn="false"
    >
        <template v-slot:content>
          <div class="modal-mask hf-modal-mask">
            <div class="modal-wrapper ft-modal-wrapper">
              <div class="modal-container ft-modal-container hf-modal-bg">

                <v-picture>
                  <source :srcset="homeFirstNewMobile" media="(max-width: 479px)" />
                  <source :srcset="homeFirstNew" media="(min-width: 480px)" />
                  <source :srcset="homeFirstNew2x" media="(min-width: 1024px)" />

                  <img class="modal-image hf-modal-image" :src="homeFirstNew" />
                </v-picture>

                <div class="hf-modal-h2">Маркетплейс только для профессионалов бьюти-индустрии</div>
                <div class="hf-modal-h4">Для совершения покупок подтверди статус профессионала</div>

                <v-button class="modal-default-button hf-modal-default-button" @click="onRegistration">регистрация</v-button>

                <i class="modal-close hf-modal-close" @click="onClose"/>

              </div>
            </div>
          </div>
        </template>
    </general-modal>
  </div>
</template>

<script>
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';

import homeFirstNew from '@images/mock/homeFirstNew.png';
import homeFirstNew2x from '@images/mock/homeFirstNew@2x.png';
import homeFirstNewMobile from '@images/mock/homeFirstNewMobile.png';
import homeFirstImg from '@images/mock/home-first.svg';

import './HomeFirstModal.css';

const NAME = modalName.general.HOME_FIRST;

export default {
    name: NAME,
    inheritAttrs: false,

    components: {
      VButton,
      VPicture,
      GeneralModal,
    },

    data() {
      return {
        homeFirstImg,
        homeFirstNew,
        homeFirstNew2x,
        homeFirstNewMobile,
      }
    },

    computed: {
      ...mapState(MODAL_MODULE, {
        isOpen: (state) => (state[MODALS][NAME] && state[MODALS][NAME].open) || false,
        modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
      }),

      isTablet() {
        return this.$mq.tablet;
      },
    },

    methods: {
      ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

      onRegistration() {
        this.onClose()
        this.$router.push({ query: { registration: 'true' } })
      },

      onClose() {
        localStorage.isSecondStart = true
        this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
      },
    }
};
</script>