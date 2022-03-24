import { Request, Response } from 'express';
import { Event, Artist, EventToken } from "../models";
import { errorHandler } from './error';

async function getEvents(req: Request, res: Response) {
  try {
    const _events = await Event.findAll();
    res.json(_events);
    res.status(200);
  } catch (error) { errorHandler(res, error) }
}

async function getEvent(req: Request, res: Response) {
  try {
    const _event = await Event.findByPk(req.params.eventId);
    console.log(_event, "event");
    res.json(_event);
    res.status(200);
  } catch (error) { errorHandler(res, error) }
}

async function createEvent(req: Request, res: Response) {
  try {
    if (!req.params.artistId) {
      res.send(400);
      res.json('incorrect schema for request');
    } else {
      const artist = await Artist.findByPk(req.params.artistId);

      if (!artist) {
        res.status(400);
        res.json('Artist not found');
      } else {
        const _event = await Event.create(req.body);

        for (var tokens = 0; tokens < _event.number_of_tokens; tokens++) {
          const _token = EventToken.build();
          await _token.save();
          await _token.setArtist(artist);
          await _token.setEvent(_event);
        }

        _event
          .setArtist(artist)
          .then((_event) => {
            res.json(_event);
            res.status(201);
          })
          .catch((err) => {
            res.json('Database Error - createEvent failing')
          });
      }
    }
  } catch (error) { errorHandler(res, error) }
}

async function getArtistEvents(req: Request, res: Response) {
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
        const _events = await Event.findAll({where: {ArtistId: artistId}});
        res.json(_events);
        res.status(201);
      }
    }
  } catch (error) { errorHandler(res, error) }
 }

async function getArtistEvent(req: Request, res: Response) {
  try {
    if (!req.params.artistId || !req.params.eventId) {
      res.status(400);
      res.json('incorrect schema for request');
    } else {
      const artistId = req.params.artistId;
      const eventId = req.params.eventId;
      const artist = await Artist.findByPk(artistId);
      const event = await Event.findByPk(eventId);

      if (!artist) {
        res.status(400);
        res.json('Artist not found');
      } else if (!event) {
        res.status(400);
        res.json('Event not found');
      }
      else {
        const _event = await Event.findAll({where: {id: eventId, ArtistId: artistId}});
        res.json(_event);
        res.status(201);
      }
    }
  } catch (error) { errorHandler(res, error) }
 }

 async function deleteEvent(req: Request, res: Response) {
  const eventId = req.params.eventId;
  await EventToken.destroy({where: {EventId: eventId}});
  await Event.destroy({where: {id: eventId}});
  res.status(201);
  res.json();
 }

export { createEvent, getEvents, getEvent, getArtistEvents, getArtistEvent, deleteEvent }