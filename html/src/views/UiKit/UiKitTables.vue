<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Таблицы
        </h2>
        <p class="text-grey">
            Мастер таблица
        </p>
        <div style="width: 50%;">
            <v-table :items="items" :columns="columns">
                <colgroup>
                    <col width="60%" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>

                <template v-slot:column-name>
                    Акционный инструмент
                </template>
                <template v-slot:column-price>
                    Новая цена
                </template>
                <template v-slot:column-old_price>
                    Старая цена
                </template>
            </v-table>
        </div>
    </section>
</template>
<script>
import VTable from '@controls/VTable/VTable.vue';

export default {
    name: 'ui-kit-tables',
    components: {
        VTable,
    },
    data() {
        return {
            columns: ['name', 'old_price', 'price'],
            items: [
                {
                    id: 1,
                    name: 'Бензопила Stihl MS 180 (40см 3/8 1,3 55)',
                    price: 11990,
                    old_price: 13490,
                },
                {
                    id: 2,
                    name: 'Бензопила Stihl MS 180C-ВЕ (40см 3/8 1,3 55)',
                    price: 13490,
                    old_price: 13990,
                },
                {
                    id: 3,
                    name: 'Бензопила Stihl MS 230 (35см 3/8 1,3 50)',
                    price: 18990,
                    old_price: 19990,
                },
                {
                    id: 4,
                    name: 'Бензопила Stihl MS 250 (35см 3/8 1,3 50)',
                    price: 20990,
                    old_price: 22990,
                },
            ],
        };
    },
};
</script>