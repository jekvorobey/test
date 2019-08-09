/**
 * Get title of document from view
 * Получить титульный текст из рутового компонента
 * @param {*} vm
 */
function getTitle(vm) {
    const { title } = vm.$options;
    if (title) {
        return typeof title === 'function' ? title.call(vm) : title;
    }
    return null;
}

/**
 * Mixin for setting title of document, on server-side
 * Миксин для получения титульника на сервере (при первом рендеринге)
 */
const serverTitleMixin = {
    created() {
        const title = getTitle(this);
        if (title) this.$ssrContext.title = `IBT | ${title}`;
    },
};

/**
 * Mixin for setting title of document, on client-side
 * Миксин для получения титульника на клиенте (при переключении роутов)
 */
const clientTitleMixin = {
    mounted() {
        const title = getTitle(this);
        if (title) document.title = `IBT | ${title}`;
    },
};

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin;
