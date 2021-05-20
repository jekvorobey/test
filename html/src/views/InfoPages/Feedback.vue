<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <div class="info-pages-block__content">
            <p>Если у вас срочный вопрос, позвоните в службу поддержки (с 10:00 до 19:00 по будням):</p>
            <p>Москва и область 8 (495) 707‑90‑70 (Москва и область), 8 (800) 707‑90‑70 (остальные регионы).</p>
            <p>
                По другим проблемам напишите нам на <a href="mailto:support@ibt.ru">support@ibt.ru</a> или в онлайн-чат.
            </p>
        </div>
    </div>
</template>
<script>
import metaMixin from '@plugins/meta';

export default {
    name: 'info-pages-feedback',
    mixins: [metaMixin],

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    computed: {
        pageTitle() {
            return 'Обратная связь';
        },
    },
};
</script>
