<template>
    <ul class="group-list">
        <li
            class="group-list__item"
            v-for="{ name, id, to, items: children } in items"
            :key="id"
            :style="{ width: columnWidth }"
        >
            <v-link
                v-if="to && to !== currentPath"
                class="group-list__link group-list__title"
                :to="to"
                @click="onClick"
            >
                {{ name }}
            </v-link>
            <div v-else class="group-list__title">
                {{ name }}
            </div>

            <v-expander
                v-if="Array.isArray(children) && children.length > maxCount"
                class="group-list__expander"
                :min-height="160"
            >
                <ul>
                    <li class="group-list__item__li" v-for="{ name, id, to } in children" :key="id">
                        <v-link v-if="to !== currentPath" class="group-list__link" :to="to" @click="onClick">
                            {{ name }}
                        </v-link>
                        <div v-else class="group-list__link--selected">
                            {{ name }}
                        </div>
                    </li>
                </ul>

                <template v-slot:btn="{ isExpanded }">
                    {{ isExpanded ? 'Скрыть' : 'Показать все' }}
                </template>
            </v-expander>
            <ul v-else>
                <li class="group-list__item__li" v-for="{ name, id, to } in children" :key="id">
                    <v-link v-if="to !== currentPath" class="group-list__link" :to="to" @click="onClick">
                        {{ name }}
                    </v-link>
                    <div v-else class="group-list__link--selected">
                        {{ name }}
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VExpander from '@controls/VExpander/VExpander.vue';
import './GroupList.css';

export default {
    name: 'group-list',

    components: {
        VLink,
        VExpander,
    },

    props: {
        items: {
            type: [Array, Object],
            default() {
                return [];
            },
        },

        columns: {
            type: [Number, String],
            default: 4,
        },

        count: {
            type: [Number, String],
            default: 5,
        },
    },

    computed: {
        columnWidth() {
            return `${100 / Number(this.columns)}%`;
        },

        maxCount() {
            return Number(this.count);
        },

        currentPath() {
            return this.$route.path;
        },
    },

    methods: {
        onClick(e) {
            this.$emit('link-click', e);
        },
    },
};
</script>
