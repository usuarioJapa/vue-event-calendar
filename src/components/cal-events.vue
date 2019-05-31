<template>
  <div class="events-wrapper">
    <div class="cal-events">

      <slot>
        <div v-for="(event, index) in filteredEvents" class="event-item">
          <cal-event-item :event="event" :index="index" :locale="locale"></cal-event-item>
        </div>
        <div class="button container">
          <!-- <button type="button" name="button" class="btn">
            <span>MARCAR NOVA AULA PRESENCIAL</span>
            <svg class="svg-inline--fa fa-arrow-right fa-w-14 margin-left-5" aria-hidden="true" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </button> -->
          <div class="events-paging" v-if="events.length > 6">
            <!-- <button class="btn" type="button" name="button" @click="prev()" :disabled="curPage == 1">
              <img :src="require('../assets/img/back-icon.png')"/>
            </button> -->
            <p class="events-pages">
              <span
                v-for="page in pages"
                :class="{ current: curPage == page }"
                @click="curPage = page"
              >
                {{ page }}
              </span>
            </p>
            <!-- <button class="btn" type="button" name="button" @click="next()" :disabled="curPage == pages">
              <img :src="require('../assets/img/next-icon.png')"/>
            </button> -->
          </div>
        </div>
      </slot>

    </div>
  </div>
</template>

<script>
  import { cloneDeep } from 'lodash'
  import i18n from '../i18n.js'
  import { dateTimeFormatter } from '../tools.js'
  import calEventItem from './cal-event-item.vue'
  export default {
    name: 'cal-events',
    data() {
      return {
        i18n,
        curPage: 1
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
        },
        pages () {
          return Math.ceil(parseInt(this.events.length) / 6)
        },
        curIndex () {
          const page  = this.curPage - 1,
                quant = 6,
                index = page * quant

          return index
        },
        filteredEvents () {
          const events = cloneDeep(this.events).slice(this.curIndex, this.curIndex + 6)

          while (events.length < 6) {
            events.push(null)
          }

          return events
        },
        next () {
          if (this.curPage < this.pages) this.curPage++
        },
        prev () {
          if (this.curPage > 1) this.curPage--
        }
    },
    methods: {
      dateTimeFormatter,

      allEvents: function() {
        this.dayEvents.date = 'all'
      }
    },
    watch: {
      filteredEvents (val) {
        this.$nextTick()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .button {
    &.container {
      display: flex;
      // justify-content: space-between;
      justify-content: center;
      height: 39px;
      .events-paging {
        display: flex;
        align-self: flex-end;
        .events-pages {
          text-align: center;
          display: flex;
          span {
            cursor: pointer;
            display: flex;
            border-radius: 25px;
            background-color: #DDD;
            margin: 5px 5px;
            width: 34px;
            height: 34px;
            justify-content: center;
            align-items: center;
            &.current {
              background-color: #BBB;
            }
          }
        }
        button {
          padding: 0;
          width: 44px;
          height: 44px;
          img {
            margin: 0;
            padding: 5px;
            width: 37px;
            height: 37px;
          }
          &:disabled {
            cursor: not-allowed;
            background-color: #EEE;
          }
        }
      }
    }
  }

</style>
