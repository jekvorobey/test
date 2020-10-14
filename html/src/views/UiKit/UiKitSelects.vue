<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">Селекты</h2>
        <div style="width: 50%">
            <v-select v-model="value" :options="items" :error="error" :searchable="false" :disabled="disabled">
                Вид деятельности
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-select>
        </div>
        <br />
        <div style="width: 50%">
            <v-select v-model="value" :options="items" :error="error" placeholder="Найти..." :disabled="disabled">
                Вид деятельности
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-select>
        </div>
        <br />
        <div style="width: 50%">
            <v-select
                v-model="value2"
                :options="items2"
                track-by="name"
                label="name"
                group-label="type"
                group-values="values"
                :close-on-select="false"
                :clearOnSelect="false"
                placeholder="Найти..."
                :error="error2"
                :disabled="disabled"
            >
                Вид деятельности
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-select>
        </div>
        <br />
        <div style="width: 50%">
            <v-select
                id="select-3"
                v-model="value3"
                :options="items2"
                label="name"
                track-by="name"
                :close-on-select="false"
                :clear-on-select="false"
                group-label="type"
                group-values="values"
                placeholder="Найти..."
                :error="error3"
                multiple
                :searchable="false"
                :disabled="disabled"
            >
                Фреймворки
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-select>
        </div>
        <button @click="disabled = !disabled">{{ disabled ? 'Включить' : 'Выключить' }}</button>
    </section>
</template>
<script>
import VSelect from '@controls/VSelect/VSelect.vue';

export default {
    name: 'ui-kit-selects',
    components: {
        VSelect,
    },
    data() {
        const items2 = [
            {
                type: 'Группа1',
                values: [{ name: 'Алмазный брокер' }, { name: 'Ювелирный брокер' }],
            },
            {
                type: 'Группа2',
                values: [{ name: 'Продавец воздуха' }, { name: 'Продавец ювелирных изделий' }, { name: 'Барыга' }],
            },
            {
                type: 'Группа3',
                values: [{ name: 'Помидор' }, { name: 'Огурец' }, { name: 'Лук' }],
            },
        ];
        return {
            disabled: false,
            value: 'Алмазный брокер',
            items: [
                'Алмазный брокер',
                'Ювелирный брокер',
                'Продавец воздуха',
                'Продавец ювелирных изделий',
                'Барыга',
                'Vue.js',
                'Adonis',
            ],
            value2: items2[0].values[0],
            items2,

            value3: [],
            items3: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Adonis', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP' },
                { name: 'Phoenix', language: 'Elixir' },
            ],
        };
    },
    computed: {
        error() {
            return this.value ? null : 'Необходимо выбрать';
        },
        error2() {
            return this.value2 ? null : 'Необходимо выбрать';
        },
        error3() {
            return this.value3.length !== 0 ? null : 'Необходимо выбрать';
        },
    },
};
</script>
