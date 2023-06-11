<template>
  <div class="log-wrapper">
    <div class="log-group" v-for="data in getLogs">
      <div class="log-date">{{ data.date }}</div>
      <ul>
        <li class="log-item" v-for="log in data.logs">
          <span :class="'log-label' + (log.isAnUpdate ? ' update' : '') ">[{{ log.isAnUpdate ? 'Mise à jour' : 'NEW' }}] <span v-if="log.kind">{{
              log.kind
            }}</span> : &nbsp;
          </span>
          <div class="log-description" v-if="(log.kind || log.type === 'discord')" v-html="parseLogDescription(log.description)"></div>
          <div class="log-title" v-if="!log.kind && log.url"><a v-if="log.url" :href="log.url">{{ log.title }}</a><span v-if="!log.url">{{ log.title }}</span></div>
        </li>
      </ul>
    </div>
  </div>
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
  },
  methods: {
    parseLogDescription(description: string) {
      marked.use(gfmHeadingId())
      marked.use(mangle())

      const pattern = /<#([^>]+)>[^:]*:/gu;

      // Séparation du texte en lignes individuelles
      const lines = description.split('\n');

      // Parcourir chaque ligne
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Compter le nombre d'espaces au début de la ligne
        const spaceCount = line.search(/\S/);

        // Calcul du niveau de hiérarchie
        const level = Math.floor(spaceCount / 2) + 1;

        // Ajouter les espaces en fonction du niveau
        const spaces = ' '.repeat(level * 2);
        line = line.replace(/^\s+/, spaces);

        // Remplacement des descriptions et des sauts de ligne
        line = line.replace(pattern, '').replace(/\n/g, '<br/>');

        // Mettre à jour la ligne dans le tableau des lignes
        lines[i] = line;
      }

      // Réassembler les lignes en un seul texte
      const reformattedText = lines.join('\n');

      return marked.parse(reformattedText)
    }
  }
}
</script>

<style scoped lang="scss">
.log-wrapper {
  padding: 0;

  .log-group {
    border-radius: 5px;
    margin: 1rem 2rem 0 2rem;
    padding: 0.25rem;
    list-style-type: none;

    .log-date {
      background: var(--gazette-gray);
      font-weight: bold;
      padding-left: 5px;
      color: var(--gazette-primary);
    }

    ul {
      padding: 0.25rem;
      margin: 0;
      > .log-item {
        display: flex;
        list-style-type: none;
        //margin: 0 2rem 0.5rem 2rem;
        padding: 0.25rem;

        .log-label {
          color: red;
          font-weight: bold;
          min-width: max-content;
        }

        .log-description {
          padding-left: 0.5rem;
        }

        .update {
          color: green;
        }
      }
    }
  }
}
</style>
