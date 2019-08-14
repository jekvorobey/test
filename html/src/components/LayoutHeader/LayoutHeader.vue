<template>
    <header class="header">
        <div class="header__top">
            <div class="container"></div>
        </div>
        <div class="header__middle">
            <div class="container">
                <nav class="header__middle-inner">
                    <v-link class="header__middle-link" to="/top">{{ $t('header.links.new') }}</v-link>
                    <v-link class="header__middle-link" to="/new">{{ $t('header.links.stocks') }}</v-link>
                    <v-link class="header__middle-link" to="/show">{{ $t('header.links.collections') }}</v-link>
                    <v-link class="header__middle-link" to="/ask">{{ $t('header.links.brands') }}</v-link>
                    <v-link class="header__middle-link" to="/job">{{ $t('header.links.classes') }}</v-link>
                    <v-link class="header__middle-link" to="/ui-kit">ui-kit</v-link>
                </nav>
            </div>
        </div>
        <div class="header__bottom">
            <div class="container"></div>
        </div>
    </header>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';

export default {
    name: 'layout-header',
    components: {
        VLink,
    },
};
</script>

<style src="./critical.css"></style>
<style lang="postcss">
.header {
}
</style>

