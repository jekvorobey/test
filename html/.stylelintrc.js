module.exports = {
    extends: [
        /* Набор правил AirBnB: https://github.com/airbnb/css */
        'stylelint-config-standard',
        /* Отключает правила Stylelint, конфликтующие с Prettier,
        и позволяет использовать Prettier в качестве форматтера Stylelint. */
        'stylelint-prettier/recommended',
    ],
    ignoreFiles: ['node_modules/**/*.*', 'dist/**/*.*', '../public/**/*.*', 'build/**/*.*', 'docs/**/*.*'],
    rules: {
        /* Не имеет смысла в postcss, т.к. в нём все комментарии многострочные, и это правило будет мешать закомменчивать код. */
        'comment-empty-line-before': null,
        /* font-family используется для полифилла object-fit, а соблюдение самого правила легко отслеживается. */
        'font-family-no-missing-generic-family-keyword': null,
        /* Это правило мешает группировать селекторы и усложняет переопределение стилей сторонних библиотек. */
        'no-descending-specificity': null,
        /* Здесь определяется список допустимых нестандартных свойств (postcss-плагины). */
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['triangle'],
            },
        ],
    },
};
