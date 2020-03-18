import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'geolocation';
export const SELECTED_CITY = 'selectedCity';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [SELECTED_CITY]: {
                value: 'г Москва',
                unrestricted_value: '101000, г Москва',
                data: {
                    postal_code: '101000',
                    country: 'Россия',
                    country_iso_code: 'RU',
                    federal_district: 'Центральный',
                    region_fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                    region_kladr_id: '7700000000000',
                    region_iso_code: 'RU-MOW',
                    region_with_type: 'г Москва',
                    region_type: 'г',
                    region_type_full: 'город',
                    region: 'Москва',
                    area_fias_id: null,
                    area_kladr_id: null,
                    area_with_type: null,
                    area_type: null,
                    area_type_full: null,
                    area: null,
                    city_fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                    city_kladr_id: '7700000000000',
                    city_with_type: 'г Москва',
                    city_type: 'г',
                    city_type_full: 'город',
                    city: 'Москва',
                    city_area: null,
                    city_district_fias_id: null,
                    city_district_kladr_id: null,
                    city_district_with_type: null,
                    city_district_type: null,
                    city_district_type_full: null,
                    city_district: null,
                    settlement_fias_id: null,
                    settlement_kladr_id: null,
                    settlement_with_type: null,
                    settlement_type: null,
                    settlement_type_full: null,
                    settlement: null,
                    street_fias_id: null,
                    street_kladr_id: null,
                    street_with_type: null,
                    street_type: null,
                    street_type_full: null,
                    street: null,
                    house_fias_id: null,
                    house_kladr_id: null,
                    house_type: null,
                    house_type_full: null,
                    house: null,
                    block_type: null,
                    block_type_full: null,
                    block: null,
                    flat_type: null,
                    flat_type_full: null,
                    flat: null,
                    flat_area: null,
                    square_meter_price: null,
                    flat_price: null,
                    postal_box: null,
                    fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                    fias_code: '77000000000000000000000',
                    fias_level: '1',
                    fias_actuality_state: '0',
                    kladr_id: '7700000000000',
                    geoname_id: null,
                    capital_marker: '0',
                    okato: '45000000000',
                    oktmo: '45000000',
                    tax_office: '7700',
                    tax_office_legal: '7700',
                    timezone: null,
                    geo_lat: '55.7540471',
                    geo_lon: '37.620405',
                    beltway_hit: null,
                    beltway_distance: null,
                    metro: null,
                    qc_geo: '4',
                    qc_complete: null,
                    qc_house: null,
                    history_values: null,
                    unparsed_parts: null,
                    source: null,
                    qc: null,
                },
            },
        },
        actions,
        mutations,
        getters,
    };
}
