<template>
<div class="wrapper" :class="{lab : event.customClass === 'lab', other : event.customClass === 'other', conversation : event.customClass === 'conversation'}">
  <div class="time">
    <p>{{dateTimeFormatter(Date.parse(new Date(event.date)),i18n[locale].fullFormat)}}</p>
  </div>
  <div class="title">
    {{event.title}}
  </div>
  <!-- <div class="desc">
      <p>{{event.desc}}</p>
    </div> -->

</div>
</template>

<style lang="less" scoped>
.wrapper {
    display: flex;
    align-items: baseline;
    color: #323232;
    font-size: 12px;
    &.lab {
        .time,
        .title {
            background: #00B4BA!important;
            background: linear-gradient(-206deg, #00B4BA 0%, #00418A 100%)!important;
        }
    }
    &.other {
        .time,
        .title {
            background: #21A6A6!important;
            background: linear-gradient(-206deg, #21A6A6 0%, #A2F095 100%)!important;
        }
    }
    &.conversation {
        .time,
        .title {
            background: #4E6BFD!important;
            background: linear-gradient(-206deg, #4E6BFD 0%, #9A0EEC 100%)!important;
        }
    }
    .time {
        margin-right: 10px;
        color: #fff;
        font-weight: 700;
        border-radius: 20px;
        padding: 5px;
        font-size: 10px;
        line-height: 15px;
    }
    .title {
        flex-grow: 1;
        color: #fff;
        font-weight: 700;
        border-radius: 20px;
        padding: 5px 5px 5px 10px;
        box-sizing: border-box;
        line-height: 15px;
    }
    .desc {}
}

</style>

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
  methods: {
    dateTimeFormatter
  }
}
</script>
