<template>
    <section class="section info-pages-block">
        <h1 class="container info-pages-block__title">
            {{ pageTitle }}
        </h1>

        <br />

        <section class="section info-pages-block__content typo">
            <div class="container">
                <h3 class="info-pages-block__subtitle">Условия оплаты</h3>
                <p>Заказы оформляются на условиях полной оплаты на сайте любым удобным способом:</p>

                <ul class="list">
                    <li>Банковская карта (Visa, Mastercard, МИР)</li>
                    <li>Sber Pay</li>
<!--                    <li>Яндекс.Деньги</li>-->
                    <li>Кошелёк ЮMoney</li>
                    <li>СБП (Система быстрых платежей)</li>
<!--                    <li>Apple Pay (доступен в браузере Safari)</li>-->
<!--                    <li>Google Pay</li>-->
<!--                    <li>Кошелёк WebMoney</li>-->
<!--                    <li>Кошелёк QIWI</li>-->
                    <li>Через личный кабинет банка: Сбербанк, Альфа-Клик, Тинькофф Банк</li>
                    <li>Наличными в партнерских терминалах и кассах ЮKassa или ЮMoney</li>
                </ul>

                <br />

                <p>
                    Безопасность оплаты гарантирована сервисом ЮKassa с технологией защищенных SSL-соединений.
                </p>

                <br />

                <h3 class="info-pages-block__subtitle">Способы доставки</h3>
                <p>
                    Выбор способа доставки, сроков, временных интервалов и стоимости производится в Корзине при оформлении заказа. Ограничения, актуальные для каждого из способов доставки, учитываются автоматически.
                </p>
                <p>
                    <b>В Пункте выдачи заказов (ПВЗ) необходим паспорт получателя. При доставке курьером может потребоваться документ, подтверждающий личность получателя.</b>
                </p>
                <h4 class="info-pages-block__subtitle">Курьерская доставка</h4>
                <p>
                    Доставка по Москве, Московской области, Санкт-Петербургу и Ленинградской области осуществляется ежедневно с 09:00 до 21:00 часов, за исключением 1-го и 2-го января.
                </p>
                <p>
                    Доставка в другие регионы РФ осуществляется в будние дни с 09:00 до 18:00 часов (кроме праздничных дней).
                </p>

                <br />

                <h4 class="info-pages-block__subtitle">Самовывоз</h4>
                <p>
                    Получение заказов осуществляется по графику работы выбранного Пункта выдачи заказов (ПВЗ) или Постамата.
                </p>
                <p>
                    При поступлении заказа в пункт самовывоза поступит уведомление. Срок хранения заказа составляет минимум 7 дней и зависит от выбранного пункта самовывоза.
                </p>

                <br />

                <h3 class="info-pages-block__subtitle">Изменение данных получателя</h3>
                <p>
                    Изменить информацию о получателе и дате доставки оформленного ранее заказа, а также отменить заказ можно по телефону Клиентской поддержки<br />
                    <a href="tel:+74997079070">+7 499 707 9070</a> для абонентов Москвы и МО<br />
                    <a href="tel:+78007079070">+7 800 707 9070</a> для абонентов других регионов
                </p>
            </div>

            <br />

            <section class="section">
                <div :class="{ container: !isTablet }">
                    <h3 class="container container--tablet info-pages-block__subtitle">
                        Стоимость доставки в зависимости от региона и суммы заказа
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

                        <template v-slot:thead-before>
                            <tr class="v-table__row v-table__row--head">
                                <th class="v-table__row-th">Регион</th>
                                <th class="v-table__row-th" colspan="2">Курьером,&nbsp;₽</th>
                                <th class="v-table__row-th" colspan="2">В пункт выдачи заказов (ПВЗ),&nbsp;₽</th>
                                <th class="v-table__row-th">Любая доставка</th>
                            </tr>
                        </template>

                        <template v-slot:column-region>&nbsp;</template>
                        <template v-slot:column-deliverydo>до 6&nbsp;000&nbsp;₽</template>
                        <template v-slot:column-deliveryot>от 6&nbsp;000&nbsp;₽</template>
                        <template v-slot:column-pickupdo>до 6&nbsp;000&nbsp;₽</template>
                        <template v-slot:column-pickupot>от 6&nbsp;000&nbsp;₽</template>
                        <template v-slot:column-ot>от 12&nbsp;000&nbsp;₽</template>
                    </v-table>
                    <template v-else>
                        <div class="info-pages-block__card" v-for="item in items" :key="item.region">
                            <info-row name="Регион" :value="item.region" />
                            <info-row name="Курьером до 6&nbsp;000&nbsp;₽" :value="item.deliverydo" />
                            <info-row name="Курьером от 6&nbsp;000&nbsp;₽" :value="item.deliveryot" />
                            <info-row name="В пункт выдачи заказов (ПВЗ) до 6&nbsp;000&nbsp;₽" :value="item.pickupdo" />
                            <info-row name="В пункт выдачи заказов (ПВЗ) от 6&nbsp;000&nbsp;₽" :value="item.pickupot" />
                            <info-row name="Любая доставка от 12&nbsp;000&nbsp;₽" :value="item.ot" />
                        </div>
                    </template>
                </div>

                <div class="container">
                    <p><strong>Точные сроки доставки будут рассчитаны при оформлении заказа</strong></p>
                    <br />
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <h3 class="info-pages-block__subtitle">Получение заказа при курьерской доставке</h3>
                    <ol class="list">
                        <li>
                            В день доставки поступит информационное сообщение с номером заказа и временем доставки.
                        </li>
                        <li>
                            Сотрудник службы доставки позвонит за 1 час до времени доставки. Уточни, если необходима бесконтактная доставка.
                        </li>
                        <li>
                            Приготовь паспорт или документ, удостоверяющий личность получателя.
                        </li>
                        <li>
                            По адресу доставки курьер находится до 15 минут, отведенных на встречу с клиентом, осмотр и проверку содержимого заказа. При получении заказа подпиши накладные. Для соблюдения эпидемиологических норм используй свою ручку.
                        </li>
                    </ol>

                    <br />

                    <h3 class="info-pages-block__subtitle">Получение заказа при самовывозе</h3>
                    <ol class="list">
                        <li>
                            В день доставки заказа в Пункт Выдачи Заказов (ПВЗ) или Постамат от службы доставки поступит информационное сообщение с номером заказа, адресом и режимом работы пункта самовывоза, а также кодом получения при выдаче в постамате
                        </li>
                        <li>
                            Приходи в выбранный пункт самовывоза
                        </li>
                        <li>
                            ПВЗ:
                            <ol class="list list--lower-alpha">
                                <li>
                                    Назови номер заказа сотруднику ПВЗ
                                </li>
                                <li>
                                    Предъяви паспорт на имя получателя
                                </li>
                                <li>
                                    Осмотри выданный заказ и проверь его содержимое
                                </li>
                                <li>
                                    Подпиши накладную и передай сотруднику пункта выдачи.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Постамат:
                            <ol class="list list--lower-alpha">
                                <li>
                                    Выбери на экране Постамата пункт «Забрать заказ»
                                </li>
                                <li>
                                    Введи код получения из информационного сообщения. На каждое отправление из заказа понадобится отдельный код
                                </li>
                                <li>
                                    Нажми «Получить»
                                </li>
                                <li>
                                    Забери заказ из открывшейся ячейки постамата.
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

