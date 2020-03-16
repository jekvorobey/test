<template>
    <li class="document-card">
        <div class="text-grey text-sm">
            {{ type }}
        </div>
        <div class="document-card__name">
            {{ name }}
        </div>
        <div class="document-card__bottom">
            <v-link class="document-card__bottom-link">Скачать</v-link>
            <span class="text-grey text-sm">
                {{ size }}, <span class="text-uppercase">{{ ext }}</span>
            </span>
        </div>
    </li>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import './DocumentCard.css';

export default {
    name: 'document-card',

    props: {
        type: {
            type: String,
        },

        name: {
            type: String,
            required: true,
        },

        size: {
            type: String,
        },

        ext: {
            type: String,
        },
    },

    components: {
        VLink,
    },

    computed: {},

    methods: {},
};
</script>
