import {
  Association,
  DataTypes,
  Model,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyAddAssociationMixin
} from 'sequelize';

//add for associations later
import { Album } from './album';
import { Merchandise } from './merchandise';
import { Event } from './event';

class Artist extends Model {
  public eth_address!: string;
  public name!: string;
  public profile_picture!: string;
  public website?: string;
  public instagram?: string;
  public twitter?: string;
  public discord?: string;
  public spotify?: string;

  //Auto-generated
  public id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  //Event association with methods
  public addEvent!: HasManyAddAssociationMixin<Event, number>;
  public getEvents!: HasManyGetAssociationsMixin<Event>;

  // Event association without methods
  public hasEvent!: HasManyHasAssociationMixin<Event, number>;
  public hasEvents!: HasManyHasAssociationMixin<Event, number>;

  // Album association with methods
  public addAlbum!: HasManyAddAssociationMixin<Album, number>;
  public getAlbums!: HasManyGetAssociationsMixin<Album>;

  // Album association without methods
  public hasAlbum!: HasManyHasAssociationMixin<Album, number>;
  public hasAlbums!: HasManyHasAssociationMixin<Album, number>;

  //Merchandise association with methods
  public addMerchandise!: HasManyAddAssociationMixin<Merchandise, number>;
  public getMerchandises!: HasManyGetAssociationsMixin<Merchandise>;

  //Merchandise association without methods
  public hasMerchandise!: HasManyHasAssociationMixin<Merchandise, number>;
  public hasMerchandises!: HasManyHasAssociationMixin<Merchandise, number>;

  // Populated for inclusions
  public readonly events?: Event[];
  public readonly albums?: Album[];
  public readonly merchandises?: Merchandise[];

  public static associations: {
    events: Association<Artist, Event>;
    albums: Association<Artist, Album>;
    merchandises: Association<Artist, Merchandise>
  }

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        eth_address: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            name: 'artist_eth_address',
            msg: 'An artist with this eth_address already exists.'
          }
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profile_picture: {
          type: DataTypes.STRING,
          defaultValue: "https://firebasestorage.googleapis.com/v0/b/cre-6cbea.appspot.com/o/IMG_0122.jpg?alt=media&token=c53822e2-37ea-4974-b67e-833da7e823f4"
        },
        website: {
          type: DataTypes.STRING,
        },
        instagram: {
          type: DataTypes.STRING,
        },
        twitter: {
          type: DataTypes.STRING,
        },
        discord: {
          type: DataTypes.STRING,
        },
        spotify: {
          type: DataTypes.STRING,
        }
      },
      { sequelize })
  }
}
export { Artist };