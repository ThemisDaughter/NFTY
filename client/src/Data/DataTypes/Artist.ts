interface IArtist {
    eth_address: string,
    name: string,
    profile_picture: string,
    website: string,
    instagram?: string,
    twitter?: string,
    discord?: string,
    spotify?: string,
    //auto-generated
    id: number,
    createdAt: Date,
    updatedAt: Date
}

export type { IArtist };