import { Request, Response } from 'express';
import { PlaceModel, Place } from '../models/Place';

export const getAllPlaces = async (req: Request, res: Response) => {
  try {
    const places = await PlaceModel.getAll();
    res.status(200).json(places);
  } catch (error) {
    console.error('Error in getAllPlaces controller:', error);
    res.status(500).json({ message: 'Server error while fetching places' });
  }
};

export const getPlaceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const place = await PlaceModel.getById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    
    res.status(200).json(place);
  } catch (error) {
    console.error('Error in getPlaceById controller:', error);
    res.status(500).json({ message: 'Server error while fetching place' });
  }
};

export const getPlacesByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const places = await PlaceModel.getByCategory(category);
    res.status(200).json(places);
  } catch (error) {
    console.error('Error in getPlacesByCategory controller:', error);
    res.status(500).json({ message: 'Server error while fetching places by category' });
  }
};

export const createPlace = async (req: Request, res: Response) => {
  try {
    const placeData: Place = req.body;
    
    // Validate required fields
    if (!placeData.name || !placeData.description || !placeData.category || !placeData.location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newPlace = await PlaceModel.create(placeData);
    res.status(201).json(newPlace);
  } catch (error) {
    console.error('Error in createPlace controller:', error);
    res.status(500).json({ message: 'Server error while creating place' });
  }
}; 