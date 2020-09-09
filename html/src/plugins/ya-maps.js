import Vue from 'vue';
import YmapPlugin from '@controls/VMap';
import { yaMapSettings } from '@settings';

if (typeof window !== 'undefined') {
    Vue.use(YmapPlugin, yaMapSettings);
}
