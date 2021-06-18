import { interval, cookieNames } from '@enums';
import { $dadata, $context, $cookie } from '@services';
import { storeErrorHandler } from '@util/store';

import { setCity } from '@api';
import { MUTATE_SELECTED_CITY } from './mutations';

const GET_SELECTED_CITY_BY_IP = 'GET_SELECTED_CITY_BY_IP';

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const SET_SELECTED_CITY_BY_IP = 'SET_SELECTED_CITY_BY_IP';

const defaultCity = {
    name: 'Москва',
    type: 'г',
    fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
    geo_lat: '55.7540471',
    geo_lon: '37.620405',
};

export default {
    async [SET_SELECTED_CITY]({ commit }, { city, setCookie = true }) {
        try {
            await setCity(city);
            commit(MUTATE_SELECTED_CITY, city);
            if (setCookie)
                $cookie.set(cookieNames.IBT_GEOLOCATION, JSON.stringify(city), {
                    maxAge: interval.WEEK / interval.SECOND,
                    path: '/',
                });
        } catch (error) {
            storeErrorHandler(SET_SELECTED_CITY)(error);
        }
    },

    async [GET_SELECTED_CITY_BY_IP](context, ip) {
        try {
            const { location } = await $dadata.get('/iplocate/address', {
                headers: { 'X-Forwarded-For': `${ip}` },
            });

            if (location) {
                const {
                    city,
                    city_type,
                    city_fias_id,
                    settlement,
                    settlement_type,
                    settlement_fias_id,
                    geo_lat,
                    geo_lon,
                } = location.data;

                return {
                    name: settlement || city,
                    type: settlement_type || city_type,
                    fias_id: settlement_fias_id || city_fias_id,
                    geo_lat,
                    geo_lon,
                };
            }
            return defaultCity;
        } catch (error) {
            storeErrorHandler(GET_SELECTED_CITY_BY_IP)(error);
            return defaultCity;
        }
    },

    async [SET_SELECTED_CITY_BY_IP]({ dispatch }) {
        try {
            let city = $cookie.get(cookieNames.IBT_GEOLOCATION);
            if (!city) {
                const ip = req.headers['x-forwarded-for'].split(',').pop() ||
                    req.connection.remoteAddress ||
                    $context.req.ip;
                console.log($context.req, ip);
                city = await dispatch(GET_SELECTED_CITY_BY_IP, ip);
            }

            await dispatch(SET_SELECTED_CITY, {
                city,
                setCookie: false,
            });
        } catch (error) {
            storeErrorHandler(SET_SELECTED_CITY_BY_IP)(error);
        }
    },
};
