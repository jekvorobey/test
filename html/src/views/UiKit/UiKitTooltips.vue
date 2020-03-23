<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Тултипы
        </h2>
        <a href="https://github.com/Akryum/v-tooltip#component" target="_blank" rel="noopener noreferrer">
            https://github.com/Akryum/v-tooltip#component
        </a>
        <p class="text-grey">
            Мастер тултип placement="bottom"
        </p>
        <v-popover offset="8">
            <button>Click me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Мастер тултип placement="top"
        </p>
        <v-popover offset="8" placement="top">
            <button>Click me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Мастер тултип placement="right"
        </p>
        <v-popover offset="8" placement="right">
            <button>Click me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Мастер тултип placement="left"
        </p>
        <v-popover offset="8" placement="left">
            <button>Click me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Мастер тултип trigger="hover"
        </p>
        <v-popover trigger="hover">
            <button>Hover me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Мастер тултип trigger="click"
        </p>
        <v-popover offset="8" trigger="click">
            <button>Click me</button>
            <template v-slot:popover>
                {{ msg }}
            </template>
        </v-popover>
        <br />
        <br />

        <p class="text-grey">
            Тот же самый тултип, но перекрашенный и без стрелочки popover-class="tooltip--white"
        </p>
        <v-popover offset="8" popover-class="tooltip--white">
            <button>Click me</button>
            <template v-slot:popover>
                Тот же самый тултип, но перекрашенный и без стрелочки
            </template>
        </v-popover>
    </section>
</template>
<script>
import { VPopover } from 'v-tooltip';
import VButton from '@controls/VButton/VButton.vue';

export default {
    name: 'ui-kit-tooltips',
    components: {
        VPopover,
    },
    data() {
        return {
            msg: 'Тултип — просто текст',
        };
    },
};
</script>