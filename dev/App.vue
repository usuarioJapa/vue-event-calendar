<template>
<div id="app">
  <div class="width-content">
    <vue-event-calendar :events="demoEvents" @day-changed="handleDayChanged" :local="locale" @month-changed="handleMonthChanged"></vue-event-calendar>
  </div>
</div>
</template>

<script>
let today = new Date()
export default {
  name: 'app',
  data() {
    return {
      locale: 'pt-br',
      demoEvents: [
        {
        date: `2018/11/10`,
        time: '15:00',
        title: 'Aulas de conversaçōes',
        desc: 'Today',
        classStatus: 'F'
      },
        {
        date: `2018/11/20`,
        time: '15:30',
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho'
      },
        {
        date: `2018/11/23`,
        time: '17:00',
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho'
      }
    ]
    }
  },
  methods: {
    handleDayChanged(data) {},
    handleMonthChanged(data) {}
  }
}
</script>

<style lang="less">
</style>
