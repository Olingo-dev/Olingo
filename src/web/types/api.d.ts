export type VersionApiResponse = {
    version: string
}


export type Group = {
    ID: strig
    Name: sting
    CreatedAt: number
    UpdatedAt: number
    CreatedBy: string
}

export type GroupApiResponse = {
    groups: Group[]
}