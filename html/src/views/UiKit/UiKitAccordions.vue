<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Аккордионы
        </h2>
        <v-accordion key-value="id" :items="items" :item-disabled="item => item.disabled">
            <template v-slot:content="{ item }">
                <div style="padding: 16px;">{{ item.content }}</div>
            </template>
        </v-accordion>
    </section>
</template>
<script>
import VAccordion from '../../components/controls/VAccordion/VAccordion.vue';

export default {
    name: 'ui-kit-accordions',
    components: {
        VAccordion,
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    title: 'Вкладка 1',
                    content: 'Контент 1',
                },
                {
                    id: 2,
                    title: 'Вкладка 2',
                    content: 'Контент 2',
                },
                {
                    id: 3,
                    title: 'Вкладка 3',
                    content: 'Контент 3',
                    disabled: true,
                },
            ],
        };
    },
};
</script>