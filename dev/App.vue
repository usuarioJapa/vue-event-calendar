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
          date: `2019/01/10`,
          time: '15:00',
          title: 'Aulas de conversaçōes',
          desc: 'Today',
          classStatus: 'F'
        },
        {
          date: `2019/01/14`,
          time: '15:30',
          title: 'Unit 1',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/15`,
          time: '17:00',
          title: 'Aulas de Lab Class',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/16`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/18`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/16`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/16`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/16`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
        },
        {
          date: `2019/01/16`,
          time: '17:00',
          title: 'Unit 02',
          desc: 'Ho ho ho',
          classStatus: 'A'
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
