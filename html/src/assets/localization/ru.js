import flatPickrAll from 'flatpickr/dist/l10n';

export const flatpickrLocale = flatPickrAll.ru;
export default {
    header: {
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
