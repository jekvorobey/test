module.exports = {
    root: true,
    /* Разрешённые глобальные переменные. */
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
    /* Меняем стандартный парсер, т.к. используем Babel. */
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    plugins: ['optimize-regex', 'import'],
    rules: {
        /* Чтобы можно было работать с битовыми операциями (например преобразования HEX в RGB) */
        'no-bitwise': 'off',
        /* Чтобы можно было ничего не возвращать в async функции */
        'consistent-return': 'off',
        /* Чтобы можно было писать анонимные функции, иногда нужно */
        'func-names': 'off',
        /* Отключаем требование в использовании this, чтобы иметь возможность прописывать пустые методы в родительских компонентах. */
        'class-methods-use-this': 'off',
        /* Отключён по той же причине, что и import/no-dynamic-require. */
        'global-require': 'off',
        /* Отключёно */
        'import/no-unresolved': 'off',
        /* Динамический require бывает полезен в редких случаях, когда нужно рассчитать имя модуля динамически или задать условия подключения, но при этом не нужно отделение кода в отдельный бандл. */
        'import/no-dynamic-require': 'off',
        /* Делает модули из devDependencies корректными для подключения. */
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        /* default не имеет смысла в файлах, где впоследствии появятся новые экспорты, так что warning. */
        'import/prefer-default-export': 'warn',
        /* Отключает предупреждения о LF/CRLF из-за проблем на Windows. */
        'linebreak-style': 'off',
        /* Периодически это бывает необходимо. */
        'no-param-reassign': 'off',
        /* Определение после места использования разрешено, пока не внедрена нормальная система обработки событий. */
        'no-use-before-define': 'off',
        /* Разрешены неиспользуемые переменные в аргументах функций до используемого. */
        'no-unused-vars': ['error', { args: 'after-used' }],
        /* Оптимизация регулярных выражений. */
        'optimize-regex/optimize-regex': 'error',
        /* Деструктуризация массивов при обращении к индексам избыточна. */
        'prefer-destructuring': ['error', { object: true, array: false }],
        /* Ошибка везде где ++ или -- , кроме for */
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        /* отключено, иногда нужно для сервисных полей */
        'no-underscore-dangle': 'off',
        /* отключено правило реджекта только для ошибок в промисах */
        'prefer-promise-reject-errors': 'off',
        /* отключаем правило для camelcase */
        camelcase: 'off',
    },
};
