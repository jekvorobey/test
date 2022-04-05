<template>
    <general-modal class="cart-non-prof-warning" :header="'Внимание'" :is-mobile="isTablet" @close="onClose">
        <template v-slot:content>
            <div class="container">
                <h4 v-if="!isTablet" class="cart-non-prof-warning__header">Внимание</h4>

                <div class="cart-non-prof-warning__main-text">
                    <template v-if="user.status === userStatus.CONSIDERATION">
                        В вашей корзине находятся продукты для профессионалов, они доступны для покупки только после
                        модерации. Сейчас вы можете купить часть продуктов, либо подождать окончания модерации и
                        приобрести все продукты из своей корзины.
                    </template>
                    <template v-else>
                        В вашей корзине находятся продукты для профессионалов, они доступны для покупки только после
                        модерации. Сейчас вы можете купить часть продуктов, либо пройти модерацию и приобрести все
                        продукты из своей корзины.
                    </template>
                </div>

                <div class="cart-non-prof-warning__second-text">
                    Модерация вашего профиля займет до 1 часа. После модерации вам будут доступны все продукты и вы
                    будете видеть все цены.
                </div>

                <div class="cart-non-prof-warning__actions">
                    <v-button @click="$emit('buy')">Купить сейчас</v-button>
                    <v-button
                        v-if="user.status !== userStatus.CONSIDERATION"
                        class="btn--outline"
                        @click="$emit('do-moderate')"
                    >
                        Пройти модерацию
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>
<script>
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import { modalName } from '@enums';
import { mapActions, mapState } from 'vuex';
import { MODALS, NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import VButton from '@controls/VButton/VButton.vue';

import { NAME as AUTH_MODULE, USER } from '@store/modules/Auth';
import { userStatus } from '@enums/profile';

import './CartNonProfWarning.css';

const NAME = modalName.cart.CART_NON_PROF_WARNING;

export default {
    name: NAME,

    components: {
        VButton,
        GeneralModal,
    },

    data() {
        return {
            userStatus,
        };
    },

    computed: {
        ...mapState(AUTH_MODULE, {
            user: (state) => state[USER],
        }),
        ...mapState(MODAL_MODULE, {
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },
};
</script>
