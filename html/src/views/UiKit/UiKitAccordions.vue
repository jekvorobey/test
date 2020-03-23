<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Аккордионы
        </h2>
        <p class="text-grey">
            Обычный Аккордион с одиночным выбором
        </p>
        <v-accordion key-value="id" :items="items">
            <template v-slot:content="{ item }">
                <div style="padding: 16px;">{{ item.content }}</div>
            </template>
        </v-accordion>
        <br />
        <br />
        <p class="text-grey">
            Обычный c disabled вкладкой
        </p>
        <v-accordion key-value="id" :items="items" :item-disabled="item => item.isDisabled">
            <template v-slot:content="{ item }">
                <div style="padding: 16px;">{{ item.content }}</div>
            </template>
        </v-accordion>
        <br />
        <br />
        <p class="text-grey">
            Аккордион с множественным выбором и скрытием вкладки disabled
        </p>
        <v-accordion
            key-value="id"
            :items="items"
            :item-disabled="item => item.isDisabled"
            :item-expanded="item => item.isExpanded && !item.isDisabled"
            :item-toggled="item => (item.isExpanded = !item.isExpanded)"
        >
            <template v-slot:content="{ item }">
                <div style="padding: 16px;">{{ item.content }}</div>
            </template>
        </v-accordion>
        <br />
        <br />
        <v-button @click="items[2].isDisabled = !items[2].isDisabled">
            {{ items[2].isDisabled ? 'Enable item 3' : 'Disable item 3' }}
        </v-button>
    </section>
</template>
<script>
import VAccordion from '@controls/VAccordion/VAccordion.vue';
import VButton from '@controls/VButton/VButton.vue';

export default {
    name: 'ui-kit-accordions',
    components: {
        VButton,
        VAccordion,
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    title: 'Вкладка 1',
                    content: 'Контент 1',
                    isExpanded: false,
                    isDisabled: false,
                },
                {
                    id: 2,
                    title: 'Вкладка 2',
                    content: 'Контент 2',
                    isExpanded: true,
                    isDisabled: false,
                },
                {
                    id: 3,
                    title: 'Вкладка 3',
                    content: 'Контент 3',
                    isExpanded: false,
                    isDisabled: true,
                },
            ],
        };
    },
};
</script>