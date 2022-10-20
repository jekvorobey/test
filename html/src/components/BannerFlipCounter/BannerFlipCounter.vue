<template>
    <div class="container flip-clock">

        <div v-if="timeToStart">
            <div :style="{color: titleColor}" class="flip-title" v-if="title">
                {{title}}
            </div>
            <div>
                <template v-for="(data, index) in timeData">
                <span v-bind:key="data.label" class="flip-clock__piece" :id="data.elementId" v-show="data.show &&
                !data.isZero && data.current !== 0 || (data.current === 0 && data.type === 'seconds')">
                    <span class="flip-clock__card flip-card" :style="countdownSize ? `font-size:${countdownSize}` : ''">
                        <b
                                :style="{color: numColor, background: cardTopBackground}"
                                class="flip-card__top">
                            {{ data.current | twoDigits }}
                        </b>
                        <b
                                :style="{color: numColor, background: cardBottomBackground}"
                                class="flip-card__bottom"
                                v-bind:data-value="data.current | twoDigits"
                        ></b>
                        <b :style="{color: numColor}" class="flip-card__back"
                           v-bind:data-value="data.previous | twoDigits"></b>
                        <b :style="{color: numColor,  background: cardBottomBackground}" class="flip-card__back-bottom"
                           v-bind:data-value="data.previous | twoDigits"></b>
                    </span>

                    <span
                            v-if="index === 0"
                            class="flip-clock__slot"
                            :style="labelSize ? `font-size:${labelSize}` : ''">{{ daysNoun }}</span>
                     <span v-if="index === 1"
                           class="flip-clock__slot"
                           :style="labelSize ? `font-size:${labelSize}` : ''">{{ hoursNoun }}</span>
                     <span v-if="index === 2"
                           class="flip-clock__slot"
                           :style="labelSize ? `font-size:${labelSize}` : ''">{{ minutesNoun }}</span>
                     <span v-if="index === 3"
                           class="flip-clock__slot"
                           :style="labelSize ? `font-size:${labelSize}` : ''">{{ secondsNoun }}</span>
                </span>
                </template>
            </div>
        </div>

        <div>
            <style>
                :root {
                    --cardTopBackground: {{ this.cardTopBackground }}
                }
            </style>
        </div>
    </div>
</template>

