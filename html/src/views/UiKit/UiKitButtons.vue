<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">Кнопки</h2>
        <p>Кнопка сабмита всегда активирована и не дизейблится</p>

        <p class="text-grey">Обычная кнопка без стиля</p>

        <p>
            <button style="width: 184px">Оформить</button>
        </p>
        <p>
            <button style="width: 184px" disabled>Оформить</button>
        </p>

        <p class="text-grey">Мастер кнопка стандартная</p>
        <p>
            <v-button style="width: 184px"> Оформить </v-button>
        </p>

        <p>
            <v-button style="width: 184px" disabled> Оформить </v-button>
        </p>

        <p class="text-grey">Мастер кнопка стандартная большая</p>
        <p>
            <v-button class="btn btn--big" style="width: 184px"> Оформить </v-button>
        </p>
        <p>
            <v-button class="btn btn--big" style="width: 184px" disabled> Оформить </v-button>
        </p>

        <p class="text-grey">Мастер кнопка стандартная с обводкой</p>

        <p>
            <v-button class="btn--outline" style="width: 184px"> Оформить </v-button>
        </p>

        <p>
            <v-button class="btn--outline" style="width: 184px" disabled> Оформить </v-button>
        </p>

        <p class="text-grey">Мастер кнопка прозрачная</p>

        <p>
            <v-button class="btn--transparent" style="width: 184px"> Оформить </v-button>
        </p>
        <p>
            <v-button class="btn--transparent" style="width: 184px" disabled> Оформить </v-button>
        </p>
    </section>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';

export default {
    name: 'ui-kit-buttons',
    components: {
        VButton,
    },
};
</script>
