<template>
    <li v-if="comment" class="comment">
        <div class="by">
            <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
            {{ comment.time | timeAgo }} ago
        </div>
        <div class="text" v-html="comment.text"></div>
        <v-button class="toggle" :class="{ open }" @click="open = !open" v-if="comment.kids && comment.kids.length">
            {{ open ? '[-]' : `[+] ${pluralize(comment.kids.length)} collapsed` }}
        </v-button>
        <ul class="comment-children" v-show="open">
            <comment v-for="id in comment.kids" :key="id" :id="id"></comment>
        </ul>
    </li>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import './Comment.css';

export default {
    name: 'comment',
    components: {
        VButton,
    },
    props: ['id'],
    data() {
        return {
            open: true,
        };
    },
    computed: {
        comment() {
            return this.$store.state.item_list.items[this.id];
        },
    },
    methods: {
        pluralize: n => n + (n === 1 ? ' reply' : ' replies'),
    },
};
</script>
