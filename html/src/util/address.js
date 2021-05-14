function append(base, value, withDelimiter, delimiter) {
    if (value) base += formatSegment(value, withDelimiter, delimiter);
    return base;
}

function formatSegment(value, withDelimiter = true, delimiter = ', ') {
    return withDelimiter ? `${value}${delimiter}` : value;
}

export function toAddressString(address = {}) {
    const { area, city, block, house, region, street } = address;

    let addressString = '';
    addressString = append(addressString, region);
    addressString = append(addressString, area);
    if (city !== region) addressString = append(addressString, city);
    addressString = append(addressString, street);
    // Избавляемся от случаев, когда block не указан, и нам не нужна
    // запятая в конце номера дома
    addressString = append(addressString, house, block || false);
    addressString = append(addressString, block, false);

    return addressString;
}

export function toPointAddressString(address = {}) {
    const { area, city, city_type, block, house, region, region_type, street, street_type } = address;

    let addressString = '';
    addressString = append(addressString, region, true, ' ');
    addressString = append(addressString, region_type);
    if (area !== region + ' ' + region_type) addressString = append(addressString, area);
    if (city !== region) {
        addressString = append(addressString, city_type, true, ' ');
        addressString = append(addressString, city);
    }
    addressString = append(addressString, street_type, true, ' ');
    addressString = append(addressString, street);
    // Избавляемся от случаев, когда block не указан, и нам не нужна
    // запятая в конце номера дома
    addressString = append(addressString, house, block || false);
    addressString = append(addressString, block, false);

    return addressString;
}

export default {
    toAddressString,
};
