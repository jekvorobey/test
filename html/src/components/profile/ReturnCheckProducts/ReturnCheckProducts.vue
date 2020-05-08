<template>
    <div class="return-product-check">
        Следующий шаг
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE } from '@store/modules/Profile/modules/ReturnPage';

import './ReturnCheckProducts.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return-product-check',
};
</script>
