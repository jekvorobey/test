<template>
    <section class="section custom-view">
        <component
            v-for="renderItem in renderData"
            :key="renderItem.id"
            :is="renderItem.component"
            v-bind="renderItem.data"
        />
    </section>
</template>

<script>
import Vue from 'vue';
import SimpleTextWidget from '@components/widgets/SimpleTextWidget/SimpleTextWidget.vue';
import HtmlTextWidget from '@components/widgets/HtmlTextWidget/HtmlTextWidget.vue';
import PictureWidget from '@components/widgets/PictureWidget/PictureWidget.vue';
import SectionWidget from '@components/widgets/SectionWidget/SectionWidget.vue';

import widgetImage from '@images/mock/widgetImage.jpg';
import catalogBanner from '@images/mock/catalogBanner2.jpg';

import './Custom.css';

Vue.component(SimpleTextWidget.name, SimpleTextWidget);
Vue.component(HtmlTextWidget.name, HtmlTextWidget);
Vue.component(PictureWidget.name, PictureWidget);
Vue.component(SectionWidget.name, SectionWidget);

export default {
    name: 'custom',
    components: {
        SectionWidget,
    },

    computed: {
        renderData() {
            return [
                {
                    id: 1,
                    component: 'section-widget',
                    data: {
                        tag: 'h3',
                        title: 'Заголовок H2',
                        children: [
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
                                component: 'picture-widget',
                                data: {
                                    content: widgetImage,
                                },
                            },
                            {
                                id: 4,
                                component: 'picture-widget',
                                data: {
                                    content: catalogBanner,
                                },
                            },
                        ]
                    }
                }
            ]
        },
    },
};
</script>
