(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{Zrgn:function(t,i,n){"use strict";n.r(i);var e=n("nfjx"),s={name:"info-page-vacancies",mixins:[e.a],metaInfo:function(){return{title:this.pageTitle}},computed:{pageTitle:function(){return"Вакансии"}}},l=n("KHd+"),a=Object(l.a)(s,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"container info-pages-block"},[i("h1",{staticClass:"info-pages-block__title"},[this._v("\n        "+this._s(this.pageTitle)+"\n    ")]),this._v(" "),this._m(0)])}),[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"info-pages-block__content"},[i("p",[this._v("\n            Интересует работа в компании Бессовестно Талантливый? Присылай резюме на\n            "),i("a",{attrs:{href:"mailto:job@ibt.ru"}},[this._v("job@ibt.ru")]),this._v(" с указанием интересующей должности в теме письма.\n        ")]),this._v(" "),i("p",[this._v("\n            Получение персональных данных подтверждает согласие на их обработку и хранение. Конфиденциальность\n            является нашим приоритетом. Рассматриваются заявки лиц старше 18 лет.\n        ")])])}],!1,null,null,null).exports,_={name:"info-pages-feedback",mixins:[e.a],metaInfo:function(){return{title:this.pageTitle}},computed:{pageTitle:function(){return"Обратная связь"}}},r=Object(l.a)(_,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"container info-pages-block"},[i("h1",{staticClass:"info-pages-block__title"},[this._v("\n        "+this._s(this.pageTitle)+"\n    ")]),this._v(" "),this._m(0)])}),[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"info-pages-block__content"},[i("p",[this._v("Если у вас срочный вопрос, позвоните в службу поддержки (с 10:00 до 19:00 по будням):")]),this._v(" "),i("p",[this._v("Москва и область 8 (495) 707‑90‑70 (Москва и область), 8 (800) 707‑90‑70 (остальные регионы).")]),this._v(" "),i("p",[this._v("\n            По другим проблемам напишите нам на "),i("a",{attrs:{href:"mailto:support@ibt.ru"}},[this._v("support@ibt.ru")]),this._v(" или в онлайн-чат.\n        ")])])}],!1,null,null,null).exports,v=n("XNeP"),o=n("45Ux"),c={name:"delivery-and-payment",mixins:[e.a],components:{VTable:v.a,InfoRow:o.a},metaInfo:function(){return{title:this.pageTitle}},data:function(){return{columns:["region","delivery","pickup","timing"],items:[{region:"Москва",delivery:350,pickup:99,timing:"1-2 дня"},{region:"Московская область",delivery:350,pickup:99,timing:"1-3 дня"},{region:"Санкт-Петербург и Ленинградская область",delivery:350,pickup:99,timing:"2-3 дня"},{region:"Центральный федеральный округ",delivery:400,pickup:149,timing:"2-4 дня"},{region:"Северо-Западный федеральный округ, за исключением Санкт-Петербурга и Ленинградской области",delivery:500,pickup:199,timing:"4-7 дней"},{region:"Южный федеральный округ",delivery:500,pickup:199,timing:"3-5 дня"},{region:"Приволжский федеральный округ",delivery:500,pickup:149,timing:"3-5 дня"},{region:"Северо-Кавказский федеральный округ",delivery:550,pickup:199,timing:"4-6 дней"},{region:"Уральский федеральный округ",delivery:550,pickup:249,timing:"5-7  дней"},{region:"Сибирский федеральный округ",delivery:600,pickup:299,timing:"7-14 дней"},{region:"Дальневосточный федеральный округ",delivery:800,pickup:549,timing:"7-14 дней"}]}},computed:{pageTitle:function(){return"Оплата и доставка"},isTablet:function(){return this.$mq.tablet}}},u=Object(l.a)(c,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("section",{staticClass:"section info-pages-block"},[n("h1",{staticClass:"container info-pages-block__title"},[t._v("\n        "+t._s(t.pageTitle)+"\n    ")]),t._v(" "),n("br"),t._v(" "),n("section",{staticClass:"section info-pages-block__content"},[t._m(0),t._v(" "),n("br"),t._v(" "),n("section",{staticClass:"section"},[n("div",{class:{container:!t.isTablet}},[n("h3",{staticClass:"container container--tablet info-pages-block__subtitle"},[t._v("\n                    Сроки и стоимость доставки в зависимости от региона\n                ")]),t._v(" "),t.isTablet?t._l(t.items,(function(i){return n("div",{key:i.region,staticClass:"info-pages-block__card"},[n("info-row",{attrs:{name:"Регион",value:i.region}}),t._v(" "),n("info-row",{attrs:{name:"Стоимость доставки",value:i.delivery}}),t._v(" "),n("info-row",{attrs:{name:"Самовывоз",value:i.pickup}}),t._v(" "),n("info-row",{attrs:{name:"Сроки",value:i.timing}})],1)})):n("v-table",{staticClass:"info-pages-block__table",attrs:{"key-field":"region",items:t.items,columns:t.columns},scopedSlots:t._u([{key:"column-region",fn:function(){return[t._v("Регион")]},proxy:!0},{key:"column-delivery",fn:function(){return[t._v("Доставка")]},proxy:!0},{key:"column-pickup",fn:function(){return[t._v("Самовывоз")]},proxy:!0},{key:"column-timing",fn:function(){return[t._v("Сроки")]},proxy:!0}],null,!1,2419471289)},[n("colgroup",[n("col",{attrs:{width:"55%"}}),t._v(" "),n("col",{attrs:{width:"15%"}}),t._v(" "),n("col",{attrs:{width:"15%"}}),t._v(" "),n("col",{attrs:{width:"15%"}})])])],2)]),t._v(" "),t._m(1)])])}),[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"container"},[n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Условия оплаты")]),t._v(" "),n("p",[t._v("Все заказы оформляются на условиях полной оплаты на сайте. Оплатить выбранные товары можно любым удобным способом:")]),t._v(" "),n("ul",{staticClass:"list"},[n("li",[t._v("Банковской картой (Visa, Mastercard, МИР)")]),t._v(" "),n("li",[t._v("Apple Pay (доступен в браузере Safari)")]),t._v(" "),n("li",[t._v("Google Pay")]),t._v(" "),n("li",[t._v("ЮMoney")]),t._v(" "),n("li",[t._v("терминалы и кассы ЮKassa")]),t._v(" "),n("li",[t._v("WebMoney")]),t._v(" "),n("li",[t._v("Через личный кабинет банка: Сбербанк ОнЛ@йн, Альфа-Клик, Тинькофф Банк")]),t._v(" "),n("li",[t._v("QIWI Wallet")])]),t._v(" "),n("br"),t._v(" "),n("p",[t._v("\n                Оплата на сайте производится с помощью сервиса ЮKassa по защищенному SSL-соединению, что гарантирует безопасность всех платежей.\n            ")]),t._v(" "),n("br"),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Способы доставки")]),t._v(" "),n("p",[t._v("\n                Доступные способы доставки, сроки, временные интервалы и стоимость будут указаны в «Корзине» при оформлении заказа.\n            ")]),t._v(" "),n("h4",{staticClass:"info-pages-block__subtitle"},[t._v("Курьерская доставка")]),t._v(" "),n("p",[t._v("\n                Доставка по Москве, Московской области, Санкт-Петербургу и Ленинградской области осуществляется ежедневно с 09:00 до 21:00 часов (кроме 1-2 января).\n            ")]),t._v(" "),n("p",[t._v("\n                Доставка в другие регионы РФ осуществляется в будние дни с 09:00 до 18:00 часов (кроме праздничных дней).\n            ")]),t._v(" "),n("br"),t._v(" "),n("h4",{staticClass:"info-pages-block__subtitle"},[t._v("Самовывоз")]),t._v(" "),n("p",[t._v("\n                Получение заказов самовывозом осуществляется по графику работы выбранного Пункта выдачи заказов (ПВЗ) или Постамата. Ограничения по товарам для предлагаемых ПВЗ и Постаматов учитываются автоматически при оформлении заказа.\n            ")]),t._v(" "),n("p",[t._v("\n                Срок хранения заказа составляет минимум 7 дней и зависит от выбранного пункта самовывоза. Срок хранения заказа в Постамате составляет 3 дня. При поступлении заказа в пункт самовывоза/постамат будет отравлено уведомление.\n            ")]),t._v(" "),n("br"),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Изменение данных получателя")]),t._v(" "),n("p",[t._v("\n                Если заказ уже оформлен, можно изменить информацию о получателе, дате доставки, либо отменить заказ по телефону Клиентской поддержки"),n("br"),t._v(" "),n("a",{attrs:{href:"tel:+74997079070"}},[t._v("+7 499 707 9070")]),t._v(" для абонентов Москвы и МО"),n("br"),t._v(" "),n("a",{attrs:{href:"tel:+78007079070"}},[t._v("+7 800 707 9070")]),t._v(" для абонентов других регионов\n            ")])])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Получение заказа при курьерской доставке")]),t._v(" "),n("ol",{staticClass:"list"},[n("li",[t._v("\n                        В день доставки заказа поступит информационное сообщение, содержащее номер заказа и время доставки.\n                    ")]),t._v(" "),n("li",[t._v("\n                        Сотрудник службы доставки позвонит за 1 час до времени доставки. \n                    ")]),t._v(" "),n("li",[t._v("\n                        Приготовь документ, подтверждающий личность получателя, и свою ручку для подписи документов. Это необходимо для соблюдения эпидемиологических норм.\n                    ")]),t._v(" "),n("li",[t._v("\n                        Курьер доставит заказ до двери. По готовности курьер позвонит и оставит документы на коробке и отойдёт на 1,5 метра (бесконтактная доставка).\n                    ")]),t._v(" "),n("li",[t._v("\n                        По адресу доставки курьер находится до 15 минут, отведенных на встречу с клиентом, осмотр и проверку содержимого заказа. При получении заказа необходимо расписаться в накладной.\n                    ")])]),t._v(" "),n("br"),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Получение заказа при самовывозе")]),t._v(" "),n("ol",{staticClass:"list"},[n("li",[t._v("\n                        В день доставки заказа в Пункт Выдачи Заказов (ПВЗ) или Постамат от службы доставки поступит информационное сообщение с номером заказа, названием, адресом и режимом работы пункта выдачи. Для выдачи в постамате дополнительно указывается код получения.\n                    ")]),t._v(" "),n("li",[t._v("\n                        В удобное время приходи в выбранный пункт самовывоза.\n                    ")]),t._v(" "),n("li",[t._v("\n                        При получении в ПВЗ:\n                        "),n("ol",{staticClass:"list list--lower-alpha"},[n("li",[t._v("\n                                Назови номер заказа сотруднику ПВЗ\n                            ")]),t._v(" "),n("li",[t._v("\n                                Осмотри выданный заказ и проверь его содержимое \n                            ")]),t._v(" "),n("li",[t._v("\n                                Подпиши накладную и передай сотруднику пункта выдачи\n                            ")])])]),t._v(" "),n("li",[t._v("\n                        При получении в Постамате: \n                        "),n("ol",{staticClass:"list list--lower-alpha"},[n("li",[t._v("\n                                Выбери на экране Постамата пункт «Забрать заказ»\n                            ")]),t._v(" "),n("li",[t._v("\n                                Введи код заказа из информационного сообщения. На каждое отправление из заказа понадобится отдельный код\n                            ")]),t._v(" "),n("li",[t._v("\n                                Нажми «Получить», ячейка постамата откроется\n                            ")]),t._v(" "),n("li",[t._v("\n                                Забери заказ из ячейки постамата\n                            ")])])])])])])}],!1,null,null,null).exports,p={name:"info-pages-feedback",mixins:[e.a],metaInfo:function(){return{title:this.pageTitle}},computed:{pageTitle:function(){return"Возврат товара"}}},f=Object(l.a)(p,(function(){var t=this.$createElement,i=this._self._c||t;return i("section",{staticClass:"info-pages-block"},[i("div",{staticClass:"container"},[i("h1",{staticClass:"info-pages-block__title"},[this._v("\n            "+this._s(this.pageTitle)+"\n        ")]),this._v(" "),this._m(0)])])}),[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"info-pages-block__content"},[n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Не подошел купленный товар?")]),t._v(" "),n("p",[t._v("В этом случае товар можно:")]),t._v(" "),n("ul",{staticClass:"list list--dashed"},[n("li",[n("strong",[t._v("вернуть")]),t._v(" в течение 7 дней с момента получения заказа, исключая день покупки")]),t._v(" "),n("li",[n("strong",[t._v("обменять")]),t._v(" в течение 14 дней с момента получения заказа, исключая день покупки.\n                    Обмен является возвратом товара с последующим оформлением нового заказа на аналогичный товар"),n("sup",[t._v("*")])])]),t._v(" "),n("p",{staticStyle:{"font-size":"0.75rem"}},[n("sup",[t._v("*")]),t._v(" не подлежат обмену утвержденные категории товаров надлежащего качества (Постановление\n                Правительства РФ №2463 от 31.12.2020 года), в том числе: Предметы личной гигиены,\n                Парфюмерно-косметические товары, Бытовая химия.\n            ")]),t._v(" "),n("h4",{staticClass:"info-pages-block__subtitle"},[t._v("Условия возврата и обмена")]),t._v(" "),n("p",[t._v("\n                Можно вернуть товар надлежащего качества, который не был в употреблении, сохранил первоначальный\n                вид"),n("sup",[t._v("*")]),t._v(", фабричные ярлыки, оригинальную упаковку и полную комплектацию.\n            ")]),t._v(" "),n("p",[t._v("\n                ! Если товар был куплен в комплекте с другими товарами или подарком, необходимо вернуть полный\n                комплект.\n            ")]),t._v(" "),n("p",{staticStyle:{"font-size":"0.75rem"}},[n("sup",[t._v("*")]),t._v(" Споры о товарном виде и использовании товара решаются в установленном порядке с\n                проведением независимой товарной экспертизы.\n            ")]),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Возникла проблема с товаром?")]),t._v(" "),n("p",[t._v("\n                Вернуть товар ненадлежащего качества можно в течение Гарантийного срока, пройдя несколько простых\n                этапов оформления. При необходимости проведения независимой экспертизы* качества продукции, срок\n                рассмотрения заявления может быть увеличен до 20 календарных дней, исключая день обращения.\n            ")]),t._v(" "),n("p",{staticStyle:{"font-size":"0.75rem"}},[n("sup",[t._v("*")]),t._v(" По истечении 14 календарных дней, исключая дату получения товара, покупателю необходимо\n                самостоятельно провести независимую экспертизу и предоставить результаты вместе с заявлением на\n                возврат или обмен.\n            ")]),t._v(" "),n("h4",{staticClass:"info-pages-block__subtitle"},[t._v("Условия возврата и обмена")]),t._v(" "),n("p",[t._v("\n                Можно вернуть товар надлежащего качества, который не был в употреблении, сохранил первоначальный\n                вид"),n("sup",[t._v("*")]),t._v(", фабричные ярлыки, оригинальную упаковку и полную комплектацию.\n            ")]),t._v(" "),n("p",[t._v("\n                ! Если товар был куплен в комплекте с другими товарами или подарком, необходимо вернуть полный\n                комплект.\n            ")]),t._v(" "),n("p",{staticStyle:{"font-size":"0.75rem"}},[n("sup",[t._v("*")]),t._v(" Споры о товарном виде и использовании товара решаются в установленном порядке с\n                проведением независимой товарной экспертизы.\n            ")]),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Как оформить возврат или обмен?")]),t._v(" "),n("ol",{staticClass:"list"},[n("li",[t._v("\n                    Выбрать, скачать и заполнить\n                    "),n("a",{attrs:{href:"/assets/files/zayavlenie_na_vozvrat.docx",download:""}},[t._v("заявление на возврат")]),t._v("\n                    или\n                    "),n("a",{attrs:{href:"/assets/files/zayavlenie_na_obmen.docx",download:""}},[t._v("обмен")])]),t._v(" "),n("li",[t._v("Распечатать и подписать заявление")]),t._v(" "),n("li",[t._v("Отправить фото или скан заявления на "),n("a",{attrs:{href:"mailto:support@ibt.ru"}},[t._v("support@ibt.ru")])]),t._v(" "),n("li",[t._v("\n                    Сотрудник клиентской поддержки свяжется с вами для согласования даты и удобного способа передачи\n                    товаров:\n                    "),n("ul",{staticClass:"list"},[n("li",[t._v("курьеру транспортной службы")]),t._v(" "),n("li",[t._v("в Пункт Выдачи Заказов (ПВЗ)")])])]),t._v(" "),n("li",[t._v("\n                    При передачи товаров на возврат назовите номер возвратной накладной, который сообщит сотрудник\n                    клиентской поддержки\n                ")]),t._v(" "),n("li",[t._v("При обмене оформить новый заказ на необходимую позицию")])]),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Как подготовить и отправить товар?")]),t._v(" "),n("ul",{staticClass:"list"},[n("li",[t._v("\n                    Положить товар в транспортную упаковку, в которой он был доставлен. При отсутствии данной\n                    упаковки использовать аналогичную коробку подходящего размера.\n                ")]),t._v(" "),n("li",[t._v("\n                    В случае отправки нескольких товаров, распределите их, согласно номерам возвратных накладных,\n                    сообщенных сотрудником клиентской поддержки. Товары с разными номерами накладных необходимо\n                    упаковать раздельно.\n                ")]),t._v(" "),n("li",[t._v("\n                    Полностью заполненное и подписанное заявление на возврат необходимо вложить в любую коробку с\n                    отправляемым товаром.\n                ")]),t._v(" "),n("li",[t._v("\n                    В назначенную дату необходимо назвать курьеру или сотруднику ПВЗ номер возвратной накладной и\n                    передать полный комплект товаров на возврат.\n                ")])]),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Когда поступят деньги?")]),t._v(" "),n("p",[t._v("\n                В течение 10 дней после получения возврата денежные средства будут перечислены тем же способом,\n                которым была оплачена покупка. Срок зачисления зависит от банка покупателя.\n            ")])])}],!1,null,null,null).exports,h=n("2JJK"),b={name:"info-pages-bonuses",mixins:[e.a],metaInfo:function(){return{title:this.pageTitle}},computed:{bonusProgramLink:function(){return{name:"Agreements",params:{type:h.agreementTypes.BONUS_PROGRAM}}},pageTitle:function(){return"Бонусы за покупки"}}},g=Object(l.a)(b,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"container info-pages-block"},[n("h1",{staticClass:"info-pages-block__title"},[t._v("\n        "+t._s(t.pageTitle)+"\n    ")]),t._v(" "),n("div",{staticClass:"info-pages-block__content"},[n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Получай бонусные баллы за покупки")]),t._v(" "),t._m(0),t._v(" "),n("br"),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Простая и понятная система начисления бонусных баллов")]),t._v(" "),t._m(1),t._v(" "),n("br"),t._v(" "),n("h3",{staticClass:"info-pages-block__subtitle"},[t._v("Оплачивай товары: один бонусный балл — один рубль")]),t._v(" "),t._m(2),t._v(" "),n("br"),t._v(" "),n("span",[t._v("\n            С полными Правилами бонусной программы можно ознакомиться \n            "),n("strong",[n("router-link",{attrs:{to:t.bonusProgramLink}},[t._v("здесь")])],1)])])])}),[function(){var t=this.$createElement,i=this._self._c||t;return i("ul",{staticClass:"list"},[i("li",[this._v("до 10% стоимости товаров")]),this._v(" "),i("li",[this._v("бонусный счет активируется при регистрации")]),this._v(" "),i("li",[this._v("актуальный баланс в разделе Бонусная программа Личного кабинета")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("ul",{staticClass:"list"},[i("li",[this._v("количество баллов за покупку смотри на странице товара и в корзине при оформлении заказа")]),this._v(" "),i("li",[this._v("начисление через 7 дней после доставки покупки")]),this._v(" "),i("li",[this._v("бонусные баллы действуют 60 дней со дня начисления")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("ul",{staticClass:"list"},[i("li",[this._v("до 15% стоимости товаров по полной цене и до 10%, если товар со скидкой")]),this._v(" "),i("li",[this._v("максимальное количество бонусных баллов, доступных для оплаты, указывается в корзине при оформлении заказа")]),this._v(" "),i("li",[this._v("используй доступные баллы частично или полностью по своему усмотрению")])])}],!1,null,null,null).exports,m=n("L2JU");n("cxxV");function d(t,i){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);i&&(e=e.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),n.push.apply(n,e)}return n}function k(t){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?d(Object(n),!0).forEach((function(i){C(t,i,n[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))}))}return t}function C(t,i,n){return i in t?Object.defineProperty(t,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[i]=n,t}var y={name:"agreements",computed:k(k({},Object(m.d)("route",{page:function(t){return t.params.page}})),{},{renderComponent:function(){switch(this.page){case h.infoPages.FEEDBACK:return r;case h.infoPages.DELIVERY_AND_PAYMENT:return u;case h.infoPages.PURCHASE_RETURNS:return f;case h.infoPages.BONUSES:return g;case h.infoPages.VACANCIES:default:return a}}})},O=Object(l.a)(y,(function(){var t=this.$createElement;return(this._self._c||t)(this.renderComponent,{tag:"component"})}),[],!1,null,null,null);i.default=O.exports},cxxV:function(t,i,n){}}]);