<template>
    <section class="section certificates-view">
        <h2 class="certificates-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <div class="container container--tablet-lg">
            <div class="certificates-view__panel">
                <v-input
                    class="certificates-view__panel-input"
                    v-model="certificate"
                    placeholder="Введите PIN сертификата"
                    :error="activateError"
                    :show-error="true"
                    @input="activateError = ''"
                />
                <div>
                    <v-button @click="activate">Активировать</v-button>
                </div>
            </div>
        </div>

        <attention-panel class="certificates-view__attention">
            <div>
                <div>Потратить сертификат вы можете при оплате заказа.</div>
                Ознакомиться&nbsp;с&nbsp;
                <v-link class="certificates-view__attention-link">
                    полными условиями оферты подарочных сертификатов.
                </v-link>
            </div>
        </attention-panel>

        <section class="certificates-view__section">
            <div class="container container--tablet-lg">
                <h3 class="certificates-view__section-hl">Активированные сертификаты</h3>

                <attention-panel v-if="!loading && !cards.length" class="certificates-view__attention">
                    <div>У вас пока нет активированных сертификатов.</div>
                </attention-panel>

                <table class="certificates-view__table" v-if="cards.length">
                    <colgroup v-if="!isTablet">
                        <col width="35%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="15%" />
                    </colgroup>
                    <colgroup v-else>
                        <col width="33%" />
                        <col width="33%" />
                        <col width="33%" />
                    </colgroup>
                    <thead class="certificates-view__table-head">
                        <tr class="certificates-view__table-tr certificates-view__table-tr--header">
                            <th class="certificates-view__table-th">Заказ/событие</th>
                            <th class="certificates-view__table-th">Номинал</th>
                            <th class="certificates-view__table-th">{{ isTablet ? 'Остаток' : 'Остаток суммы' }}</th>
                            <th class="certificates-view__table-th">Дата активации</th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="fade-in" appear class="certificates-view__table-body">
                        <tr v-for="card in cards" class="certificates-view__table-tr" :key="'card' + card.id">
                            <td class="certificates-view__table-td text-underline">
                                {{ card.order.order_number }}
                            </td>
                            <td class="certificates-view__table-td">
                                <price :value="card.price" :currency="'RUB'" />
                            </td>
                            <td class="certificates-view__table-td">
                                <price :value="card.balance" :currency="'RUB'" />
                            </td>
                            <td class="certificates-view__table-td">
                                {{ ruDate(card.activated_at) }}
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </section>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import Price from '@components/Price/Price.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import './Certificates.css';

import { mapState, mapActions, mapGetters } from 'vuex';

import {
    ACTIVATE_CERTIFICATE,
    FETCH_CERTIFICATES,
} from '@store/modules/Certificate/actions';

import {
    CERTIFICATES,
    CERTIFICATE_STATUS,
    RECEIVE_METHOD_STATUS,
} from '@store/modules/Certificate/getters';

import { NAME as CERTIFICATE_MODULE, CERTIFICATE_TYPE, CERTIFICATE_DATA } from '@store/modules/Certificate';

export default {
    name: 'certificates',

    components: {
        VLink,
        VButton,
        VInput,
        Price,
        AttentionPanel,
    },

    data() {
        return {
            loading: false,
            certificate: '',
            activateError: '',
        };
    },

    computed: {
        ...mapState(CERTIFICATE_MODULE, [CERTIFICATE_TYPE, CERTIFICATE_DATA]),
        ...mapGetters(CERTIFICATE_MODULE, [RECEIVE_METHOD_STATUS, CERTIFICATE_STATUS, CERTIFICATES]),

        isTablet() {
            return this.$mq.tablet;
        },

        cards() {
            return this[CERTIFICATES] ? this[CERTIFICATES] : []
        },
    },

    watch: {},

    methods: {
        ...mapActions(CERTIFICATE_MODULE, [
            FETCH_CERTIFICATES,
            ACTIVATE_CERTIFICATE,
        ]),

        async fetchCards() {
            this.loading = true
            try {
                await this[FETCH_CERTIFICATES]()
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        },

        ruDate(sqlDateTime) {
            if (!sqlDateTime) return '';
            const matches = sqlDateTime.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (!matches) return '';
            const month = parseInt(matches[2]);
            const n = [
                '',
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ][month];
            return parseInt(matches[3]) + ' ' + n + ' ' + matches[1];
        },

        async activate() {
            if (!this.certificate || this.certificate.trim() === '') {
                return
            }
            try {
                this.$progress.start()
                await this[ACTIVATE_CERTIFICATE](this.certificate)
                this.$progress.finish()
                this.certificate = ''
                this.fetchCards()
            } catch (e) {
                this.activateError =
                         e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат'
                this.$progress.fail()
                this.$progress.finish() // finish после fail точно необходим?
            }
        },
    },
    mounted() {
        this.fetchCards()
    },
};
</script>
