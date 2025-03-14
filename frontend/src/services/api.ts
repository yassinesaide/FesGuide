import { Place, GuideResponse } from '../types';

const API_URL = 'http://localhost:5000/api';

// Places API
export const getPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(`${API_URL}/places`);
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};

export const getPlaceById = async (id: number): Promise<Place | null> => {
  try {
    const response = await fetch(`${API_URL}/places/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch place with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching place with id ${id}:`, error);
    return null;
  }
};

export const getPlacesByCategory = async (category: string): Promise<Place[]> => {
  try {
    const response = await fetch(`${API_URL}/places/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch places with category ${category}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching places with category ${category}:`, error);
    return [];
  }
};

// Guide API
export const askGuide = async (query: string, language: string = 'english'): Promise<GuideResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/guide/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, language }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get guide response');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting guide response:', error);
    return null;
  }
}; 