<script>
    import {v4 as uuidv4} from 'uuid';

    export default {
        name: 'BannerFlipCounter',
        props: {
            title: {
                type: String,
                required: false
            },
            titleColor: {
                type: String,
                required: false,
                default: '#000000'
            },
            numColor: {
                type: String,
                required: false,
                default: '#fff'
            },
            cardTopBackground: {
                type: String,
                required: false,
                default: '#222'
            },
            cardBottomBackground: {
                type: String,
                required: false,
                default: '#393939'
            },
            deadline: {
                type: String,
            },
            stop: {
                type: Boolean,
            },
            showDays: {
                type: Boolean,
                required: false,
                default: true,
            },
            showHours: {
                type: Boolean,
                required: false,
                default: true,
            },
            showMinutes: {
                type: Boolean,
                required: false,
                default: true,
            },
            showSeconds: {
                type: Boolean,
                required: false,
                default: true,
            },
            labels: {
                type: Object,
                required: false,
                default: function () {
                    return {
                        days: 'Дней',
                        hours: 'Часов',
                        minutes: 'Минут',
                        seconds: 'Секунд',
                    };
                },
            },
            countdownSize: {
                type: String,
                required: false,
            },
            labelSize: {
                type: String,
                required: false,
            },
        },
        data() {
            const uuid = uuidv4();
            return {
                timeToStart: false,
                now: Math.trunc(new Date().getTime() / 1000),
                date: null,
                interval: null,
                diff: 0,
                show: false,
                timeData: [
                    {
                        type: 'days',
                        isZero: false,
                        current: 0,
                        previous: 0,
                        label: this.labels.days,
                        elementId: 'flip-card-days-' + uuid,
                        show: this.showDays,
                    },
                    {
                        type: 'hours',
                        isZero: false,
                        current: 0,
                        previous: 0,
                        label: this.labels.hours,
                        elementId: 'flip-card-hours-' + uuid,
                        show: this.showHours,
                    },
                    {
                        type: 'minutes',
                        isZero: false,
                        current: 0,
                        previous: 0,
                        label: this.labels.minutes,
                        elementId: 'flip-card-minutes-' + uuid,
                        show: this.showMinutes,
                    },
                    {
                        type: 'seconds',
                        current: 0,
                        previous: 0,
                        label: this.labels.seconds,
                        elementId: 'flip-card-seconds-' + uuid,
                        show: this.showSeconds,
                    },
                ],
            };
        },
        methods: {
            getNoun(number, one, two, five) {
                let n = Math.abs(number)

                n %= 100
                if (n >= 5 && n <= 20) return five

                n %= 10
                if (n === 1) return one

                if (n >= 2 && n <= 4) return two

                return five
            },

            updateAllCards() {
                this.updateTime(0, this.days);
                this.updateTime(1, this.hours);
                this.updateTime(2, this.minutes);
                this.updateTime(3, this.seconds);
            },
            updateTime(idx, newValue) {
               if (this.timeToStart) {
                   if (idx >= this.timeData.length || newValue === undefined) {
                       return;
                   }

                   if (window['requestAnimationFrame']) {
                       this.frame = requestAnimationFrame(this.updateTime.bind(this));
                   }

                   if (newValue === 0 && idx === 0) {
                       this.timeData[idx].isZero = true;
                   }

                   if (newValue === 0 && idx === 1) {
                       if(this.timeData[0].isZero === true){
                           this.timeData[idx].isZero = true;
                       }
                   }

                   if (newValue === 0 && idx === 2) {
                       if(this.timeData[0].isZero === true && this.timeData[1].isZero === true){
                           this.timeData[idx].isZero = true;
                       }
                   }

                   if (newValue === 0 && idx === 3) {
                       if(this.timeData[0].isZero === true && this.timeData[1].isZero === true && this.timeData[2].isZero === true){
                           this.timeData[idx].isZero = true;
                       }
                   }

                   const d = this.timeData[idx];
                   const val = newValue < 0 ? 0 : newValue;
                   const el = document.querySelector(`#${d.elementId}`);

                   if (val !== d.current) {
                       d.previous = d.current;
                       d.current = val;

                       if (el) {
                           el.classList.remove('flip');
                           void el.offsetWidth;
                           el.classList.add('flip');
                       }

                       if (idx === 0) {
                           try {
                               const els = el.querySelectorAll('span b');
                               if (els) {
                                   for (let e of els) {
                                       const cls = e.classList[0];
                                       if (newValue / 1000 >= 1) {
                                           if (!cls.includes('-4digits')) {
                                               const newCls = cls + '-4digits';
                                               e.classList.add(newCls);
                                               e.classList.remove(cls);
                                           }
                                       } else {
                                           if (cls.includes('-4digits')) {
                                               const newCls = cls.replace('-4digits', '');
                                               e.classList.add(newCls);
                                               e.classList.remove(cls);
                                           }
                                       }
                                   }
                               }
                           } catch (e) {
                               console.log(e)
                           }
                       }
                   }
               }
            },
        },
        computed: {
            // timeEnded() {
            //     return this.timeData[0].isZero && this.timeData[1].isZero && this.timeData[2].isZero && this.timeData[3].current === 0
            // },
            seconds() {
                return Math.trunc(this.diff) % 60;
            },
            minutes() {
                return Math.trunc(this.diff / 60) % 60;
            },
            hours() {
                return Math.trunc(this.diff / 60 / 60) % 24;
            },
            days() {
                return Math.trunc(this.diff / 60 / 60 / 24);
            },
            daysNoun() {
                return this.getNoun(this.days, 'День', 'Дня', 'Дней')
            },
            hoursNoun() {
                return this.getNoun(this.hours, 'Час', 'Часа', 'Часов')
            },
            minutesNoun() {
                return this.getNoun(this.minutes, 'Минуты', 'Минуты', 'Минут')
            },
            secondsNoun() {
                return this.getNoun(this.seconds, 'Секунда', 'Секунды', 'Секунд')
            },
        },
        watch: {
            deadline: function (newVal, oldVal) {
                const endTime = this.deadline;
                this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
                if (!this.date) {
                    throw new Error("Invalid props value, correct the 'deadline'");
                }
            },
            now(value) {
                this.diff = this.date - this.now;
                if (this.diff <= 0 || this.stop) {
                    this.diff = 0;
                    this.updateTime(3, 0);
                } else {
                    this.updateAllCards();
                }
            },
            diff(value) {
                if (value === 0) {
                    this.$emit('timeElapsed');
                    this.updateAllCards();
                }
            },
        },
        filters: {
            twoDigits(value) {
                if (value.toString().length <= 1) {
                    return '0' + value.toString();
                }
                return value.toString();
            },
        },
        created() {
            if (!this.deadline) {
                throw new Error("Missing props 'deadline'");
            }
            const endTime = this.deadline;
            this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
            if (!this.date) {
                throw new Error("Invalid props value, correct the 'deadline'");
            }
            this.interval = setInterval(() => {
                this.now = Math.trunc(new Date().getTime() / 1000);
            }, 1000);
        },
        mounted() {
            if (this.diff !== 0) {
                this.show = true;
            }
            setTimeout( () => {
                this.timeToStart = true
            }, 400)
        },
        beforeDestroy() {
            if (window['cancelAnimationFrame']) {
                cancelAnimationFrame(this.frame);
            }
        },
        destroyed() {
            clearInterval(this.interval);
        },
    };
