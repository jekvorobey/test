<template>
    <header class="header">
        <div class="container">
            <nav class="inner">
                <router-link to="/" exact>
                    <img class="logo" src="~images_path/icons/logo-48.png" alt="logo" />
                </router-link>
                <router-link to="/top">Top</router-link>
                <router-link to="/new">New</router-link>
                <router-link to="/show">Show</router-link>
                <router-link to="/ask">Ask</router-link>
                <router-link to="/job">Jobs</router-link>
                <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
                    Built with Vue.js
                </a>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'layout-header',
};
</script>

<style lang="postcss">
.header {
    .logo {
        width: 24px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
    }
}
</style>
<style src="./critical.css" />
