<template>
    <table class="v-table">
        <slot />
        <thead>
            <tr class="v-table__row v-table__row--head">
                <th class="v-table__row-th" v-for="key in columns">
                    <slot :name="`column-${key}`">
                        {{ key }}
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="v-table__row" v-for="item in items">
                <td class="v-table__row-td" v-for="key in columns">
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
