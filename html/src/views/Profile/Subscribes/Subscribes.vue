<template>
    <section class="section subscribes-view">
        <div class="container container--tablet-lg">
            <h2 class="subscribes-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        </div>
        <info-panel class="subscribes-view__panel" header="Что вас интересует?">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="selectedSubscribes"
                    v-for="subscribe in subscribes"
                    :id="`subscribe-${subscribe.id}`"
                    :key="subscribe.id"
                    :value="subscribe.id"
                    name="subscribes"
                >
                    {{ subscribe.name }}
                    <div class="text-grey text-sm">
                        {{ subscribe.description }}
                    </div>
                </v-check>
            </div>
        </info-panel>

        <info-panel class="subscribes-view__panel" header="Как часто?">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="selectedPeriod"
                    v-for="period in periods"
                    :id="`period-${period.id}`"
                    :key="period.id"
                    :value="period.id"
                    type="radio"
                    name="period"
                >
                    {{ period.name }}
                </v-check>
            </div>
        </info-panel>

        <info-panel class="subscribes-view__panel" header="Предпочитаемый способ связи">
            <div class="container container--tablet-lg">
                <v-check
                    v-model="selectedReceivers"
                    v-for="receiver in receivers"
                    :id="`receiver-${receiver.id}`"
                    :key="receiver.id"
                    :value="receiver.id"
                    name="receivers"
                >
                    {{ receiver.name }}
                </v-check>
            </div>
        </info-panel>

        <div class="container subscribes-view__submit">
            <v-button class="subscribes-view__submit-btn" @click="onSave">
                Сохранить
            </v-button>
        </div>
    </section>
</template>

<script>
import VButton from '../../../components/controls/VButton/VButton.vue';
import VCheck from '../../../components/controls/VCheck/VCheck.vue';

import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';

import { mapActions, mapState } from 'vuex';
import { $store } from '../../../services/ServiceLocator';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import './Subscribes.css';

export default {
    name: 'subscribes',

    components: {
        VButton,
        VCheck,

        InfoPanel,
    },

    data() {
        return {
            selectedSubscribes: [],
            subscribes: [
                {
                    id: 1,
                    name: 'Новинки лучших мировых брендов',
                    description: 'Самые свежие новости в удобном формате в одном месте',
                },
                {
                    id: 2,
                    name: 'Персональные рекомендации',
                    description: 'Рекомендации по твоим предпочтениям (настроить можно в разделе «Мои предпочтения»)',
                },
                {
                    id: 3,
                    name: 'СМС-оповещения',
                    description: 'Оповещения на любую тему',
                },
            ],

            selectedPeriod: 1,
            periods: [
                {
                    id: 1,
                    name: 'Каждый день',
                },
                {
                    id: 2,
                    name: '1 раз в неделю',
                },
                {
                    id: 3,
                    name: '2 раза в месяц',
                },
                {
                    id: 4,
                    name: 'Никогда',
                },
            ],

            selectedReceivers: [],
            receivers: [
                {
                    id: 1,
                    name: 'SMS',
                },
                {
                    id: 2,
                    name: 'WhatsApp',
                },
                {
                    id: 3,
                    name: 'Viber',
                },
                {
                    id: 4,
                    name: 'Telegram',
                },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {}),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSave() {},
    },
};
</script>
