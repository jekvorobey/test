export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_TAGS = 'activeTags';

export default {
    [FILTER_SEGMENTS](
        state,
        getters,
        {
            route: {
                params: { pathMatch },
            },
        }
    ) {
        if (pathMatch) return pathMatch.split('/');
        return [];
    },

    [ACTIVE_TAGS](state, getters) {
        const activeTags = [];
        const filters = state.filters.filter(f => f.type !== 'range');
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            for (let j = 0; j < filter.items.length; j++) {
                const item = filter.items[j];
                if (getters.filterSegments.includes(item.code)) activeTags.push(item);
            }
        }
        return activeTags;
    },
};
