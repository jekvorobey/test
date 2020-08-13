<template>
    <table class="v-table">
        <slot />
        <thead>
            <tr class="v-table__row v-table__row--head">
                <th class="v-table__row-th" :key="key" v-for="key in columns">
                    <slot :name="`column-${key}`">
                        {{ key }}
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="v-table__row" :key="item[keyField] || index" v-for="(item, index) in items">
                <td :key="key" class="v-table__row-td" v-for="key in columns">
                    <slot :name="`cell-${key}`" :item="item" :value="item[key]">
                        {{ item[key] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import './VTable.css';

/**
 * Базовый класс для Table
 */
export default {
    name: 'v-table',

    props: {
        keyField: {
            type: String,
        },

        items: {
            type: Array,
            default() {
                return [];
            },
        },

        columns: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>
