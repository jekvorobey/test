<template>
    <div class="university-social">
        <div class="university-social__title">Университет в соцсетях:</div>
        <div class="university-social__links">
            <v-link
                    class="mobile-menu__menu-socials-icon"
                    href="https://vk.com/public214714929"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
            >
                <v-svg name="vkontakte" width="24" height="24" />
            </v-link>
            <v-link
                    class="mobile-menu__menu-socials-icon"
                    href="https://t.me/bt_education"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
            >
                <v-svg name="telegram" width="24" height="24" />
            </v-link>
        </div>
    </div>
</template>

<script>
    import './UniversitySocials.css'

    import VLink from "@controls/VLink/VLink.vue";
    import VSvg from "@controls/VSvg/VSvg.vue";

    import '@images/sprites/socials/vkontakte.svg';
    import '@images/sprites/socials/telegram.svg';
    export default {
        name: "UniversitySocials",
        components: { VLink, VSvg,}
    }
</script>
