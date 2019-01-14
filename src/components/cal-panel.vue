<template>
<div class="cal-wrapper">
  <!-- <span @click="setToday">HOJE</span> -->

  <div class="cal-header" v-show="showHeader">
    <div class="l" @click="preMonth">
      <span>&lt;</span>
    </div>
    <div class="title">{{curYearMonth}}</div>
    <div class="r" @click="nextMonth">
      <span>&gt;</span>
    </div>
  </div>

  <div class="cal-body">

    <div class="weeks">
      <!-- <span v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames" class="item" :key="dayIndex">
        {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
      </span> -->

      <!-- tomara que nao bug -->
      <span class="item">S</span>
      <span class="item">T</span>
      <span class="item">Q</span>
      <span class="item">Q</span>
      <span class="item">S</span>
      <span class="item">S</span>
      <span class="item">D</span>

    </div>

    <div class="dates">
      <!-- <div v-for="date in dayList" class="item" :class="[{
            today: date.status ? (today == date.date) : false,
            other: date.status ? ((today == date.date) && (date.title)) : false,
            lab: date.status ? ((today != date.date) && date.title && date.title.includes('Unit')) : false,
            conversation: date.status ? ((today != date.date) && date.title && !date.title.includes('Unit')) : false,
            [calendar.options.className] : (date.date == selectedDay)
          }, isToday(date)]" :key="date.date"> -->
      <div v-for="date in dayList" class="item" :class="[
            !date.status ? 'normal' :
            ((today == date.date) && (!date.title || (date.title && !date.title.includes('Unit')))) ? 'today' :
            ((today == date.date) && date.title && date.title.includes('Unit')) ? 'other' :
            ((today != date.date) && date.title && date.title.includes('Unit')) ? 'lab' :
            ((today != date.date) && date.title && !date.title.includes('Unit')) ? 'conversation' : 'normal'
          ]" :key="date.date">

        <!-- @click="handleChangeCurday(date)" -->
        <!-- <p class="date-num" :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}"> -->
        <p class="date-num" :style="{color: !date.status ? '#ccc' : 'inherit'}">
          {{date.date.split('/')[2]}}</p>
        <!-- <span v-if="(today == date.date)" class="is-normal"></span> -->
        <span v-if="date.status ? (today == date.date) && (!date.title || (date.title && !date.title.includes('Unit'))) : false" class="is-today"></span>
        <span v-else-if="date.status ? (date.classStatus == 'F') : false" class="is-finished"></span>
        <span v-else-if="date.status ? (date.title) : false" class="is-event"></span>
        <span v-else class="is-normal"></span>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import i18n from '../i18n.js'
import { dateTimeFormatter, isEqualDateStr } from '../tools.js'

const inBrowser = typeof window !== 'undefined'
export default {
  name: 'cal-panel',
  data() {
    return {
      locale: 'pt-br',
      i18n
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: String,
      required: false
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    dayList() {
      let firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1)
      let dayOfWeek = firstDay.getDay()
      // 根据当前日期计算偏移量 // Calculate the offset based on the current date
      if (this.calendar.options.weekStartOn > dayOfWeek) {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
      } else if (this.calendar.options.weekStartOn < dayOfWeek) {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
      }

      let startDate = new Date(firstDay)
      startDate.setDate(firstDay.getDate() - dayOfWeek)

      let item, status, tempArr = [],
        tempItem
      for (let i = 0; i < 42; i++) {
        item = new Date(startDate);
        item.setDate(startDate.getDate() + i);

        if (this.calendar.params.curMonth === item.getMonth()) {
          status = 1
        } else {
          status = 0
        }
        tempItem = {
          date: `${item.getUTCFullYear()}/${(item.getUTCMonth() + 1) > 9 ? (item.getUTCMonth() + 1) : `0${item.getUTCMonth() + 1}` }/${item.getUTCDate() > 9 ? item.getUTCDate() : `0${item.getUTCDate()}`}`,
          status: status,
          customClass: []
        }
        this.events.forEach((event) => {
          if (isEqualDateStr(event.date, tempItem.date)) {
            tempItem.title = event.title
            tempItem.desc = event.desc || ''
            tempItem.classStatus = event.classStatus == 'F' ? event.classStatus : 'A'
            if (event.customClass) tempItem.customClass.push(event.customClass)
          }
        })
        tempArr.push(tempItem)
      }
      console.log(tempArr)
      return tempArr
    },
    today() {
      let date = new Date()
      return `${date.getUTCFullYear()}/${(date.getUTCMonth() + 1) > 9 ? (date.getUTCMonth() + 1) : `0${date.getUTCMonth() + 1}` }/${date.getUTCDate() > 9 ? date.getUTCDate() : `0${date.getUTCDate()}`}`
    },
    curYearMonth() {
      let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    customColor() {
      return this.calendar.options.color
    }
  },
  methods: {
    setToday() {
      this.$EventCalendar.currentDay()
      this.$emit('month-changed', this.curYearMonth)
    },
    nextMonth() {
      this.$EventCalendar.nextMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    preMonth() {
      this.$EventCalendar.preMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    handleChangeCurday(date) {
      if (date.status) {
        this.$emit('cur-day-changed', date.date)
      }
    },
    // isToday (data) {
    //   if (!data.title) return
    //   const index = this.events.findIndex(e => (e.date == data.date) && (e.title == data.title))
    //   if ((data.date == this.today) && (index >= 0)) return 'conversation'
    //   switch (index % 2) {
    //     case 0:
    //       return 'lab'
    //       break;
    //     case 1:
    //       return 'other'
    //       break;
    //     default:
    //       return
    //   }
    // }
  }
}
</script>

<style>
  @import '../assets/css/main.css';
</style>
