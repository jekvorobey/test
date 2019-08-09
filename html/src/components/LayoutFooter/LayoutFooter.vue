<template>
    <footer class="footer">
        <div class="container">
            <nav class="inner">
                <router-link to="/top">Top</router-link>
                <router-link to="/new">New</router-link>
                <router-link to="/show">Show</router-link>
                <router-link to="/ask">Ask</router-link>
                <router-link to="/job">Jobs</router-link>
            </nav>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'layout-footer',
};
</script>

<style lang="postcss">
.footer {
    background-color: var(--cl-orange);
    position: fixed;
    z-index: 999;
    min-height: 55px;
    bottom: 0;
    left: 0;
    right: 0;

    .inner {
        box-sizing: border-box;
        margin: 0 auto;
        padding: 15px 5px;
    }

    a {
        color: rgba(255, 255, 255, 0.8);
        line-height: 24px;
        transition: color 0.15s ease;
        display: inline-block;
        vertical-align: middle;
        font-weight: 300;
        letter-spacing: 0.075em;
        margin-right: 1.8em;

        &:hover {
            color: var(--cl-white);
        }

        &.router-link-active {
            color: var(--cl-white);
            font-weight: 400;
        }

        &:nth-child(6) {
            margin-right: 0;
        }
    }
}
</style>


