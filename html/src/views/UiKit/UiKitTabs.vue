<template>
    <section class="section ui-kit-section ui-kit-tabs">
        <h2 class="ui-kit-section__hl">
            Табы
        </h2>
        <p class="text-grey">
            Мастер Табы
        </p>
        <v-tabs :items="items" key-field="id" :activeTab.sync="activeTab">
            <template v-slot:header="{ item }">
                {{ item.title }}
            </template>
            <template v-slot:panel="{ item }">
                <div v-if="item.id == 1">
                    Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего
                    сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так
                    счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого.
                </div>
                <div v-if="item.id == 2">
                    <form class="ui-kit-tabs__form" method="POST" action="/lalal" novalidate>
                        <div class="ui-kit-tabs__form-cols">
                            <v-input v-model="form.name" class="ui-kit-tabs__form-col" name="name">
                                Введите имя
                            </v-input>
                            <v-datepicker v-model="form.date" class="ui-kit-tabs__form-col" name="date">
                                Введите дату рождения
                            </v-datepicker>
                            <v-input v-model="form.tel" class="ui-kit-tabs__form-col" type="tel" name="tel">
                                Телефон
                            </v-input>
                            <v-input v-model="form.email" class="ui-kit-tabs__form-col" type="email" name="email">
                                E-mail
                            </v-input>
                        </div>
                        <v-button type="submit">Отправить</v-button>
                    </form>
                </div>
                <div v-if="item.id == 3">
                    <form>
                        <v-input name="input">
                            Введите имя
                        </v-input>
                        <v-button type="submit">Отправить</v-button>
                    </form>
                </div>
            </template>
        </v-tabs>
        <br />
        <br />
        <v-button @click="items[1].disabled = !items[1].disabled">
            {{ items[1].disabled ? 'Открыть вторую вкладку' : 'Закрыть вторую вкладку' }}
        </v-button>
    </section>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VDatepicker from '@controls/VDatepicker/VDatepicker.vue';
import VTabs from '@controls/VTabs/VTabs.vue';

import '@images/sprites/datepicker.svg';
import './UiKitTabs.css';

export default {
    name: 'ui-kit-tabs',
    components: {
        VSvg,
        VButton,
        VInput,
        VDatepicker,
        VTabs,
    },
    data() {
        return {
            form: {
                name: '',
                date: [],
                tel: '',
                email: '',
            },
            items: [
                {
                    id: 1,
                    title: 'Вкладка 1',
                },
                {
                    id: 2,
                    title: 'Вкладка 2',
                    disabled: true,
                },
                {
                    id: 3,
                    title: 'Вкладка 3',
                },
            ],
            activeTab: 0,
        };
    },
};
</script>
