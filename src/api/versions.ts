import axios from 'axios'
import type { Version } from '@/types'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

/**
 * Retrieve all genshin versions
 */
export async function getAllVersions(): Promise<Version[] | []> {
  const { data } = await axios.get(`${import.meta.env.VITE_API_GUDA_PUBLIC}/versions`, {
    headers: defaultHeaders
  })

  return data ?? []
}

/**
 * Retrieve a version by id
 * @param {number} id
 */
export async function getVersionById(id: number): Promise<Version | null> {
  const { data } = await axios.get(`${import.meta.env.VITE_API_GUDA_PUBLIC}/versions/${id}`, {
    headers: defaultHeaders
  })

  return data ?? null
}
