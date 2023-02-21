import flatPickrRu from 'flatpickr/dist/l10n/ru';
import { socials, weekDays } from '@enums';
import { receiveMethods, discountType } from '@enums/checkout';
import { genderType, billingOperationType, referralSource, bonusStatus, preferenceEntityTypes } from '@enums/profile';
import { orderStatus, deliveryStatus } from '@enums/order';
import { cartItemTypes } from '@enums/product';
import { cartErrors, cartWarnings } from '@enums/cart';

const flatpickrLocale = flatPickrRu.ru;
const main = {
    weekdays: {
        long: {
            [weekDays.SUNDAY]: 'воскресенье',
            [weekDays.MONDAY]: 'понедельник',
            [weekDays.TUESDAY]: 'вторник',
            [weekDays.WEDNESDAY]: 'среда',
            [weekDays.THURSDAY]: 'четверг',
            [weekDays.FRIDAY]: 'пятница',
            [weekDays.SATURDAY]: 'суббота',
        },

        short: {
            [weekDays.SUNDAY]: 'вс',
            [weekDays.MONDAY]: 'пн',
            [weekDays.TUESDAY]: 'вт',
            [weekDays.WEDNESDAY]: 'ср',
            [weekDays.THURSDAY]: 'чт',
            [weekDays.FRIDAY]: 'пт',
            [weekDays.SATURDAY]: 'сб',
        },
    },

    header: {
        top: {
            delivery: 'Доставка по всей России',
            benefits: 'Тысячи товаров от официальных поставщиков',
            gifts: 'Бонусы за покупки',
            help: 'Помощь',
        },

        middle: {
            search: 'Искать...',
            professionals: 'Mаркетплейс для мастеров бьюти-индустрии',
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
        rights: `© ${new Date().getFullYear()} «Бессовестно Талантливый»`,
        terms_of_use: 'Пользовательское соглашение',
        offer: 'Оферта',
    },

    socials: {
        socials: 'Подпишись на нас в соцсетях',
        facebook: 'Facebook',
        vkontakte: 'ВКонтакте',
        twitter: 'Twitter',
        ok: 'Однокласники',
        youtube: 'Youtube',
        instagram: 'Instagram',
        telegram: 'Телеграм',
        dzen: 'Дзен',
    },

    validation: {
        errors: {
            required: 'Обязательное поле',
            email: 'Формат name@domain.com',

            promocodeInvalid: 'Промокод недействителен',
            promocodeNotExist: 'Промокод не существует',
        },

        cart: {
            [cartErrors.PRODUCT_INACTIVE]: 'Некоторые товары стали архивными или остаток равен 0',
            [cartErrors.BUNDLE_INACTIVE]: 'Некоторые бандлы стали неактивными',
            [cartErrors.BUNDLE_PRODUCT_STOCKS]:
                'Суммарное количество товаров и товаров в бандлах превышает количество остатков по товару',
            [cartErrors.PRODUCT_FOR_PROFESSIONAL]:
                'Некоторые товары доступны для покупки только после модерации профиля пользователя',
            [cartErrors.BUNDLE_MASTERCLASS_STOCKS]:
                'Суммарное количество одиночных билетов и билетов в бандлах превышает количество остатков билетов',
            [cartErrors.MASTERCLASS_STOCKS]: 'Некоторые билеты стали неактивными',

            [cartWarnings.PRODUCT_COUNT_CHANGE]: 'Предупреждение об изменении количества товара',
            [cartWarnings.BUNDLE_DELETED]: 'Предупреждение об удалении бандла из корзины',
            [cartWarnings.PRODUCT_ADD_COUNT_CHANGE]: 'Предупреждение об изменении количества товара при добавлении',
            [cartWarnings.MASTERCLASS_COUNT_CHANGE]: 'Предупреждение об изменении количества мастерклассов',
            [cartWarnings.MASTERCLASS_ADD_COUNT_CHANGE]:
                'Предупреждение об изменении количества мастерклассов при добавлении',
        },
    },

    billingOperationType: {
        [billingOperationType.EARNING]: 'Начисление',
        [billingOperationType.PAYMENT]: 'Оплата',
        [billingOperationType.REFUND]: 'Возврат',
        [billingOperationType.WITHDRAWTOCARD]: 'Вывод средств на карту',
        [billingOperationType.ADJUSTMENT]: 'Корректировка',
        [billingOperationType.WITHDRAWTOACCOUNT]: 'Вывод средств на счёт',
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
        [orderStatus.CANCELED]: 'Отменен',
        [orderStatus.PARTIALLY_CANCELED]: 'Частично отменен',
    },

    deliveryStatus: {
        [deliveryStatus.STATUS_WAITING_TO_ARRIVE]: 'Предзаказ: ожидаем поступления товара',

        [deliveryStatus.STATUS_CREATED]: 'Оформляется',
        [deliveryStatus.STATUS_WAITING_AOZ_INSPECTION]: 'В обработке',
        [deliveryStatus.STATUS_AOZ_INSPECTION]: 'В обработке',
        [deliveryStatus.STATUS_WAITING_MERCHANT_CONFIRM]: 'В обработке',
        [deliveryStatus.STATUS_PACKAGE]: 'На комплектации',
        [deliveryStatus.STATUS_READY_TO_SHIP]: 'Готова к отгрузке',
        [deliveryStatus.STATUS_AT_LOGISTIC_OPERATOR]: 'Передана логистическому оператору',

        [deliveryStatus.STATUS_ON_POINT_IN]: 'Принят на склад в пункте отправления',
        [deliveryStatus.STATUS_ON_WAY]: 'В пути',
        [deliveryStatus.STATUS_ON_POINT_OUT]: 'Прибыл на склад в пункте назначения',
        [deliveryStatus.STATUS_DELIVERING]: 'Передана на доставку в пункте назначения',
        [deliveryStatus.STATUS_READY_FOR_RECIPIENT]: 'Готов к выдаче в пункте назначения',
        [deliveryStatus.STATUS_DONE]: 'Доставлено',

        [deliveryStatus.STATUS_RETURNED_FROM_DELIVERY]: 'Возвращена с доставки',
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
        [genderType.NOT_SPECIFIED]: 'Не скажу',
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
        vendorCode: 'Артикул',
        review: 'отзывов',
        bonus: '{n} бонусов',
        variants: 'Нет вариантов | {n} вариант | {n} вариантов',
        showAll: 'Смотреть все',

        deliveryMethod: {
            [receiveMethods.DELIVERY]: 'Доставка курьером',
            [receiveMethods.PICKUP]: ['Из пунктов', 'выдачи'],
            [receiveMethods.EXPRESS]: 'Экспресс доставка курьером',
        },

        title: {
            masterClasses: 'Рекомендуемые мастер-классы',
            characteristics: 'Характеристики',
            ingredients: 'Состав',
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
            showAll: 'Показать ещё отзывы',
            averageRating: 'Средняя оценка',
            makeReview: 'Написать отзыв',
        },
    },

    productGroups: {
        title: {
            catalog: 'Каталог',
            new: 'Новинки',
            bestsellers: 'Бестселлеры',
            promo: 'Акции',
            sets: 'Подборки товаров',
            brands: 'Бренды',
            masterclasses: 'Мастер-классы',
            search: 'Результаты поиска',
        },

        links: {
            catalog: 'Каталог',
            new: 'Новинки',
            bestsellers: 'Бестселлеры',
            promo: 'Акции',
            sets: 'Подборки',
            brands: 'Бренды',
            masterclasses: 'Мастер-классы',
            search: 'Поиск',
        },
    },

    cart: {
        title: {
            like: 'Вам также могут понравиться',
            [cartItemTypes.PRODUCT]: 'Продукты',
            [cartItemTypes.MASTERCLASS]: 'Мастер-классы',
        },

        items: '0 товаров | {n} товар | {n} товаров',

        summary: {
            type: {
                [cartItemTypes.PRODUCT]: 'Продукты',
                [cartItemTypes.MASTERCLASS]: 'Мастер-классы',
            },

            discount: {
                [discountType.PRODUCT]: {
                    [cartItemTypes.PRODUCT]: 'Скидка маркетплейса',
                    [cartItemTypes.MASTERCLASS]: 'Скидка на мастер-класс',
                },
                [discountType.DELIVERY]: 'Скидка на доставку',
                [discountType.CART]: 'Скидка на корзину',
                [discountType.CUSTOM]: 'Персональная скидка',
                [discountType.PROMOCODE]: 'Скидка по промокоду',
            },
        },
    },

    profile: {
        format: {
            order: 'Заказ №{id}',
            messages: 'Сообщения',
            referal: 'Реферал №{id}',
            packageCount: '{n} шт.',
        },

        groups: {
            profile: 'Мой профиль',
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

        productType: {
            [cartItemTypes.PRODUCT]: 'Товары',
            [cartItemTypes.MASTERCLASS]: 'Мастер-классы',
            [cartItemTypes.CERTIFICATE]: 'Электронный подарочный сертификат',
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

        preferences: {
            [preferenceEntityTypes.BRANDS]: {
                title: 'Бренды',
                choosen: 'Выбранные бренды',
                notChoosen: 'Вы ещё не добавляли предпочтения по брендам',
            },

            [preferenceEntityTypes.CATEGORIES]: {
                title: 'Категории',
                choosen: 'Выбранные категории',
                notChoosen: 'Вы ещё не добавляли предпочтения по категориям',
            },
        },
    },

    masterclasses: {
        title: 'Мастер-классы',
    },
};

const LOCALE = 'ru';
export default { main, flatpickrLocale, LOCALE };
