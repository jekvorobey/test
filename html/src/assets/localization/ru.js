import flatPickrRu from 'flatpickr/dist/l10n/ru';
import { receiveMethods } from '../scripts/enums/checkout';
import { genderType } from '../scripts/enums/profile';
import { socials } from '../scripts/enums/general';
import { orderStatus } from '../scripts/enums/order';

const flatpickrLocale = flatPickrRu.ru;
const main = {
    header: {
        top: {
            delivery: 'Доставка по всей России',
            benefits: 'Более 1000 товаров для профессионалов',
            gifts: 'Бонусы с каждой покупки',
            help: 'Помощь',
        },

        middle: {
            search: 'Искать...',
            professionals: 'Mаркетплейс только для профессионалов бьюти-индустрии',
        },
    },

    footer: {
        links: {
            purchase: 'Как купить',
            payment: 'Оплата и доставка',
            refund: 'Возврат товара',
            guarantee: 'Гарантии',
            qna: 'Вопросы и ответы',
            about_company: 'О компании',
            about_us: 'О нас',
            partners: 'Партнерам',
            feedback: 'Обратная связь',
            vacancy: 'Вакансии',
        },

        made_by: 'Сделано в Гринсайте',
        rights: '© 2019 «Бессовестно Талантливый»',
        terms_of_use: 'Пользовательское соглашение',
        offer: 'Оферта',
    },

    socials: {
        socials: 'Подпишись на нас в соц. сетях',
        facebook: 'Facebook',
        vkontakte: 'ВКонтакте',
        twitter: 'Twitter',
        ok: 'Однокласники',
        youtube: 'Youtube',
        instagram: 'Instagram',
    },

    validation: {
        errors: {
            required: 'Обязательное поле',
            email: 'Формат name@domain.com',
        },
    },

    deliveryMethod: {
        [receiveMethods.DELIVERY]: 'Доставка курьером',
        [receiveMethods.EXPRESS]: 'Экспресс доставка',
        [receiveMethods.PICKUP]: 'Самовывоз',
    },

    genderType: {
        [genderType.FEMALE]: 'Женский',
        [genderType.MALE]: 'Мужской',
    },

    landing: {
        showAll: 'Смотреть все',
        subscribe: 'Подписаться на нас',

        title: {
            new: 'Новинки',
            bestseller: 'Бестселлеры',
            featured: 'Смотрят на сайте сейчас',
            brand: 'Популярные бренды',
            instagram: 'Instabeauty',
        },

        brands: {
            showAll: 'Показать все',
        },
    },

    product: {
        vendorCode: 'Артикул {code}',
        review: '{n} отзывов',
        bonus: '{n} бонусов',
        showAll: 'Смотреть все',

        title: {
            masterClasses: 'Мастер-классы с этим продуктом',
            characteristics: 'Характеристики',
            reviews: 'Отзывы',
            method: 'Способ применения',
            description: 'Описание',
            profitable: 'Выгодный комплект',
            compilations: 'Этот товар в подборках',
            like: 'Вам также могут понравиться',
            instagram: 'Instabeauty',
            history: 'Вы смотрели',
        },

        reviews: {
            showAll: 'Показать ещё',
            averageRating: 'Средняя оценка',
            makeReview: 'Написать отзыв',
        },
    },

    productGroups: {
        title: {
            catalog: 'Каталог',
            new: 'Новинки',
            promo: 'Акции',
            sets: 'Подборки товаров',
            brands: 'Бренды',
            masterclasses: 'Мастер-классы',
        },

        links: {
            catalog: 'Каталог',
            new: 'Новинки',
            promo: 'Акции',
            sets: 'Подборки',
            brands: 'Бренды',
            masterclasses: 'Мастер-классы',
        },
    },

    cart: {
        title: {
            like: 'Вам также могут понравиться',
            product: 'Продукты',
            masterclass: 'Мастер-классы',
        },

        items: '0 товаров | {n} товар | {n} товаров',

        summary: {
            type: {
                product: 'Продукты',
                masterclass: 'Мастер-классы',
            },
        },
    },

    profile: {
        format: {
            order: 'Заказ №{id}',
            messages: 'Сообщения ({n})',
            referal: 'Реферал №{id}',
            orderStatus: {
                [orderStatus.CREATED]: 'Создан',
                [orderStatus.AWAITING_CHECK]: 'Ожидает подтверждения',
                [orderStatus.IN_PROCESSING]: 'В обработке',
                [orderStatus.CHECKING]: 'Проверка',
                [orderStatus.TRANSFERRED_TO_DELIVERY]: 'Передан на доставку',
                [orderStatus.DELIVERING]: 'В процессе доставки',
                [orderStatus.READY_FOR_RECIPIENT]: 'В пункте выдачи',
                [orderStatus.DONE]: 'Доставлен',
                [orderStatus.RETURNED]: 'Возвращен',
                [orderStatus.PRE_ORDER]: 'Предзаказ',
            },
        },

        groups: {
            profile: 'Личный кабинет',
            business: 'Мой бизнес',
            training: 'Обучение',
        },

        socials: {
            [socials.VKONTAKTE]: 'VKontakte',
            [socials.TWITTER]: 'Twitter',
            [socials.INSTAGRAM]: 'Instagram',
            [socials.FACEBOOK]: 'Facebook',
            [socials.GOOGLE]: 'Google',
        },

        routes: {
            Cabinet: 'Личный кабинет',
            Preferences: 'Мои предпочтения',
            Addresses: 'Адреса доставки',
            Payment: 'Способы оплаты',
            Subscribes: 'Подписки',
            Messages: 'Сообщения',
            MessageDetails: 'Сообщения',
            Certificates: 'Подарочные сертификаты',
            Bonuses: 'Бонусная программа',
            Orders: 'Мои Заказы',
            OrderDetails: 'Мои Заказы',
            ReferalOrders: 'Реферальные заказы',
            ReferalOrderDetails: 'Реферальные заказы',

            Referal: 'Реферальная программа',
            ProPreferences: 'Мои профессиональные предпочтения',
            Promopage: 'Моя промостраница',
            Seo: 'Товары для продвижения',
            Promocodes: 'Мои промокоды',
            Account: 'Мой счет',
            Billing: 'Биллинг по счету',
            Documents: 'Мои документы',

            HowItWorks: 'Как работать с платформой',
            Guides: 'Гиды по продуктам',
            GuideDetails: 'Гиды по продуктам',
            Masterclasses: 'Мои мастер-классы',
            QnA: 'Вопросы и ответы',
        },
    },
};

const LOCALE = 'ru';
export default { main, flatpickrLocale, LOCALE };
