import { Request, Response } from 'express';
import { Artist } from "../models";


//create artist

async function createArtist(req: Request, res: Response) {
  console.log('in create Artist controller')
  const _artist = await Artist.create({
    eth_address: req.body.eth_address,
    username: req.body.username,
    website: req.body.username,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    discord: req.body.discord,
    spotify: req.body.spotify,
  })

  res.send(_artist);
}

//get artists





export { createArtist };