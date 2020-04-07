<template>
    <section class="section custom-view">
        <div class="container">
            Типовая текстовая страница<br />
            <component
                v-for="renderItem in renderData"
                :key="renderItem.id"
                :is="renderItem.component"
                v-bind="renderItem.data"
            />
        </div>
    </section>
</template>

<script>
import SimpleTextWidget from '@components/widgets/SimpleTextWidget/SimpleTextWidget.vue';
import HtmlTextWidget from '@components/widgets/HtmlTextWidget/HtmlTextWidget.vue';
import PictureWidget from '@components/widgets/PictureWidget/PictureWidget.vue';

import widgetImage from '@images/mock/widgetImage.jpg';
import './Custom.css';

export default {
    name: 'custom',

    components: {
        SimpleTextWidget,
        HtmlTextWidget,
        PictureWidget,
    },

    computed: {
        renderData() {
            return [
                {
                    id: 1,
                    component: 'simple-text-widget',
                    data: {
                        content: `Эта страница создана для демонстрации блоков и элементов, которые используются на сайте, и служит руководством для всех, кто работает над ним.
                        Дизайнеры и технологи отрабатывают здесь стили, чтобы добиться приемлемых результатов в различных сочетаниях блоков и элементов.
                        Контент-менеджеры и редакторы используют страницу в качестве справочника по верстке типовых страниц.
                        Здесь же рассказывается о некоторых общих правилах оформления контента.`,
                    },
                },

                {
                    id: 2,
                    component: 'html-text-widget',
                    data: {
                        content: `<ul class="list">
                                    <li>
                                        линии очертания букв оставлялись, а всё остальное срезалось;
                                    </li>
                                    <li>
                                        в доске вглубь вырезалось очертание букв — тогда буквы при печатании выходили белыми, а всё
                                        остальное оставалось чёрным.
                                    </li>
                                </ul>`,
                    },
                },

                {
                    id: 3,
                    component: 'html-text-widget',
                    data: {
                        content: `<ol class="list">
                                    <li>
                                        линии очертания букв оставлялись, а всё остальное срезалось;
                                    </li>
                                    <li>
                                        в доске вглубь вырезалось очертание букв — тогда буквы при печатании выходили белыми, а всё
                                        остальное оставалось чёрным.
                                    </li>
                                </ol>`,
                    },
                },

                {
                    id: 4,
                    component: 'picture-widget',
                    data: {
                        content: widgetImage,
                    },
                },
            ];
        },
    },
};
</script>
