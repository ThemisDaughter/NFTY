interface IAlbumToken {
    image: string,
    consumer_points: number,
    edition_number: number,
    total_editions: number
    id?: number,
    createdAt?: Date,
    updatedAt?: Date
}

export type { IAlbumToken }