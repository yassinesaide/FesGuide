import pool from '../config/db';

export interface Place {
  id?: number;
  name: string;
  description: string;
  category: string;
  location: string;
  coordinates?: string;
  opening_hours?: string;
  ticket_price?: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class PlaceModel {
  // Get all places
  static async getAll(): Promise<Place[]> {
    try {
      const [rows] = await pool.query('SELECT * FROM places');
      return rows as Place[];
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  }

  // Get place by ID
  static async getById(id: number): Promise<Place | null> {
    try {
      const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [id]);
      const places = rows as Place[];
      return places.length ? places[0] : null;
    } catch (error) {
      console.error(`Error fetching place with id ${id}:`, error);
      throw error;
    }
  }

  // Get places by category
  static async getByCategory(category: string): Promise<Place[]> {
    try {
      const [rows] = await pool.query('SELECT * FROM places WHERE category = ?', [category]);
      return rows as Place[];
    } catch (error) {
      console.error(`Error fetching places with category ${category}:`, error);
      throw error;
    }
  }

  // Create a new place
  static async create(place: Place): Promise<Place> {
    try {
      const { name, description, category, location, coordinates, opening_hours, ticket_price, image_url } = place;
      const [result] = await pool.query(
        'INSERT INTO places (name, description, category, location, coordinates, opening_hours, ticket_price, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, category, location, coordinates, opening_hours, ticket_price, image_url]
      );
      const insertId = (result as any).insertId;
      return { id: insertId, ...place };
    } catch (error) {
      console.error('Error creating place:', error);
      throw error;
    }
  }
} 