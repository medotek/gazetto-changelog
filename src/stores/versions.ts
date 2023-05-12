import { defineStore } from 'pinia'
import {getAllVersions} from "@/api/versions";

export const useVersionStore = defineStore("version", {
    state: () => ({
        versions: [] as Version[] | [],
        // TODO : maybe store logs per version & type
    }),
    getters: {
        getVersions(state){
            return state.versions
        }
    },
    actions: {
        async fetchVersions() {
            try {
                this.versions = await getAllVersions()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }
    },
})