</script>

<style scoped>
    b, strong {
        line-height: 1 !important;
    }

    .flip-title {
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
        margin: 10px 0 15px;
    }

    .flip-clock {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 5px;
        left: calc(50% - 300px);
        z-index: 999999;
        text-align: center;
        perspective: 600px;
        margin: 0 auto;
        width: 600px;
    }

    .flip-clock *, .flip-clock *:before, .flip-clock *:after {
        box-sizing: border-box;
    }

    .flip-clock__piece {
        display: inline-block;
        margin: 0 0.2vw;
    }

    @media (min-width: 1000px) {
        .flip-clock__piece {
            margin: 0 5px;
        }
    }

    .flip-clock__slot {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.5;
        display: block;
    }

    .flip-card {
        display: block;
        position: relative;
        padding-bottom: 0.72em;
        font-size: 2rem;
        line-height: 0.95;
    }

    @media (min-width: 1000px) {
        .flip-clock__slot {
            font-size: 0.8rem;
            font-weight: 400;
        }

        .flip-card {
            font-size: 2rem;
        }
    }

    .flip-card__top, .flip-card__bottom, .flip-card__back-bottom, .flip-card__back::before, .flip-card__back::after {
        display: block;
        height: 0.72em;
        padding: 0.23em 0.15em 0.4em;
        border-radius: 0.15em 0.15em 0 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform-style: preserve-3d;
        width: 2.1em;
    }

    .flip-card__top-4digits, .flip-card__bottom-4digits, .flip-card__back-bottom-4digits, .flip-card__back-4digits::before, .flip-card__back-4digits::after {
        display: block;
        height: 0.72em;
        padding: 0.23em 0.15em 0.4em;
        border-radius: 0.15em 0.15em 0 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform-style: preserve-3d;
        width: 2.65em;
    }
    .flip .flip-card__back-4digits:before, .flip .flip-card__back:before {
        background: var(--cardTopBackground);
    }
    .flip-card__bottom, .flip-card__back-bottom, .flip-card__bottom-4digits, .flip-card__back-bottom-4digits {
        position: absolute;
        top: 50%;
        left: 0;
        border-top: solid 1px #000;
        border-radius: 0 0 0.15em 0.15em;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
    }

    .flip-card__back-bottom, .flip-card__back-bottom-4digits {
        z-index: 1;
    }

    .flip-card__bottom::after, .flip-card__back-bottom::after, .flip-card__bottom-4digits::after, .flip-card__back-bottom-4digits::after {
        display: block;
        margin-top: -0.72em;
    }

    .flip-card__back::before, .flip-card__bottom::after, .flip-card__back-bottom::after, .flip-card__back-4digits::before, .flip-card__bottom-4digits::after, .flip-card__back-bottom-4digits::after {
        content: attr(data-value);
    }

    .flip-card__back, .flip-card__back-4digits {
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        pointer-events: none;
    }

    .flip-card__back::before, .flip-card__back-4digits::before {
        position: relative;
        overflow: hidden;
        z-index: -1;
    }

    .flip .flip-card__back::before, .flip .flip-card__back-4digits::before {
        z-index: 1;
        animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
        animation-fill-mode: both;
        transform-origin: center bottom;
    }

    .flip .flip-card__bottom, .flip .flip-card__bottom-4digits {
        transform-origin: center top;
        animation-fill-mode: both;
        animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
    }

    @keyframes flipTop {
        0% {
            transform: rotateX(0deg);
            z-index: 2;
        }
        0%, 99% {
            opacity: 1;
        }
        100% {
            transform: rotateX(-90deg);
            opacity: 0;
        }
    }

    @keyframes flipBottom {
        0%, 50% {
            z-index: -1;
            transform: rotateX(90deg);
            opacity: 0;
        }
        51% {
            opacity: 1;
        }
        100% {
            opacity: 1;
            transform: rotateX(0deg);
            z-index: 5;
        }
    }
    @media (max-width: 768px) {
        .flip-title {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 500px) {
        .flip-clock {
            left: calc(50% - 150px);
            width: 300px;
        }
        .flip-card {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 375px) {
        .flip-title {
            font-size: 0.8rem;
            margin-bottom: 0;
        }
        .flip-card {
            font-size: 1.2rem;
        }
        .flip-clock__slot {
            display: none;
        }
    }
</style>
