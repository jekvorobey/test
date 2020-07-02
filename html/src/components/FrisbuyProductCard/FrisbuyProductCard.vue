<template>
    <div id="frisbuy-widget2"></div>
</template>
<script>
export default {
    name: 'frisbuy-product-card',

    props: {
        offerId: {
            type: Number,
        },
    },

    methods: {
        init(offerId) {
            (window.frisbuy = window.frisbuy || {}),
                (window.frisbuy.log = function(t, e, i) {
                    var o = localStorage.getItem('frb.log.heap');
                    (o = (o && JSON.parse(o)) || []),
                        o.push({ msg: t, name: e, severity: i, time: Date.now() }),
                        localStorage.setItem('frb.log.heap', JSON.stringify(o));
                }),
                (window.frisbuy.loadScript = function(t, e, i) {
                    var o = 0,
                        r = function(n) {
                            var a = document.createElement('script');
                            n && frisbuy.log({ url: t, attemptLimit: o }, 'load.widget', 'high'),
                                o >= e ||
                                    (i && (a.onload = i),
                                    (a.onerror = r),
                                    (a.src = t),
                                    setTimeout(function() {
                                        document.head.appendChild(a);
                                    }, 15 * Math.pow(10, o) * o),
                                    o++);
                        };
                    (e = e || 3), r();
                }),
                frisbuy.loadScript(
                    `https://www.frisbuy.ru/fb/widget?embed_id=e9575241-9f3d-11ea-ba01-0242ac150002&sku=${offerId}`
                );
        },
    },
    mounted() {
        this.init(this.offerId);
    },
};
</script>