<template>
    <section id="colors" class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Основные цвета
        </h2>
        <p class="ui-kit-section__desc">Настройка: customProperties.css</p>
        <div class="ui-kit-colors">
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color: #f12828;" />
                <p class="ui-kit-colors__desc">
                    Красный (ошибки и иконки)<br />#f12828 <br />
                    var(--cl-red)
                </p>
            </div>
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color: #141116" />
                <p class="ui-kit-colors__desc">
                    Черный (цвет текста и дефолтных инпутов)<br />#141116 <br />
                    var(--cl-white)
                </p>
            </div>
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color: #999999;" />
                <p class="ui-kit-colors__desc">
                    Cерый (Дополнительный текст, задизейбленные элементы)<br />#999999 <br />
                    var(--cl-grey)
                </p>
            </div>
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color: #CCCCCC;" />
                <p class="ui-kit-colors__desc">
                    Светло-серый (разделители и фоны)<br />#CCCCCC <br />
                    var(--cl-divider-grey)
                </p>
            </div>
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color: #ffffff; box-shadow: 0 0 0 1px #000" />
                <p class="ui-kit-colors__desc">
                    Белый<br />#ffffff <br />
                    var(--cl-white)
                </p>
            </div>
            <div class="ui-kit-colors__col">
                <div class="ui-kit-colors__name" style="background-color:  #ffd338;" />
                <p class="ui-kit-colors__desc">
                    Золотой<br />
                    #ffd338 <br />
                    var(--cl-gold)
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ui-kit-colors',
};
</script>