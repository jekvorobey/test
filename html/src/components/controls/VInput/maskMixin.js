function maskit(value, mask, masked = true, tokens) {
    value = value || '';
    mask = mask || '';
    var iMask = 0;
    var iValue = 0;
    var output = '';
    while (iMask < mask.length && iValue < value.length) {
        var cMask = mask[iMask];
        var masker = tokens[cMask];
        var cValue = value[iValue];
        if (masker && !masker.escape) {
            if (masker.pattern.test(cValue)) {
                output += masker.transform ? masker.transform(cValue) : cValue;
                iMask++;
            }
            iValue++;
        } else {
            if (masker && masker.escape) {
                iMask++; // take the next mask char and treat it as char
                cMask = mask[iMask];
            }
            if (masked) output += cMask;
            if (cValue === cMask) iValue++; // user typed the same char
            iMask++;
        }
    }

    // fix mask that ends with a char: (#)
    var restOutput = '';
    while (iMask < mask.length && masked) {
        var cMask = mask[iMask];
        if (tokens[cMask]) {
            restOutput = '';
            break;
        }
        restOutput += cMask;
        iMask++;
    }

    return output + restOutput;
}

function dynamicMask(maskit, masks, tokens) {
    masks = masks.sort((a, b) => a.length - b.length);
    return function(value, mask, masked = true) {
        var i = 0;
        while (i < masks.length) {
            var currentMask = masks[i];
            i++;
            var nextMask = masks[i];
            if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
                return maskit(value, currentMask, masked, tokens);
            }
        }
        return ''; // empty masks
    };
}

function masker(value, mask, masked = true, tokens) {
    return Array.isArray(mask)
        ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens)
        : maskit(value, mask, masked, tokens);
}

export const tokens = {
    '#': { pattern: /\d/ },
    X: { pattern: /[0-9a-zA-Z]/ },
    S: { pattern: /[a-zA-Z]/ },
    A: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
    a: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
    '!': { escape: true },
};

// https://github.com/fernandofleury/vanilla-masker/blob/master/lib/vanilla-masker.js
// DIGIT = "9",
// ALPHA = "A",
// ALPHANUM = "S"

// https://github.com/niksmr/vue-masked-input
// 1 - number
// a - letter
// A - letter, forced to upper case when entered
// * - alphanumeric
// # - alphanumeric, forced to upper case when entered
// + - any character

// https://github.com/probil/v-mask
// #	Number (0-9)
// A	Letter in any case (a-z,A-Z)
// N	Number or letter
// X	Any symbol

// https://github.com/igorescobar/jQuery-Mask-Plugin/blob/master/src/jquery.mask.js#L518
// '0': {pattern: /\d/},
// '9': {pattern: /\d/, optional: true},
// '#': {pattern: /\d/, recursive: true},
// 'A': {pattern: /[a-zA-Z0-9]/},
// 'S': {pattern: /[a-zA-Z]/}

// https://github.com/the-darc/string-mask
// 0	Any numbers
// 9	Any numbers (Optional)
// #	Any numbers (recursive)
// A	Any alphanumeric character
// a	Any alphanumeric character (Optional) Not implemented yet
// S	Any letter
// U	Any letter (All lower case character will be mapped to uppercase)
// L	Any letter (All upper case character will be mapped to lowercase)
// $	Escape character, used to escape any of the special formatting characters.

export default {
    props: {
        displayValue: String,
        value: [String, Number],
        mask: {
            type: [String, Array],
            required: true,
        },
        masked: {
            // by default emits the value unformatted, change to true to format with the mask
            type: Boolean,
            default: false, // raw
        },
        tokens: {
            type: Object,
            default: () => tokens,
        },
    },

    data() {
        return {
            lastValue: null, // avoid unecessary emit when has no change
        };
    },

    watch: {
        display(value) {
            this.$emit('update:displayValue', value);
        },

        masked() {
            this.refresh(this.display);
        },
    },

    computed: {
        config() {
            return {
                mask: this.mask,
                tokens: this.tokens,
                masked: this.masked,
            };
        },

        display() {
            return masker(this.value, this.mask, this.masked, this.tokens);
        },
    },

    methods: {
        input(e) {
            this.refresh(e.target.value);
        },

        refresh(value) {
            const maskedValue = masker(value, this.mask, false, this.tokens);
            if (maskedValue !== this.lastValue) {
                this.lastValue = maskedValue;
                this.$emit('input', maskedValue);
            }
            this.$forceUpdate();
        },
    },
};
