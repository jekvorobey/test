<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <div class="info-pages-block__content">
            <p>
                Интересует работа в компании Бессовестно Талантливый? Присылай резюме на
                <a href="mailto:job@ibt.ru">job@ibt.ru</a> с указанием интересующей должности в теме письма.
            </p>

            <p>
                Получение персональных данных подтверждает согласие на их обработку и хранение. Конфиденциальность
                является нашим приоритетом. Рассматриваются заявки лиц старше 18 лет.
            </p>
        </div>
    </div>
</template>
<script>
import metaMixin from '@plugins/meta';

export default {
    name: 'info-page-vacancies',
    mixins: [metaMixin],

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    computed: {
        pageTitle(){
            return 'Вакансии';
        },
    },
};
</script>