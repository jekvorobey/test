import flatPickrAll from 'flatpickr/dist/l10n';

export const flatpickrLocale = flatPickrAll.ru;
export default {
    header: {
        top: {
            delivery: 'Доставка по всей России',
            benefits: 'Более 1000 товаров для профессионалов',
            gifts: 'Бонусы с каждой покупки',
            help: 'Помощь',
        },
        middle: {
            search: 'Искать...',
            platform: 'онлайн-платформа',
            professionals: 'Для профессионалов <br /> бьюти-индустрии',
            free_delivery: 'До бесплатной доставки — {n} ₽',
        },
        links: {
            new: 'Новинки',
            stocks: 'Акции',
            collections: 'Подборки',
            brands: 'Бренды',
            classes: 'Мастер-классы',
        },
    },

    validation: {
        errors: {
            required: 'Обязательное поле',
            email: 'Формат name@domain.com',
        },
    },
};
