<template>
    <section class="section info-pages-block">
        <h1 class="container info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <br />

        <section class="section info-pages-block__content">
            <div class="container">
                <h3 class="info-pages-block__subtitle">Условия оплаты</h3>
                <p>Все заказы оформляются на условиях полной оплаты на сайте. Оплатить выбранные товары можно любым удобным способом:</p>

                <ul class="list">
                    <li>Банковской картой (Visa, Mastercard, МИР)</li>
                    <li>Apple Pay (доступен в браузере Safari)</li>
                    <li>Google Pay</li>
                    <li>ЮMoney</li>
                    <li>терминалы и кассы ЮKassa</li>
                    <li>WebMoney</li>
                    <li>Через личный кабинет банка: Сбербанк ОнЛ@йн, Альфа-Клик, Тинькофф Банк</li>
                    <li>QIWI Wallet</li>
                </ul>

                <br />

                <p>
                    Оплата на сайте производится с помощью сервиса ЮKassa по защищенному SSL-соединению, что гарантирует безопасность всех платежей.
                </p>

                <br />

                <h3 class="info-pages-block__subtitle">Способы доставки</h3>
                <p>
                    Доступные способы доставки, сроки, временные интервалы и стоимость будут указаны в «Корзине» при оформлении заказа.
                </p>
                <h4 class="info-pages-block__subtitle">Курьерская доставка</h4>
                <p>
                    Доставка по Москве, Московской области, Санкт-Петербургу и Ленинградской области осуществляется ежедневно с 09:00 до 21:00 часов (кроме 1-2 января).
                </p>
                <p>
                    Доставка в другие регионы РФ осуществляется в будние дни с 09:00 до 18:00 часов (кроме праздничных дней).
                </p>

                <br />

                <h4 class="info-pages-block__subtitle">Самовывоз</h4>
                <p>
                    Получение заказов самовывозом осуществляется по графику работы выбранного Пункта выдачи заказов (ПВЗ) или Постамата. Ограничения по товарам для предлагаемых ПВЗ и Постаматов учитываются автоматически при оформлении заказа.
                </p>
                <p>
                    Срок хранения заказа составляет минимум 7 дней и зависит от выбранного пункта самовывоза. Срок хранения заказа в Постамате составляет 3 дня. При поступлении заказа в пункт самовывоза/постамат будет отравлено уведомление.
                </p>

                <br />

                <h3 class="info-pages-block__subtitle">Изменение данных получателя</h3>
                <p>
                    Если заказ уже оформлен, можно изменить информацию о получателе, дате доставки, либо отменить заказ по телефону Клиентской поддержки<br />
                    <a href="tel:+74997079070">+7 499 707 9070</a> для абонентов Москвы и МО<br />
                    <a href="tel:+78007079070">+7 800 707 9070</a> для абонентов других регионов
                </p>
            </div>

            <br />

            <section class="section">
                <div :class="{ container: !isTablet }">
                    <h3 class="container container--tablet info-pages-block__subtitle">
                        Сроки и стоимость доставки в зависимости от региона и суммы заказа
                    </h3>

                    <v-table
                        class="info-pages-block__table"
                        key-field="region"
                        v-if="!isTablet"
                        :items="items"
                        :columns="columns"
                    >
                        <colgroup>
                            <col width="50%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                        </colgroup>
                        <template v-slot:column-region>Регион</template>
                        <template v-slot:column-deliverydo>Доставка заказа до 3500 руб</template>
                        <template v-slot:column-deliveryot>Доставка заказа от 3500 руб</template>
                        <template v-slot:column-pickupdo>Самовывоз заказа до 3500 руб</template>
                        <template v-slot:column-pickupot>Самовывоз заказа от 3500 руб</template>
                        <template v-slot:column-timing>Сроки</template>
                    </v-table>
                    <template v-else>
                        <div class="info-pages-block__card" v-for="item in items" :key="item.region">
                            <info-row name="Регион" :value="item.region" />
                            <info-row name="Доставка заказа до 3500 руб" :value="item.deliverydo" />
                            <info-row name="Доставка заказа от 3500 руб" :value="item.deliveryot" />
                            <info-row name="Самовывоз заказа до 3500 руб" :value="item.pickupdo" />
                            <info-row name="Самовывоз заказа от 3500 руб" :value="item.pickupot" />
                            <info-row name="Сроки" :value="item.timing" />
                        </div>
                    </template>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <h3 class="info-pages-block__subtitle">Получение заказа при курьерской доставке</h3>
                    <ol class="list">
                        <li>
                            В день доставки заказа поступит информационное сообщение, содержащее номер заказа и время доставки.
                        </li>
                        <li>
                            Сотрудник службы доставки позвонит за 1 час до времени доставки. 
                        </li>
                        <li>
                            Приготовь документ, подтверждающий личность получателя, и свою ручку для подписи документов. Это необходимо для соблюдения эпидемиологических норм.
                        </li>
                        <li>
                            Курьер доставит заказ до двери. По готовности курьер позвонит и оставит документы на коробке и отойдёт на 1,5 метра (бесконтактная доставка).
                        </li>
                        <li>
                            По адресу доставки курьер находится до 15 минут, отведенных на встречу с клиентом, осмотр и проверку содержимого заказа. При получении заказа необходимо расписаться в накладной.
                        </li>
                    </ol>

                    <br />

                    <h3 class="info-pages-block__subtitle">Получение заказа при самовывозе</h3>
                    <ol class="list">
                        <li>
                            В день доставки заказа в Пункт Выдачи Заказов (ПВЗ) или Постамат от службы доставки поступит информационное сообщение с номером заказа, названием, адресом и режимом работы пункта выдачи. Для выдачи в постамате дополнительно указывается код получения.
                        </li>
                        <li>
                            В удобное время приходи в выбранный пункт самовывоза.
                        </li>
                        <li>
                            При получении в ПВЗ:
                            <ol class="list list--lower-alpha">
                                <li>
                                    Назови номер заказа сотруднику ПВЗ
                                </li>
                                <li>
                                    Осмотри выданный заказ и проверь его содержимое 
                                </li>
                                <li>
                                    Подпиши накладную и передай сотруднику пункта выдачи
                                </li>
                            </ol>
                        </li>
                        <li>
                            При получении в Постамате: 
                            <ol class="list list--lower-alpha">
                                <li>
                                    Выбери на экране Постамата пункт «Забрать заказ»
                                </li>
                                <li>
                                    Введи код заказа из информационного сообщения. На каждое отправление из заказа понадобится отдельный код
                                </li>
                                <li>
                                    Нажми «Получить», ячейка постамата откроется
                                </li>
                                <li>
                                    Забери заказ из ячейки постамата
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </section>
        </section>
    </section>
