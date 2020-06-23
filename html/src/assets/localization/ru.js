import flatPickrRu from 'flatpickr/dist/l10n/ru';
import { socials } from '@enums';
import { receiveMethods, discountType } from '@enums/checkout';
import { genderType, billingOperationType, referralSource, bonusStatus } from '@enums/profile';
import { orderStatus, deliveryStatus } from '@enums/order';

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
        rights: '© 2020 «Бессовестно Талантливый»',
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

    billingOperationType: {
        [billingOperationType.EARNING]: 'Начисление',
        [billingOperationType.PAYMENT]: 'Оплата',
        [billingOperationType.REFUND]: 'Возврат',
        [billingOperationType.WITHDRAW]: 'Вывод средств',
        [billingOperationType.ADJUSTMENT]: 'Корректировка',
    },

    orderStatus: {
        [orderStatus.PRE_ORDER]: 'Предзаказ: ожидаем поступления товара',
        [orderStatus.CREATED]: 'Оформлен',
        [orderStatus.AWAITING_CHECK]: 'В обработке',
        [orderStatus.CHECKING]: 'В обработке',
        [orderStatus.AWAITING_CONFIRMATION]: 'В обработке',
        [orderStatus.IN_PROCESSING]: 'В обработке',
        [orderStatus.TRANSFERRED_TO_DELIVERY]: 'В обработке',
        [orderStatus.DELIVERING]: 'В процессе доставки',
        [orderStatus.READY_FOR_RECIPIENT]: 'В пункте выдачи',
        [orderStatus.DONE]: 'Доставлен',
        [orderStatus.RETURNED]: 'Возвращен',
    },

    deliveryStatus: {
        [deliveryStatus.STATUS_CREATED]: 'Оформляется',

        [deliveryStatus.STATUS_ON_POINT_IN]: 'Принят на склад в пункте отправления',
        [deliveryStatus.STATUS_ON_WAY]: 'В пути',
        [deliveryStatus.STATUS_ON_POINT_OUT]: 'Прибыл на склад в пункте назначения',
        [deliveryStatus.STATUS_DELIVERING]: 'Передана на доставку в пункте назначения',
        [deliveryStatus.STATUS_READY_FOR_RECIPIENT]: 'Готов к выдаче в пункте назначения',
        [deliveryStatus.STATUS_DONE]: 'Доставлено',

        [deliveryStatus.STATUS_RETURNED_FROM_DELIVERY]: 'Возвращен с доставки',
        [deliveryStatus.STATUS_PARTIAL_RETURN]: 'Частичный возврат',
        [deliveryStatus.STATUS_RETURN_READY]: 'Подготовлен возврат',
        [deliveryStatus.STATUS_RETURNING]: 'Возвращается отправителю',
        [deliveryStatus.STATUS_RETURNED]: 'Возвращен отправителю',

        [deliveryStatus.STATUS_LOST]: 'Утеряна',
        [deliveryStatus.STATUS_PROBLEM]: 'Возникла проблема',
        [deliveryStatus.STATUS_CANCEL]: 'Отменена',

        [deliveryStatus.STATUS_UNKNOWN]: 'Неизвестный статус',
        [deliveryStatus.STATUS_NA]: 'n/a',
    },

    deliveryMethod: {
        [receiveMethods.DELIVERY]: 'Доставка курьером',
        [receiveMethods.PICKUP]: 'Доставка в ПВЗ',
        [receiveMethods.EXPRESS]: 'Экспресс доставка',
    },

    referralSource: {
        [referralSource.PROMOCODE]: 'Промокод',
        [referralSource.LINK]: 'Реферальная ссылка',
    },

    genderType: {
        [genderType.FEMALE]: 'Женский',
        [genderType.MALE]: 'Мужской',
    },

    bonusStatus: {
        [bonusStatus.DELAYED]: 'На удержании',
        [bonusStatus.ACTIVE]: 'Активный',
        [bonusStatus.FINISHED]: 'Завершен',
        [bonusStatus.TAKEN]: 'Cписание',
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
        variants: 'Нет вариантов | {n} вариант | {n} вариантов',
        showAll: 'Смотреть все',

        deliveryMethod: {
            [receiveMethods.DELIVERY]: 'Доставка курьером',
            [receiveMethods.PICKUP]: ['Из пунктов', 'выдачи'],
            [receiveMethods.EXPRESS]: 'Экспресс доставка курьером',
        },

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

            discount: {
                [discountType.PRODUCT]: 'Скидка на товар',
                [discountType.DELIVERY]: 'Скидка на доставку',
                [discountType.CART]: 'Скидка на корзину',
                [discountType.CUSTOM]: 'Скидка для Вас',
                [discountType.PROMOCODE]: 'Скидка по промокоду',
            },
        },
    },

    profile: {
        format: {
            order: 'Заказ №{id}',
            messages: 'Сообщения ({n})',
            referal: 'Реферал №{id}',
            packageCount: '{n} шт.',
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
            Cabinet: 'Личные данные',
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
            ReferalOrderDetails: 'Реферальные заказы',

            Referal: 'Реферальная программа',
            ProPreferences: 'Мои профессиональные предпочтения',
            Promopage: 'Моя промостраница',
            Seo: 'Товары для продвижения',
            Promocodes: 'Мои промокоды',
            Account: 'Мой счет',
            Documents: 'Мои документы',

            HowItWorks: 'Как работать с платформой',
            Guides: 'Гиды по продуктам',
            GuideDetails: 'Гиды по продуктам',
            Masterclasses: 'Мои мастер-классы',
            QnA: 'Вопросы и ответы',

            ReturnPage: 'Возврат',
        },
    },

    masterclasses: {
        title: 'Мастер-классы',
    },
};

const LOCALE = 'ru';
export default { main, flatpickrLocale, LOCALE };
