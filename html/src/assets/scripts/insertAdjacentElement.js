/**
 * insertAdjacentElement для SVGElement (IE 11, Edge)
 */

if (typeof document !== 'undefined' && !SVGElement.prototype.insertAdjacentElement) {
    function insertAdjacentElement(position, node) {
        const ref = this;
        const container = ref.ownerDocument.createElementNS('http://www.w3.org/2000/svg', '_');
        const ref_parent = ref.parentNode;
        let first_child;
        let next_sibling;

        switch (position.toLowerCase()) {
            case 'beforebegin':
                while ((node = container.firstChild)) {
                    ref_parent.insertBefore(node, ref);
                }
                break;
            case 'afterbegin':
                first_child = ref.firstChild;
                while ((node = container.lastChild)) {
                    first_child = ref.insertBefore(node, first_child);
                }
                break;
            case 'beforeend':
                while ((node = container.firstChild)) {
                    ref.appendChild(node);
                }
                break;
            case 'afterend':
                next_sibling = ref.nextSibling;
                while ((node = container.lastChild)) {
                    next_sibling = ref_parent.insertBefore(node, next_sibling);
                }
                break;
        }
    }

    SVGElement.prototype.insertAdjacentElement = insertAdjacentElement;
}
