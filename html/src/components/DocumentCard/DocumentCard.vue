<template>
    <li class="document-card">
        <div class="text-grey text-sm">
            {{ type }}
        </div>
        <div class="document-card__name">
            {{ name }}
        </div>
        <div class="document-card__bottom">
            <a class="document-card__bottom-link" :href="href" download>Скачать</a>
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

        href: {
            type: String,
        },
    },

    components: {
        VLink,
    },
};
</script>
