<template>
    <section class="section certificates-view">
        <h2 class="certificates-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <div class="container container--tablet-lg">
            <div class="certificates-view__panel">
                <v-input
                    class="certificates-view__panel-input"
                    v-model="certificate"
                    placeholder="Введите сертификат"
                />
                <v-button>Активировать</v-button>
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
                <table class="certificates-view__table">
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
                        <tr class="certificates-view__table-tr" key="1">
                            <td class="certificates-view__table-td">14-5889-66087</td>
                            <td class="certificates-view__table-td">1 000 ₽</td>
                            <td class="certificates-view__table-td">1 000 ₽</td>
                            <td class="certificates-view__table-td">18 августа 2019</td>
                        </tr>
                        <tr class="certificates-view__table-tr" key="2">
                            <td class="certificates-view__table-td">14-5889-67744</td>
                            <td class="certificates-view__table-td">500 ₽</td>
                            <td class="certificates-view__table-td">500 ₽</td>
                            <td class="certificates-view__table-td">15 августа 2019</td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </section>
    </section>
</template>

<script>
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';

import AttentionPanel from '../../../components/AttentionPanel/AttentionPanel.vue';

import './Certificates.css';

export default {
    name: 'certificates',

    components: {
        VLink,
        VButton,
        VInput,

        AttentionPanel,
    },

    data() {
        return {
            certificate: '',
        };
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {},

    methods: {},
};
</script>
