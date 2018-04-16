<template>
<div id="app">
  <div class="width-content">
    <vue-event-calendar :events="demoEvents" @day-changed="handleDayChanged" :local="locale" @month-changed="handleMonthChanged"></vue-event-calendar>

    <!-- <vue-event-calendar :events="demoEvents">
      <template scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item">
            {{event}}
          </div>
        </template>
    </vue-event-calendar> -->

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
        date: `2018/04/10`,
        time: '15:00',
        title: 'Aulas de conversaçōes',
        desc: 'Today',
        type: 'conversation',
        customClass: 'conversation'
      },
        {
        date: `2018/04/20`,
        time: '15:30',
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho',
        type: 'lab',
        customClass: 'lab'
      },
        {
        date: `2018/04/22`,
        time: '17:00',
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho',
        type: 'other',
        customClass: 'other'
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

<style>

</style>