</template>

<script>
import VTable from '@controls/VTable/VTable.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';

import metaMixin from '@plugins/meta';

export default {
    name: 'delivery-and-payment',
    mixins: [metaMixin],

    components: {
        VTable,
        InfoRow,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            columns: ['region', 'delivery', 'pickup', 'timing'],
            items: [
                {
                    region: 'Москва',
                    deliverydo: 500,
                    deliveryot: 350,
                    pickupdo: 199,
                    pickupot: 99,
                    timing: '1-2 дня',
                },
                {
                    region: 'Московская область',
                    deliverydo: 500,
                    deliveryot: 350,
                    pickupdo: 199,
                    pickupot: 99,
                    timing: '1-3 дня',
                },
                {
                    region: 'Санкт-Петербург и Ленинградская область',
                    deliverydo: 500,
                    deliveryot: 350,
                    pickupdo: 199,
                    pickupot:  99,
                    timing: '2-3 дня',
                },
                {
                    region: 'Центральный федеральный округ',
                    deliverydo: 550,
                    deliveryot: 400,
                    pickupdo: 249,
                    pickupot: 149,
                    timing: '2-4 дня',
                },
                {
                    region:
                        'Северо-Западный федеральный округ, за исключением Санкт-Петербурга и Ленинградской области',
                    deliverydo: 600,
                    deliveryot: 500,
                    pickupdo: 299,
                    pickupot: 199,
                    timing: '4-7 дней',
                },
                {
                    region: 'Южный федеральный округ',
                    deliverydo: 600,
                    deliveryot: 500,
                    pickupdo: 299,
                    pickupot: 199,
                    timing: '3-5 дня',
                },
                {
                    region: 'Приволжский федеральный округ',
                    deliverydo: 600,
                    deliveryot: 500,
                    pickupdo: 249,
                    pickupot: 149,
                    timing: '3-5 дня',
                },
                {
                    region: 'Северо-Кавказский федеральный округ',
                    deliverydo: 650,
                    deliveryot: 550,
                    pickupdo: 299,
                    pickupot: 199,
                    timing: '4-6 дней',
                },
                {
                    region: 'Уральский федеральный округ',
                    deliverydo: 650,
                    deliveryot: 550,
                    pickupdo: 349,
                    pickupot: 249,
                    timing: '5-7  дней',
                },
                {
                    region: 'Сибирский федеральный округ',
                    deliverydo: 700,
                    deliveryot: 600,
                    pickupdo: 399,
                    pickupot: 299,
                    timing: '7-14 дней',
                },
                {
                    region: 'Дальневосточный федеральный округ',
                    deliverydo: 900,
                    deliveryot: 800,
                    pickupdo: 649,
                    pickupot: 549,
                    timing: '7-14 дней',
                },
            ],
        };
    },

    computed: {
        pageTitle() {
            return 'Оплата и доставка';
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },
};
</script>
