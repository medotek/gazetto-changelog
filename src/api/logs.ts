import axios from "axios";
import type {LogType, Log} from "@/types";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

/**
 * Retrieve all logs by version & type
 */
export async function getLogsByVersionIdAndType(versionId: number, type: LogType): Promise<Log[] | null> {
    const {data} = await axios.get(`${import.meta.env.VITE_API_GUDA_PUBLIC}/logs?version=${versionId}&type=${type}`, {
        headers: defaultHeaders
    });

    return data ?? []
}
