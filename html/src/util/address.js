function append(base, value, withDelimiter, delimiter) {
    if (value) return (base += formatSegment(value, withDelimiter, delimiter));
    return base;
}

function formatSegment(value, withDelimiter = true, delimiter = ', ') {
    return withDelimiter ? `${value}${delimiter}` : value;
}

export function toAddressString(address = {}) {
    const { area, city, flat, block, floor, house, porch, region, street } = address;

    let addressString = '';
    addressString = append(addressString, region);
    addressString = append(addressString, area);
    addressString = append(addressString, city);
    addressString = append(addressString, street);
    addressString = append(addressString, house, block);
    addressString = append(addressString, block, false);

    return addressString;
}
