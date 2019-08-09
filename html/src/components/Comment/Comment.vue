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

<style lang="postcss">
.comment-children {
    .comment-children {
        margin-left: 1.5em;
    }
}

.comment {
    border-top: 1px solid #eee;
    position: relative;

    .by,
    .text,
    .toggle {
        font-size: 0.9em;
        margin: 1em 0;
    }

    .by {
        color: #828282;

        a {
            color: #828282;
            text-decoration: underline;
        }
    }

    .text {
        overflow-wrap: break-word;

        a:hover {
            color: #ff6600;
        }

        pre {
            white-space: pre-wrap;
        }
    }

    .toggle {
        background-color: #fffbf2;
        padding: 0.3em 0.5em;
        border-radius: 4px;

        a {
            color: #828282;
            cursor: pointer;
        }

        &.open {
            padding: 0;
            background-color: transparent;
            margin-bottom: -0.5em;
        }
    }
}
</style>
