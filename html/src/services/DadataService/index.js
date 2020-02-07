import { suggestionTypes } from '../../assets/scripts/enums';
import DadataHttpService from '../HttpService/DadataHttpService';

/**
 * Service для Dadata
 */
export default class DaDataService {
    constructor() {
        this.http = new DadataHttpService();
    }

    /**
     *  Найти адрес по типу и query
     * @param {String} type
     * @param {*} query
     */
    findAddress(type, query) {
        let to;
        switch (type) {
            case suggestionTypes.REGION:
                to = 'area';
                break;
            case suggestionTypes.CITY:
                to = 'settlement';
                break;
            case suggestionTypes.HOUSE:
                to = undefined;
                break;
            default:
                to = type;
        }
        return this.http
            .post('/suggest/address', {
                query,
                count: 20,
                from_bound: { value: type },
                to_bound: { value: to },
            })
            .then(result => {
                return result.suggestions;
            });
    }
}
