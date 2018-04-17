<template>
  <div class="events-wrapper">
    <div class="cal-events">

      <slot>
        <div v-for="(event, index) in events" class="event-item">
          <cal-event-item :event="event" :index="index" :locale="locale"></cal-event-item>
        </div>
        <div class="button">
          <button type="button" name="button" class="btn btn-full">
            <span>MARCAR NOVA AULA PRESENCIAL</span>
            <svg class="svg-inline--fa fa-arrow-right fa-w-14 margin-left-5" aria-hidden="true" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </button>
        </div>
      </slot>

    </div>
  </div>
</template>

<script>
  import i18n from '../i18n.js'
  import {
    dateTimeFormatter
  }
  from '../tools.js'
  import calEventItem from './cal-event-item.vue'
  export default {
    name: 'cal-events',
    data() {
      return {
        i18n
      }
    },
    components: {
      'cal-event-item': calEventItem
    },
    props: {
      title: String,
      dayEvents: {
        type: Object,
        required: true
      },
      locale: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },
    computed: {
      dayEventsTitle() {
          if (this.title) return this.title
          if (this.dayEvents.date !== 'all') {
            let tempDate
            if (this.dayEvents.events.length !== 0) {
              tempDate = Date.parse(new Date(this.dayEvents.events[0].date))
              return dateTimeFormatter(tempDate, i18n[this.locale].fullFormat)
            } else {
              tempDate = dateTimeFormatter(Date.parse(new Date(this.dayEvents.date)), i18n[this.locale].fullFormat)
              return `${tempDate} ${i18n[this.locale].notHaveEvents}`
            }
          } else {
            return i18n[this.locale].dayEventsTitle
          }
        },
        events() {
          return this.dayEvents.events
        },
        bgColor() {
          return {
            backgroundColor: this.color
          }
        }
    },
    methods: {
      dateTimeFormatter,

      allEvents: function() {
        this.dayEvents.date = 'all'
      }
    }
  }
</script>
