/**
 * https://www.npmjs.com/package/vue-meta-info
 */

const VUE_META_KEY_NAME = 'metaInfo';
const VUE_META_ATTRIBUTE = 'data-vue-meta-info';

function _insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function _removeNode(parent) {
    let childs = parent.querySelectorAll(`[${VUE_META_ATTRIBUTE}]`);
    for (let i = childs.length - 1; i > -1; i--) parent.removeChild(childs[i]);
}

function _setAttr(el, opt) {
    el.setAttribute(VUE_META_ATTRIBUTE, '');
    // eslint-disable-next-line
    for (const key in opt) el.setAttribute(key, opt[key]);
}

function updateMetaInfo(opts) {
    operate().removeMetaInfo();
    operate().setMetaInfo(opts);
}

function renderServerMetaInfo(context, metaInfo) {
    if (context && metaInfo) {
        if (metaInfo.title) context.title = metaInfo.title;

        Object.keys(metaInfo).forEach((info) => {
            if (info === 'title') return;

            context.render[info] = function () {
                let metaNd = '';
                if (metaInfo[info]) {
                    metaInfo[info].forEach((item) => {
                        const attrs = Object.keys(item).map((key) => `${key}="${item[key]}"`);
                        const str = `<${info} data-vue-meta-info ${attrs.join(' ')} />`;
                        metaNd += str;
                    });
                }
                return metaNd;
            };
        });
    }
}

function operate() {
    const _ndHead = document.getElementsByTagName('head')[0];
    const _title = document.getElementsByTagName('title')[0];

    return {
        setMetaInfo(metaOpts) {
            let afterTag = _title;

            // eslint-disable-next-line
            for (const key in metaOpts) {
                if (key === 'title') {
                    document.title = metaOpts.title;
                    // eslint-disable-next-line
                    continue;
                }

                // eslint-disable-next-line
                if (metaOpts.hasOwnProperty(key)) {
                    metaOpts[key].forEach((opt) => {
                        const ndKey = document.createElement(key);
                        _setAttr(ndKey, opt);
                        _insertAfter(ndKey, afterTag);
                        afterTag = ndKey;
                    });
                }
            }
        },

        removeMetaInfo() {
            _removeNode(_ndHead);
        },
    };
}

const mixin = {
    beforeCreate() {
        if (this.$options[VUE_META_KEY_NAME] !== undefined) {
            const type = typeof this.$options[VUE_META_KEY_NAME];

            this._hasMetaInfo = true;

            if (typeof this.$options.computed === 'undefined') this.$options.computed = {};
            this.$options.computed.$metaInfo =
                type === 'function' ? this.$options[VUE_META_KEY_NAME] : () => this.$options[VUE_META_KEY_NAME];
        }
    },

    created() {
        if (this.$isServer) renderServerMetaInfo(this.$ssrContext, this.$metaInfo);
    },

    beforeMount() {
        if (this._hasMetaInfo) updateMetaInfo(this.$metaInfo);
    },

    mounted() {
        if (this._hasMetaInfo)
            this.$watch('$metaInfo', () => {
                updateMetaInfo(this.$metaInfo);
            });
    },

    activated() {
        if (this._hasMetaInfo) updateMetaInfo(this.$metaInfo); // keep-alive
    },

    deactivated() {
        if (this._hasMetaInfo) updateMetaInfo(this.$metaInfo); // keep-alive
    },
};

export default mixin;
