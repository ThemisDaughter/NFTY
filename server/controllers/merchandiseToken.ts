import { Request, Response } from 'express';
import { Artist, Consumer, MerchandiseToken, Merchandise } from "../models";
import { errorHandler } from './error';


async function getMerchandiseTokens(req: Request, res: Response) {
  try {
    const _tokens: MerchandiseToken[] = await MerchandiseToken.findAll();
    res.json(_tokens);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

async function getMerchandiseToken(req: Request, res: Response) {
  try {
    const _token = await MerchandiseToken.findByPk(req.params.tokenId);
    res.json(_token);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

async function getArtistMerchandisesTokens(req: Request, res: Response) {
  try {
    if (!req.params.artistId) {
      res.status(400);
      res.json('incorrect schema for request');
    } else {

      const artistId = req.params.artistId;
      const artist = await Artist.findByPk(artistId);

      if (!artist) {
        res.status(400);
        res.json('Artist not found');
      } else {
        const _tokens = await MerchandiseToken.findAll({ where: { ArtistId: artistId } });
        res.json(_tokens);
      }
    }
  }
  catch (error) {
    console.log('error');
    res.status(500);
    res.json(error);
  }
}

async function getConsumerMerchandiseTokens(req: Request, res: Response) {
  try {
    if (!req.params.merchandiseId || !req.params.consumerId) {
      res.status(400);
      res.json('incorrect schema for request');
    } else {
      const merchandiseId = req.params.merchandiseId;
      const consumerId = req.params.consumerId;

      const merchandise = await Merchandise.findByPk(merchandiseId);
      const consumer = await Consumer.findByPk(consumerId);

      if (!merchandise) {
        res.status(400);
        res.json('Merchandise not found');
      } else if (!consumer) {
        res.status(400);
        res.json('Consumer not found');
      } else {
        const _tokens = await MerchandiseToken.findAll({ where: { MerchandiseId: merchandiseId, ConsumerId: consumerId } });
        res.json(_tokens);
        res.status(201);
      }
    }
  }
  catch (error) {
    console.log('error');
    res.status(500);
    res.json(error);
  }
}

async function getConsumerMerchTokensByConsumerId(req: Request, res: Response) {
  try {
    if (!req.params.consumerId) {
      res.status(400);
      res.json('incorrect schema for request');
    } else {
      const consumerId = req.params.consumerId;
      const consumer = await Consumer.findByPk(consumerId);
      
      if (!consumer) {
        res.status(400);
        res.json('Consumer not found');
      } else {
        const _tokens = await MerchandiseToken.findAll({ where: {ConsumerId: consumerId } });
        res.json(_tokens);
        res.status(201);
      }
    }
  }
  catch (error) {
    console.log('error');
    res.status(500);
    res.json(error);
  }
}


async function getMerchTokensByMerchId(req: Request, res: Response) {
  try {
    if (!req.params.merchId) {
      res.status(400);
      res.json('incorrect schema for request');
    } else {
      const merchId = req.params.merchId;
      const _merchTokens = await MerchandiseToken.findAll({ where: { MerchandiseId: merchId } });
      res.json(_merchTokens);
    }
  }
  catch (err) {
    errorHandler(res, err);
  }
}

export { getMerchandiseTokens, getMerchandiseToken, getArtistMerchandisesTokens, getConsumerMerchandiseTokens, getConsumerMerchTokensByConsumerId, getMerchTokensByMerchId }