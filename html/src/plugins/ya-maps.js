import Vue from 'vue';
import YmapPlugin from '@controls/VMap';

if (typeof window !== 'undefined') {
    const settings = {
        apiKey: '46c69919-a571-416e-8198-189ed26c6a79',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
    };

    Vue.use(YmapPlugin, settings);
}
