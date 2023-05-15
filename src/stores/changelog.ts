import { defineStore } from 'pinia'
import { getAllVersions } from '@/api/versions'
import type { LogsByType, Version } from '@/types'
import { LogType } from '@/types'
import { getLogsByVersionIdAndType } from '@/api/logs'

export const useChangelogStore = defineStore('changelog', {
  state: () => ({
    versions: [] as Version[] | [],
    logs: [] as LogsByType[],
    currentVersionId: null as number | null
  }),
  getters: {
    getVersions(state) {
      return state.versions
    },
    getCurrentVersion(state) {
      return state.currentVersionId
    },
    getLogsByType(state) {
      return state.logs
    }
  },
  actions: {
    async fetchVersions(): Promise<void> {
      try {
        this.versions = await getAllVersions()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    dispatchCurrentVersion(id: number) {
      this.currentVersionId = id
    },
    async fetchLogs() {
      for (const type in LogType) {
        await this.fetchLogsByType(<LogType>type.toLowerCase())
      }
    },
    async fetchLogsByType(type: LogType): Promise<void> {
      if (!this.currentVersionId) return

      try {
        const logsByType = await getLogsByVersionIdAndType(this.currentVersionId, type)
        if (logsByType) {
          // Find index from an array of {Log[]}
          const index = this.logs.findIndex((logs) => logs.type === type)
          index >= 0
            ? // Override existing index
              (this.logs[index] = { type: type, logs: logsByType })
            : // Push a new entry in array
              this.logs.push({
                type: type,
                logs: logsByType
              })
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
