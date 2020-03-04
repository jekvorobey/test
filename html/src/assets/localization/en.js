import flatPickrEn from 'flatpickr/dist/l10n/default';
import { receiveMethods } from '../scripts/enums/checkout';
import { genderType } from '../scripts/enums/profile';
import { socials } from '../scripts/enums/general';
import { orderStatus } from '../scripts/enums/order';

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

    deliveryMethod: {
        [receiveMethods.DELIVERY]: 'Delivery',
        [receiveMethods.EXPRESS]: 'Express delivery',
        [receiveMethods.PICKUP]: 'Pickup',
    },

    genderType: {
        [genderType.FEMALE]: 'Female',
        [genderType.MALE]: 'Male',
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
        showAll: 'Show All',

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
        },
    },

    profile: {
        format: {
            order: 'Order №{id}',
            messages: 'Messages ({n})',
            referal: 'Referal №{id}',
            orderStatus: {
                [orderStatus.CREATED]: 'Created',
                [orderStatus.AWAITING_CHECK]: 'Awaiting Check',
                [orderStatus.IN_PROCESSING]: 'In Process',
                [orderStatus.CHECKING]: 'Checking',
                [orderStatus.TRANSFERRED_TO_DELIVERY]: 'Transferred To Delivery',
                [orderStatus.DELIVERING]: 'Delivering',
                [orderStatus.READY_FOR_RECIPIENT]: 'Ready for Recipient',
                [orderStatus.DONE]: 'Done',
                [orderStatus.RETURNED]: 'Returned',
                [orderStatus.PRE_ORDER]: 'Preorder',
            },
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
            ReferalOrders: 'Referal orders',
            ReferalOrderDetails: 'Referal orders',

            Referal: 'Referal Program',
            ProPreferences: 'My Professional Preferences',
            Promopage: 'My Promopage',
            Seo: 'Goods for Promotion',
            Promocodes: 'My Promocodes',
            Account: 'My Account',
            Billing: 'Account Billing',
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
