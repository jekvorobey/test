<template>
    <div class="retail-rocket-container" />
</template>

<script>

export default {
    name: 'retail-rocket-container',

    data() {
        return {
            blockId: this.$attrs['data-retailrocket-markup-block'] || null,
        };
    },

    watch: {
        $attrs: {
            handler(oldValue, newValue) {
                // почему-то watch срабатывает даже когда значения не изменились
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    this.markupRender();
                }
            },
        },
    },

    methods: {
        markupRender() {
            if (typeof retailrocket === 'undefined' || this.blockId === null) {
                return;
            }

            // чтобы перерендерить блок - нужно удалить аттрибут "initialized"
            const selector = `div[data-retailrocket-markup-block="${this.blockId}"]`;
            document.querySelectorAll(selector).forEach(i => i.removeAttribute('initialized'));

            retailrocket.markup.render();
        },

        setDuplicatesModule() {
            if (typeof retailrocket === 'undefined') {
                return;
            }

            retailrocket.setModule('duplicates', [], function () {
                function has(id) {return false;}
                function add(id) {}
                function remove(id) {}
                function filter(recom) {return true;}
                function filteredCount(recoms) {return recoms.length;}
                function getItems() {return [];}
                return {
                    has: has,
                    add: add,
                    remove: remove,
                    filter: filter,
                    filteredCount: filteredCount,
                    getItems: getItems,
                };
            });
        },
    },

    mounted() {
        // retailrocket устанавливаем модуль duplicates, который хранит отображенные ранее товары
        // и при перерендеринге не отображает их снова
        // хотфикс: затираем этот модуль заглушкой
        this.setDuplicatesModule();

        this.markupRender();
    }
};
</script>
