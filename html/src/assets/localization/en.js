import flatPickrEn from 'flatpickr/dist/l10n/default';
import { receiveMethods, discountType } from '@enums/checkout';
import { genderType, billingOperationType, referralSource, bonusStatus } from '@enums/profile';
import { socials } from '@enums';
import { orderStatus, deliveryStatus } from '@enums/order';

const flatpickrLocale = flatPickrEn;
const main = {
    header: {
        top: {
            delivery: 'Deliveries across Russia',
            benefits: 'Over 1000 products for professionals',
            gifts: 'Bonuses from every purchase',
            help: 'Help',
        },

        middle: {
            search: 'Find...',
            professionals: 'Marketplace for beauty industry professionals only',
        },
    },

    footer: {
        links: {
            purchase: 'How to purchase',
            payment: 'Payment and delivery',
            refund: 'Purchase refund',
            guarantee: 'Guarantees',
            qna: 'Question and answers',
            about_company: 'About company',
            about_us: 'About us',
            partners: 'For partners',
            feedback: 'Feedback',
            vacancy: 'Vacancy',
        },

        made_by: 'Made by Greensight',
        rights: '© 2019 «Shamelessly Talented»',
        terms_of_use: 'Terms of use',
        offer: 'Public offer',
    },

    socials: {
        socials: 'Subscribe in social networks',
        facebook: 'Facebook',
        vkontakte: 'VKontakte',
        twitter: 'Twitter',
        ok: 'Odnoklasniki',
        youtube: 'Youtube',
        instagram: 'Instagram',
    },

    validation: {
        errors: {
            required: 'Required',
            email: 'name@domain.com format',
        },
    },

    billingOperationType: {
        [billingOperationType.EARNING]: 'Earning',
        [billingOperationType.PAYMENT]: 'Payment',
        [billingOperationType.REFUND]: 'Refund',
        [billingOperationType.WITHDRAW]: 'Withdraw',
        [billingOperationType.ADJUSTMENT]: 'Adjustment',
    },

    orderStatus: {
        [orderStatus.PRE_ORDER]: 'Preorder',
        [orderStatus.CREATED]: 'Created',
        [orderStatus.AWAITING_CHECK]: 'In Processing',
        [orderStatus.IN_PROCESSING]: 'In Processing',
        [orderStatus.CHECKING]: 'In Processing',
        [orderStatus.AWAITING_CONFIRMATION]: 'In Processing',
        [orderStatus.TRANSFERRED_TO_DELIVERY]: 'In Processing',
        [orderStatus.DELIVERING]: 'In Delivery',
        [orderStatus.READY_FOR_RECIPIENT]: 'Ready for Recipient',
        [orderStatus.DONE]: 'Done',
        [orderStatus.RETURNED]: 'Returned',
    },

    deliveryStatus: {
        [deliveryStatus.STATUS_CREATED]: 'Created',

        [deliveryStatus.STATUS_ON_POINT_IN]: 'Accepted at the Warehouse in the use of the Shipment',
        [deliveryStatus.STATUS_ON_WAY]: 'On the way',
        [deliveryStatus.STATUS_ON_POINT_OUT]: 'Arrived at the Warehouse at destination',
        [deliveryStatus.STATUS_DELIVERING]: 'Transferred to destination',
        [deliveryStatus.STATUS_READY_FOR_RECIPIENT]: 'Ready for Recipient',
        [deliveryStatus.STATUS_DONE]: 'Done',

        [deliveryStatus.STATUS_RETURNED_FROM_DELIVERY]: 'Returned from Delivery',
        [deliveryStatus.STATUS_PARTIAL_RETURN]: 'Partial Return',
        [deliveryStatus.STATUS_RETURN_READY]: 'Return prepared',
        [deliveryStatus.STATUS_RETURNING]: 'Returning to sender',
        [deliveryStatus.STATUS_RETURNED]: 'Returned to sender',

        [deliveryStatus.STATUS_LOST]: 'Lost',
        [deliveryStatus.STATUS_PROBLEM]: 'Problem arrived',
        [deliveryStatus.STATUS_CANCEL]: 'Canceled',

        [deliveryStatus.STATUS_UNKNOWN]: 'Unknown',
        [deliveryStatus.STATUS_NA]: 'n/a',
    },

    deliveryMethod: {
        [receiveMethods.DELIVERY]: 'Delivery',
        [receiveMethods.PICKUP]: 'Pickup',
        [receiveMethods.EXPRESS]: 'Express delivery',
    },

    referralSource: {
        [referralSource.PROMOCODE]: 'Promocode',
        [referralSource.LINK]: 'Referral link',
    },

    genderType: {
        [genderType.MALE]: 'Male',
        [genderType.FEMALE]: 'Female',
    },

    bonusStatus: {
        [bonusStatus.DELAYED]: 'Delayed',
        [bonusStatus.ACTIVE]: 'Active',
        [bonusStatus.FINISHED]: 'Finished',
        [bonusStatus.TAKEN]: 'Taken',
    },

    landing: {
        showAll: 'Show all',
        subscribe: 'Subscrube',

        title: {
            new: 'New',
            bestseller: 'Bestsellers',
            featured: 'Look on the site now',
            brand: 'Popular brands',
            instagram: 'Instabeauty',
        },

        brands: {
            showAll: 'Show all',
        },
    },

    product: {
        vendorCode: 'Vendor Code {code}',
        review: '{n} Reviews',
        bonus: '{n} Bonuses',
        variants: 'No options | {n} Option | {n} Options',
        showAll: 'Show All',

        deliveryMethod: {
            [receiveMethods.DELIVERY]: 'Delivery',
            [receiveMethods.PICKUP]: ['From pickup', 'points'],
            [receiveMethods.EXPRESS]: 'Express Delivery',
        },

        title: {
            masterClasses: 'Master Classes with this product',
            characteristics: 'Characteristics',
            reviews: 'Reviews',
            method: 'Method for the use thereof',
            description: 'Description',
            profitable: 'Profitable kit',
            compilations: 'This product in Compilations',
            like: 'You may also like',
            instagram: 'Instabeauty',
            history: 'You looked at',
        },

        reviews: {
            showAll: 'Show More',
            averageRating: 'Average Rating',
            makeReview: 'Leave Feedback',
        },
    },

    productGroups: {
        title: {
            catalog: 'Catalog',
            new: 'New',
            promo: 'Stocks',
            sets: 'Product Sets',
            brands: 'Brands',
            masterclasses: 'Master-classes',
        },

        links: {
            catalog: 'Catalog',
            new: 'New',
            promo: 'Promo',
            sets: 'Sets',
            brands: 'Brands',
            masterclasses: 'Master-classes',
        },
    },

    cart: {
        title: {
            like: 'You may also like',
            product: 'Products',
            masterclass: 'Master-classes',
        },

        items: '0 products | {n} product | {n} products',

        summary: {
            type: {
                product: 'Products',
                masterclass: 'Master-classes',
            },

            discount: {
                [discountType.PRODUCT]: 'Product Discount',
                [discountType.DELIVERY]: 'Delivery Discount',
                [discountType.CART]: 'Cart Discount',
                [discountType.CUSTOM]: 'Discount for You',
                [discountType.PROMOCODE]: 'Promocode Discount',
            },
        },
    },

    profile: {
        format: {
            order: 'Order №{id}',
            messages: 'Messages ({n})',
            referal: 'Referal №{id}',
            packageCount: '{n} pcs.',
        },

        groups: {
            profile: 'My Profile',
            business: 'My Business',
            training: 'Training',
        },

        socials: {
            [socials.VKONTAKTE]: 'VKontakte',
            [socials.TWITTER]: 'Twitter',
            [socials.INSTAGRAM]: 'Instagram',
            [socials.FACEBOOK]: 'Facebook',
            [socials.GOOGLE]: 'Google',
        },

        routes: {
            Cabinet: 'Cabinet',
            Preferences: 'My Preferences',
            Addresses: 'Delivery Address',
            Payment: 'Payment Methods',
            Subscribes: 'Subscribes',
            Messages: 'Messages',
            MessageDetails: 'Messages',
            Certificates: 'Certificates',
            Bonuses: 'Bonuses',
            Orders: 'My Orders',
            OrderDetails: 'My Orders',
            ReferalOrderDetails: 'Referal orders',

            Referal: 'Referal Program',
            ProPreferences: 'My Professional Preferences',
            Promopage: 'My Promopage',
            Seo: 'Goods for Promotion',
            Promocodes: 'My Promocodes',
            Account: 'My Account',
            Documents: 'My Documents',

            HowItWorks: 'How It Works',
            Guides: 'Product Guide',
            GuideDetails: 'Product Guide',
            Masterclasses: 'My Masterclasses',
            QnA: 'Questions and Answers',
        },
    },
};

const LOCALE = 'en';
export default { main, flatpickrLocale, LOCALE };
