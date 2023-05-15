<template>
  <ul class="log-wrapper">
    <li class="log-group" v-for="data in getLogs">
      <div class="log-date">{{ data.date }}</div>
      <ul>
        <li class="log-item" v-for="log in data.logs">
          <span :class="'log-label' + (log.isAnUpdate ? ' update' : '') ">[{{ log.isAnUpdate ? 'Mise à jour' : 'NEW' }}] <span v-if="log.kind">{{
              log.kind
            }}</span> : &nbsp;
          </span>
          <div class="log-description" v-if="log.kind" v-html="marked.parse(log.description)"></div>
          <div class="log-title" v-if="!log.kind && log.url"><a :href="log.url">{{ log.title }}</a></div>
        </li>
      </ul>
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
    ...mapState(useChangelogStore, ['logs']),
    getLogs: function (): { date: string, logs: Log[] }[] | null {
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

      return logsIndexForDate.map((dateStr) => ({
        date: dateStr,
        logs: logsByDate[dateStr]
      }));
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
  padding: 0;

  .log-group {
    border-radius: 5px;
    margin: 1rem 2rem 0.5rem 2rem;
    padding: 0.25rem;
    list-style-type: none;

    .log-date {
      //text-align: center;
      background: var(--gazette-gray);
      font-weight: bold;
      padding-left: 5px;
      color: var(--gazette-primary);
    }

    ul {
      padding: 0.25rem;

      > .log-item {
        display: flex;
        list-style-type: none;
        //margin: 0 2rem 0.5rem 2rem;
        padding: 0.25rem;

        .log-label {
          color: red;
          font-weight: bold;
        }

        .update {
          color: green;
        }
      }
    }
  }
}
</style>