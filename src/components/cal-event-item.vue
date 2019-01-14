<template>
<div class="wrapper"
     :class="[
        (event.classStatus == 'F') ? 'finished' :
        ((event.date == today) && event.title.includes('Unit')) ? 'other' :
        event.title.includes('Unit') ? 'lab' : 'conversation'
    ]">
  <div class="time">
    <!-- <p>{{dateTimeFormatter(Date.parse(new Date(event.date)),i18n[locale].fullFormat)}}</p> -->
    <p>{{event.time}}</p>
  </div>
  <div class="title">
    {{event.title}}
  </div>

</div>
</template>



<script>
import i18n from '../i18n.js'
import { dateTimeFormatter } from '../tools.js'
export default {
  data() {
    return {
      i18n
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    locale: {
      type: String,
      required: true
    }
  },
  computed: {
    today() {
      let date = new Date()
      return `${date.getUTCFullYear()}/${(date.getUTCMonth() + 1) > 9 ? (date.getUTCMonth() + 1) : `0${date.getUTCMonth() + 1}` }/${date.getUTCDate() > 9 ? date.getUTCDate() : `0${date.getUTCDate()}`}`
    }
  },
  methods: {
    dateTimeFormatter
  }
}
</script>
