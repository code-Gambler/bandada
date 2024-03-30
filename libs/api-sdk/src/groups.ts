import { request } from "@bandada/utils"
import { GroupRequest, GroupResponse, GroupUpdateRequest } from "./types"

const url = "/groups"

/**
 * Returns the list of groups.
 * @returns List of groups.
 */
export async function getGroups(config: object): Promise<GroupResponse[]> {
    const groups = await request(url, config)

    groups.map((group: any) => ({
        ...group,
        credentials: JSON.parse(group.credentials)
    }))

    return groups
}

/**
 * Creates a group with the provided details.
 * @param dto Object containing the details for the group to be created.
 * @param apiKey API Key of the admin.
 * @returns The created group.
 */
export async function createGroup(
    config: object,
    dto: GroupRequest,
    apiKey: string
): Promise<GroupResponse> {
    const newConfig: any = {
        method: "post",
        data: [dto],
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const groups = await request(url, newConfig)

    return groups[0]
}

/**
 * Creates one or more groups with the provided details.
 * @param dtos Array of objects containing the details for the groups to be created.
 * @param apiKey API Key of the admin.
 * @returns Array of the created groups.
 */
export async function createGroups(
    config: object,
    dtos: Array<GroupRequest>,
    apiKey: string
): Promise<Array<GroupResponse>> {
    const newConfig: any = {
        method: "post",
        data: {
            dtos
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const req = await request(url, newConfig)

    return req
}

/**
 * Removes the group.
 * @param groupId The group id.
 * @param apiKey API Key of the admin.
 */
export async function removeGroup(
    config: object,
    groupId: string,
    apiKey: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}`

    const newConfig: any = {
        method: "delete",
        data: {
            apiKey
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const req = await request(requestUrl, newConfig)

    return req
}

/**
 * Removes one or more groups.
 * @param groupsIds The groups ids.
 * @param apiKey API Key of the admin.
 */
export async function removeGroups(
    config: object,
    groupsIds: Array<string>,
    apiKey: string
): Promise<void> {
    const newConfig: any = {
        method: "delete",
        data: {
            groupsIds,
            apiKey
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const req = await request(url, newConfig)

    return req
}

/**
 * Updates the group.
 * @param groupId The group id.
 * @param dto The data to update for the group.
 * @param apiKey API Key of the admin.
 * @return The updated group.
 */
export async function updateGroup(
    config: object,
    groupId: string,
    dto: GroupUpdateRequest,
    apiKey: string
): Promise<GroupResponse> {
    const requestUrl = `${url}/${groupId}`

    const newConfig: any = {
        method: "put",
        data: {
            groupId,
            dto,
            apiKey
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const req = await request(requestUrl, newConfig)

    return req
}

/**
 * Updates the groups.
 * @param groupsIds The groups ids.
 * @param dtos The data to update for the groups.
 * @param apiKey API Key of the admin.
 * @return The updated groups.
 */
export async function updateGroups(
    config: object,
    groupsIds: Array<string>,
    dtos: Array<GroupUpdateRequest>,
    apiKey: string
): Promise<Array<GroupResponse>> {
    const newConfig: any = {
        method: "put",
        data: {
            groupsIds,
            dtos,
            apiKey
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    const req = await request(url, newConfig)

    return req
}

/**
 * Returns a specific group.
 * @param groupId Group id.
 * @returns Specific group.
 */
export async function getGroup(
    config: object,
    groupId: string
): Promise<GroupResponse> {
    const requestUrl = `${url}/${groupId}`

    const group = await request(requestUrl, config)

    group.credentials = JSON.parse(group.credentials)

    return group
}

/**
 * Returns true if the member is in the group and false otherwise.
 * @param groupId Group id.
 * @param memberId Member id.
 * @returns true or false.
 */
export async function isGroupMember(
    config: object,
    groupId: string,
    memberId: string
): Promise<boolean> {
    const requestUrl = `${url}/${groupId}/members/${memberId}`

    const isMember = await request(requestUrl, config)

    return isMember
}

/**
 * Returns the Merkle Proof for a member in a group.
 * @param groupId Group id.
 * @param memberId Member id.
 * @returns the Merkle Proof.
 */
export async function generateMerkleProof(
    config: object,
    groupId: string,
    memberId: string
): Promise<string> {
    const requestUrl = `${url}/${groupId}/members/${memberId}/proof`

    const merkleProof = await request(requestUrl, config)

    return merkleProof
}

/**
 * Adds a member to a group using an API Key.
 * @param groupId Group id.
 * @param memberId Member id.
 * @param apiKey API Key.
 * @returns undefined.
 */
export async function addMemberByApiKey(
    config: object,
    groupId: string,
    memberId: string,
    apiKey: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}/members/${memberId}`

    const newConfig: any = {
        method: "post",
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    await request(requestUrl, newConfig)
}

/**
 * Adds members to a group using an API Key.
 * @param groupId Group id.
 * @param memberIds Member ids.
 * @param apiKey API Key.
 * @returns undefined.
 */
export async function addMembersByApiKey(
    config: object,
    groupId: string,
    memberIds: string[],
    apiKey: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}/members`

    const newConfig: any = {
        method: "post",
        data: {
            memberIds
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    await request(requestUrl, newConfig)
}

/**
 * Adds a member to a group using an Invite Code.
 * @param groupId Group id.
 * @param memberId Member id.
 * @param inviteCode Invite Code.
 * @returns undefined.
 */
export async function addMemberByInviteCode(
    config: object,
    groupId: string,
    memberId: string,
    inviteCode: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}/members/${memberId}`

    const newConfig: any = {
        method: "post",
        data: {
            inviteCode
        },
        ...config
    }

    await request(requestUrl, newConfig)
}

/**
 * Removes a member from a group using an API Key.
 * @param groupId Group id.
 * @param memberId Member id.
 * @param apiKey API Key.
 * @returns undefined.
 */
export async function removeMemberByApiKey(
    config: object,
    groupId: string,
    memberId: string,
    apiKey: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}/members/${memberId}`

    const newConfig: any = {
        method: "delete",
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    await request(requestUrl, newConfig)
}

/**
 * Removes multiple members from a group using an API Key.
 * @param groupId Group id.
 * @param memberIds Member ids.
 * @param apiKey API Key.
 * @returns undefined.
 */
export async function removeMembersByApiKey(
    config: object,
    groupId: string,
    memberIds: string[],
    apiKey: string
): Promise<void> {
    const requestUrl = `${url}/${groupId}/members`

    const newConfig: any = {
        method: "delete",
        data: {
            memberIds
        },
        ...config
    }

    newConfig.headers["x-api-key"] = apiKey

    await request(requestUrl, newConfig)
}
