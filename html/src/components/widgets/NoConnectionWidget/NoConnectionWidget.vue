<template>
    <transition name="fade">
        <div
                @click="hideByClick"
                :class="{'no-connection__show': toShow}"
                class="no-connection"
        >
            <div v-if="!online" class="no-connection__fail">Отсутствует интернет соединение</div>
            <div v-else class="no-connection__restore">Соединение восстановлено</div>
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