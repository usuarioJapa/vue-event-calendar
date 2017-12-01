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
        date: `2017/12/10`,
        title: 'Aulas de conversaçōes',
        desc: 'Today',
        type: 'conversation'
      },
        {
        date: `2017/12/20`,
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho',
        type: 'lab'
      },
        {
        date: `2017/12/22`,
        title: 'Aulas de Lab Class',
        desc: 'Ho ho ho',
        type: 'other'
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
* {
  margin: 0;
  padding: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h1,
h2,
h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

a {
  color: #42b983;
}

.width-content {
  width: 800px;
  max-width: 90%;
  margin: 0 auto;
}

.cal-wrapper,
.events-wrapper {
  margin: 10px;
}
</style>
