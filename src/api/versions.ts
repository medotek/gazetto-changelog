import axios from "axios";

/**
 * Retrieve all genshin versions
 */
export async function getAllVersions(): Promise<Version[]> {
    return await axios.get(`${import.meta.env.GUDA_PUBLIC}/versions`);
}

/**
 * Retrieve a version by id
 * @param {number} id
 */
export async function getVersionById(id: number): Promise<Version> {
    return await axios.get(`${import.meta.env.GUDA_PUBLIC}/versions/${id}`);
}
