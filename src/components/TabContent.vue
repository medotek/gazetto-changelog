<template>
  <ul class="log-wrapper">
    <li class="log-item" v-for="(logs, date) in getLogs" :key="date">
      <div>
        <ul>
          <li v-for="log in logs">{{log.description}}</li>
        </ul>
      </div>
<!--      <div class="log-left">-->
<!--        <div class="log-label">{{ log.isAnUpdate ? 'UPDATE' : 'NEW' }}</div>-->
<!--      </div>-->
<!--      <div class="log-right">-->
<!--        <div class="log-kind"><strong>{{ log.kind }}</strong></div>-->
<!--&lt;!&ndash;        <div class="log-description" v-html="marked.parse(log.description)"></div>&ndash;&gt;-->
<!--        <div class="log-date">{{ log.createdAt }}</div>-->
<!--      </div>-->
    </li>
  </ul>
</template>

<script lang="ts">
import {mapState} from 'pinia'
import {useChangelogStore} from '@/stores/changelog'
import type {LogType, Log} from '@/types'
import {marked} from 'marked'
import {gfmHeadingId} from 'marked-gfm-heading-id'
import {mangle} from 'marked-mangle'

export default {
  name: 'TabContent',
  props: ['logType'],
  computed: {
    ...mapState(useChangelogStore, ['currentVersionId', 'logs']),
    getLogs: function () : Log[][] | null {
      // @ts-ignore
      const logs = this.logs.find((item: { type: LogType }) => item.type === this.logType)?.logs;
      if (!logs || !logs.length) return null;

      const logsByDate: Record<string, Log[]> = {};
      const logsIndexForDate: string[] = [];

      for (const log of logs) {
        log.createdAt = log.createdAt.split('T')[0].split('-').reverse().join('/')
        if (!logsByDate[log.createdAt]) {
          logsByDate[log.createdAt] = [];
          logsIndexForDate.push(log.createdAt);
        }
        logsByDate[log.createdAt].push(log);
      }

      logsIndexForDate.sort((a, b) => new Date(a).getDate() - new Date(b).getDate());

      return logsIndexForDate.map((dateStr) => logsByDate[dateStr]);
    },
    marked: function () {
      marked.use(gfmHeadingId())
      marked.use(mangle())

      return marked
    }
  }
}
</script>

<style scoped lang="scss">
.log-wrapper {
  background: var(--gazette-gray);
  padding: 0;

  > .log-item {
    display: flex;
    background: var(--gazette-white);
    border: 1px solid var(--gazette-gray-darker);
    border-radius: 5px;
    list-style-type: none;
    margin: 0 2rem 0.5rem 2rem;
    padding: 0.25rem;

    .log-left {
      width: 5rem;

      .log-label {
        background-color: var(--gazette-primary);
        border-radius: 0.4rem;
        color: white;
        font-size: 10px;
        margin: 0 auto;
        padding: 3px 5px 3px 3px;
        width: min-content;
      }
    }

    .log-right {
    }

  }
}
</style>
