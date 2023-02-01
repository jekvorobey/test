<template>
    <pin-modal class="quick-variant-add-to-card-modal" @close="onClose">
        <h1>quick-promo-variant</h1>
    </pin-modal>
</template>

<script>
    import PinModal from "@components/PinModal/PinModal.vue";
    import {CHANGE_MODAL_STATE} from "@store/modules/Modal/actions";
    import {modalName} from "@enums";
    import {NAME as MODAL_MODULE} from "@store/modules/Modal";
    import { mapActions } from 'vuex';
    const NAME = modalName.general.QUICK_PROMO_VARIANT;

    export default {
        name: "quick-promo-variant",
        components: {PinModal},
        methods: {
            ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

            onClose() {
                console.log('quick-promo-variant onClose', NAME)
                this[CHANGE_MODAL_STATE]({name: NAME, open: false, state: null});
            },
        }
    }
</script>

<style scoped>

</style>