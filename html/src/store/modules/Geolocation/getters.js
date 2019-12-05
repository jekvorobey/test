export const SELECTED_CITY_COORDS = 'selectedCityCoords';

export default {
    [SELECTED_CITY_COORDS]: state => [Number(state.selectedCity.data.geo_lat), Number(state.selectedCity.data.geo_lon)],
};
