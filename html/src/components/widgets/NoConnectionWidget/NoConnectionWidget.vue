<template>
    <transition name="fade">
        <div
                @click="hideByClick"
                class="no-connection"
                :class="{'no-connection__show': toShow, 'no-connection__restore':online,  'no-connection__fail': !online}"
        >
            <div>{{ messageText }}</div>
            <v-svg v-if="!online" class="no-connection__cross" name="cross" width="25" height="25"/>
        </div>
    </transition>
</template>

<script>
    import "./NoConnectionWidget.css"

    export default {
        name: "NoConnectionWidget",
        data() {
            return {
                toShow: false,
                online: true
            }
        },
        methods: {
            hideByClick() {
                this.toShow = false
            },
            showByTimeout() {
                this.toShow = true
                setTimeout(() => {
                    this.toShow = false
                }, 3000)
            },
            show() {
                this.toShow = true
            }
        },
        computed: {
            messageText() {
                return this.online ? 'Соединение восстановлено' : 'Отсутствует интернет соединение'
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('offline', () => {
                    this.online = false
                    this.show()
                });

                window.addEventListener('online', () => {
                    this.online = true
                    this.showByTimeout()
                });
            })
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>