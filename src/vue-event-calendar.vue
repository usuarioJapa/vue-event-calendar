<template>
<div class="__vev_calendar-wrapper">
  <cal-panel :events="events" :calendar="calendarOptions" :selectedDay='selectedDayEvents.date' :locale="locale" @cur-day-changed="handleChangeCurDay" @month-changed="handleMonthChanged"></cal-panel>

  <cal-events :title="title" :dayEvents="selectedDayEvents" :locale="'pt-br'" :color="calendarOptions.options.color">
    <slot :showEvents="selectedDayEvents.events"></slot>
  </cal-events>

</div>
</template>

<script>
import { isEqualDateStr } from './tools.js'

import calEvents from './components/cal-events.vue'
import calPanel from './components/cal-panel.vue'

const inBrowser = typeof window !== 'undefined'
export default {
  name: 'vue-event-calendar',
  components: {
    'cal-events': calEvents,
    'cal-panel': calPanel
  },
  data() {
    return {
      locale: 'pt-br',
      selectedDayEvents: {
        date: 'all',
        events: this.events || [] //default show all event
      }
    }
  },
  props: {
    title: String,
    events: {
      type: Array,
      required: true,
      default: [],
      validator(events) {
        let validate = true
        events.forEach((event, index) => {
          if (!event.date) {
            console.error('Vue-Event-Calendar-Error:' + 'Prop events Wrong at index ' + index)
            validate = false
          }
        })
        return validate
      }
    }
  },
  computed: {
    calendarOptions() {
      let dateObj = new Date()
      if (inBrowser) {
        return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA
      } else {
        return {
          options: {
            locale: 'pt-br',
            color: ' #ff4455'
          },
          params: {
            curYear: dateObj.getFullYear(),
            curMonth: dateObj.getMonth(),
            curDate: dateObj.getDate(),
            curEventsDate: 'all'
          }
        }
      }
    },
    calendarParams() {
      let dateObj = new Date()
      if (inBrowser) {
        return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA.params
      } else {
        return {
          curYear: dateObj.getFullYear(),
          curMonth: dateObj.getMonth(),
          curDate: dateObj.getDate(),
          curEventsDate: 'all'
        }
      }
    }
  },
  created() {
    if (this.calendarParams.curEventsDate !== 'all') {
      this.handleChangeCurDay(this.calendarParams.curEventsDate)
    }
  },
  methods: {
    handleChangeCurDay(date) {
      let events = this.events.filter(function(event) {
        return isEqualDateStr(event.date, date)
      })
      if (events.length > 0) {
        this.selectedDayEvents = {
          date: date,
          events: events
        }
      }
      this.$emit('day-changed', {
        date: date,
        events: events
      })
    },
    handleMonthChanged(yearMonth) {
      this.$emit('month-changed', yearMonth)
    }
  },
  watch: {
    calendarParams() {
      if (this.calendarParams.curEventsDate !== 'all') {
        let events = this.events.filter(event => {
          return isEqualDateStr(event.date, this.calendarParams.curEventsDate)
        })
        this.selectedDayEvents = {
          date: this.calendarParams.curEventsDate,
          events
        }
      } else {
        this.selectedDayEvents = {
          date: 'all',
          events: this.events
        }
      }
    },
    events() {
      this.selectedDayEvents = {
        date: 'all',
        events: this.events || []
      }
    }
  }
}
</script>
<style lang="less">
@base-orange: #ff4455;
@white: #ffffff;
@gray: #e0e0e0;
@gray-dark: #b1b1b1;
@large-padding: 15px;
@small-padding: 10px;

@icon-border-size: 1px;

.__vev_calendar-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    * {
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 2px rgba(0,0,0,.2);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(0,0,0,.2);
    }
    .cal-wrapper {
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-basis: 300px;
        position: relative;
        border: 1px solid #ddd;
        .cal-header {
            position: relative;
            font-weight: 500;
            overflow: hidden;
            padding-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            margin-bottom: 10px;

            .title {}
            .l {
                cursor: pointer;
                user-select: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
            .r {
                cursor: pointer;
                user-select: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
        }
        .cal-body {
            width: 100%;
            .weeks {
                width: 100%;
                overflow: hidden;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .item {
                  background: #FFA200!important;
                  background: linear-gradient(-206deg, #FFA200 0%, #FFAC00 100%)!important;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .dates {
                width: 100%;
                overflow: hidden;
                text-align: center;
                font-size: 1rem;
                .item {
                    position: relative;
                    float: left;
                    display: block;
                    width: 14.285%;
                    cursor: default;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    line-height: 40px;
                    .date-num {
                        font-size: 1rem;
                        position: relative;
                        z-index: 3;
                    }
                    &.event {
                        cursor: pointer;
                    }
                    &.selected-day {
                        .is-event {
                            background-color: @base-orange;
                        }
                    }
                    .is-event {
                        content: '';
                        border: 1px solid @base-orange;
                        background-color: #fff;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        z-index: 1;
                        margin-left: -15px;
                        margin-top: -15px;
                    }
                    .is-today {
                        content: '';
                        background-color: @base-orange;
                        border-radius: 50%;
                        opacity: 0.8;
                        width: 12px;
                        height: 4px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        z-index: 2;
                        margin-left: -6px;
                        margin-top: 8px;
                    }
                }
            }
        }
    }
    .events-wrapper {
        border-radius: 4px;
        flex-grow: 2;
        flex-basis: 300px;
        border: 1px solid #ddd;
        padding: 20px;
        box-sizing: border-box;
        .cal-events {
            height: 95%;
            overflow-y: auto;
            padding: 0 5px;
            margin: 15px 0;
        }
        .date {
            text-align: center;
            color: #333;
            font-size: 20px;
        }
        .event-item {
            color: #323232;
            margin-top: 10px;
            &:first-child {
                margin-top: 0;
            }
        }
    }
    .arrow-left.icon {
        color: #000;
        position: absolute;
        left: 6%;
    }
    .arrow-left.icon:before {
        content: '';
        position: absolute;
        left: 1px;
        top: -5px;
        width: 10px;
        height: 10px;
        border-top: solid @icon-border-size currentColor;
        border-right: solid @icon-border-size currentColor;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }
    .arrow-right.icon {
        color: #000;
        position: absolute;
        right: 6%;
    }
    .arrow-right.icon:before {
        content: '';
        position: absolute;
        right: 1px;
        top: -5px;
        width: 10px;
        height: 10px;
        border-top: solid @icon-border-size currentColor;
        border-right: solid @icon-border-size currentColor;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    h3,
    p {
        margin: 0;
        padding: 0;
    }
}
</style>
