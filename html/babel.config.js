module.exports = (api) => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                /* modules: false отключает конвертацию импортов через Babel, т.к. импортами управляет webpack. */
                modules: false,
            },
        ],
    ];

    /* Для конфигов переопределяем дефолтные настройки с включением конвертации модулей.
    Это необходимо для возможности использования ESM в конфигах, так как конфиги webpack не преобразует. */
    const overrides = [
        {
            test: ['./build'],
            presets: [['@babel/preset-env']],
        },
    ];

    /* plugin-proposal-class-properties позволяет использовать статические свойства в классах, а не только статические методы.
    plugin-syntax-dynamic-import парсит динамические импорты, не накладывая на них дополнительных трансформаций,
    что позволяет управлять ими на уровне webpack для реализации code splitting. */
    const plugins = ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'];

    return {
        presets,
        overrides,
        plugins,
    };
};
