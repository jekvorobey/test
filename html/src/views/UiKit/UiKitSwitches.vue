<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Переключатели
        </h2>
        <p class="text-grey">
            Мастер радиобаттоны
        </p>
        <form>
            <v-check v-model="enabled" id="switch-1" value="1" name="switch-1" is-switch>Переключатель</v-check>
            <v-check v-model="disabled" id="switch-2" value="2" name="switch-2" is-switch disabled>
                Disabled
            </v-check>
            <v-check id="switch-3" value="3" name="switch-3" checked is-switch disabled>
                Задизеймлен, но включен
            </v-check>
        </form>
        <p>Выбрано "Переключатель": {{ enabled }}</p>
        <p>Выбрано "Disabled": {{ disabled }}</p>
    </section>
</template>
<script>
import VCheck from '@controls/VCheck/VCheck.vue';

export default {
    name: 'ui-kit-switches',
    components: {
        VCheck,
    },
    data() {
        return {
            enabled: true,
            disabled: false,
        };
    },
};
</script>