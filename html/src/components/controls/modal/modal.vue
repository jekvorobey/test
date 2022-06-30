<template>
    <div @click="onClose" class="modal-mask" @touchstart.self.prevent="onClose" @touchmove.self.prevent>
        <div
            v-scroll-lock="lock"
            ref="wrapper"
            class="modal-wrapper"
            tabindex="0"
            @keydown="keyDown"
            @scroll="onScroll"
            :class="{ 'modal-wrapper--fullscreen': type === 'fullscreen' }"
        >
            <div
                class="modal-container popup"
                :class="{ [`popup--${type}`]: type, [`popup--${name}`]: name }"
                ref="popup"
                @mouseenter="onPopupMouseEnter"
                @mouseleave="onPopupMouseLeave"
            >
                <transition name="fade-in">
                    <div v-show="loading" class="modal-loading">
                        <v-spinner show />
                    </div>
                </transition>

                <div class="modal-header popup__header">
                    <slot name="header">
                        <!-- Default header -->
                    </slot>
                </div>

                <div class="modal-body popup__body">
                    <slot name="body">
                        <!-- Default body -->
                    </slot>
                </div>

                <div class="modal-footer popup__footer">
                    <slot name="footer">
                        <!-- Default footer -->
                    </slot>
                </div>
                <button
                    v-if="showCloseBtn"
                    type="button"
                    title="Закрыть"
                    class="modal-default-button popup__close"
                    :class="closeBtnClass"
                    @click="$emit('close')"
                >
                    <v-svg name="cross" width="24" height="24" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import '@images/sprites/cross.svg';
import './modal.css';

export default {
    name: 'modal',
    components: {
        VSpinner,
        VSvg,
    },
    props: {
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        closeOnBtn: {
            type: Boolean,
            default: true,
        },
        isScrollLocked: {
            type: Boolean,
            default: true,
        },
        showCloseBtn: {
            type: Boolean,
            default: true,
        },
        closeBtnClass: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            clickInside: false,
            lock: false,
        };
    },
    methods: {
        onPopupMouseEnter() {
            this.clickInside = true;
        },
        onPopupMouseLeave() {
            this.clickInside = false;
        },
        onClose(e) {
            const { popup } = this.$refs;
            if (popup && popup !== e.target && !popup.contains(e.target)) {
                if (!this.clickInside) this.$emit('close');
                else this.clickInside = false;
            }
        },
        keyDown(e) {
            switch (e.key) {
                case 'Escape':
                    if (this.closeOnBtn) this.$emit('close');
                    e.preventDefault();
                    break;
            }
        },
        onScroll(event) {
            this.$emit('scroll', event);
        },
    },
    mounted() {
        this.lock = this.isScrollLocked;
        this.$refs.wrapper.focus();
    },
    beforeDestroy() {
        this.lock = false;
    },
};
</script>