import './InfoPage.css';
import { convertObjectToMetaProperties } from '@util';

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
            meta: convertObjectToMetaProperties({
                description:
                    'Описание условий и способов оплат и доставок на маркетплейсе для мастеров бьюти-индустрии',
            }),
        };
    },

    data() {
        return {
            columns: ['region', 'deliverydo', 'deliveryot', 'pickupdo', 'pickupot', 'ot'],
            items: [
                {
                    region: 'Москва',
                    deliverydo: 399,
                    deliveryot: 299,
                    pickupdo: 199,
                    pickupot: 149,
                    ot: 'Бесплатно',
                    timing: '1-2 дня',
                },
                {
                    region: 'Московская область',
                    deliverydo: 399,
                    deliveryot: 299,
                    pickupdo: 199,
                    pickupot: 149,
                    ot: 'Бесплатно',
                    timing: '1-3 дня',
                },
                {
                    region: 'Санкт-Петербург и Ленинградская область',
                    deliverydo: 399,
                    deliveryot: 299,
                    pickupdo: 199,
                    pickupot: 149,
                    ot: 'Бесплатно',
                    timing: '2-3 дня',
                },
                {
                    region: 'Центральный федеральный округ',
                    deliverydo: 599,
                    deliveryot: 499,
                    pickupdo: 299,
                    pickupot: 199,
                    ot: 'Бесплатно',
                    timing: '2-4 дня',
                },
                {
                    region:
                        'Северо-Западный федеральный округ, за исключением Санкт-Петербурга и Ленинградской области',
                    deliverydo: 599,
                    deliveryot: 499,
                    pickupdo: 299,
                    pickupot: 199,
                    ot: 'Бесплатно',
                    timing: '4-7 дней',
                },
                {
                    region: 'Южный федеральный округ',
                    deliverydo: 599,
                    deliveryot: 499,
                    pickupdo: 299,
                    pickupot: 199,
                    ot: 'Бесплатно',
                    timing: '3-5 дня',
                },
                {
                    region: 'Приволжский федеральный округ',
                    deliverydo: 599,
                    deliveryot: 499,
                    pickupdo: 299,
                    pickupot: 199,
                    ot: 'Бесплатно',
                    timing: '3-5 дня',
                },
                {
                    region: 'Северо-Кавказский федеральный округ',
                    deliverydo: 699,
                    deliveryot: 599,
                    pickupdo: 349,
                    pickupot: 249,
                    ot: 'Бесплатно',
                    timing: '4-6 дней',
                },
                {
                    region: 'Уральский федеральный округ',
                    deliverydo: 699,
                    deliveryot: 599,
                    pickupdo: 349,
                    pickupot: 249,
                    ot: 'Бесплатно',
                    timing: '5-7 дней',
                },
                {
                    region: 'Сибирский федеральный округ',
                    deliverydo: 699,
                    deliveryot: 599,
                    pickupdo: 349,
                    pickupot: 249,
                    ot: 'Бесплатно',
                    timing: '7-14 дней',
                },
                {
                    region: 'Дальневосточный федеральный округ',
                    deliverydo: 899,
                    deliveryot: 799,
                    pickupdo: 649,
                    pickupot: 549,
                    ot: 'Бесплатно',
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
