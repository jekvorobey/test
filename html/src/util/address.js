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

export default {
    toAddressString,
};
