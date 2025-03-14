-- Create database
CREATE DATABASE IF NOT EXISTS fesguide;
USE fesguide;

-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  coordinates VARCHAR(100),
  opening_hours VARCHAR(255),
  ticket_price VARCHAR(100),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO places (name, description, category, location, coordinates, opening_hours, ticket_price, image_url) VALUES
(
  'Bou Inania Madrasa',
  'The Bou Inania Madrasa is a madrasa in Fes, Morocco, founded in 1351–56 by Abu Inan Faris. It is widely acknowledged as an excellent example of Marinid architecture.',
  'Monument',
  'Rue Talaa Kebira, Fes Medina',
  '34.0631, -4.9760',
  '9:00 AM - 6:00 PM, Closed Fridays',
  '20 MAD',
  'https://example.com/images/bou_inania.jpg'
),
(
  'Chouara Tannery',
  'The Chouara Tannery is one of the three tanneries in the city of Fes, Morocco. It is the largest tannery in the city and one of the oldest in the world.',
  'Attraction',
  'Fes el Bali, Medina',
  '34.0673, -4.9731',
  '8:00 AM - 6:00 PM',
  'Free (shops may charge for viewing)',
  'https://example.com/images/chouara_tannery.jpg'
),
(
  'Al-Qarawiyyin Mosque and University',
  'Founded in 859, the University of Al-Qarawiyyin is considered the oldest continuously operating university in the world. The mosque is one of the largest in Africa.',
  'Monument',
  'Kairaouine Quarter, Fes Medina',
  '34.0665, -4.9742',
  'Non-Muslims cannot enter the mosque',
  'Not applicable',
  'https://example.com/images/al_qarawiyyin.jpg'
),
(
  'Dar Batha Museum',
  'Dar Batha is a palace built in the late 19th century that was converted into a museum of Moroccan arts in 1915. It houses a rich collection of traditional Moroccan arts and crafts.',
  'Museum',
  'Place du Batha, Fes',
  '34.0598, -4.9775',
  '9:00 AM - 5:00 PM, Closed Tuesdays',
  '10 MAD',
  'https://example.com/images/dar_batha.jpg'
),
(
  'Borj Nord',
  'Borj Nord is a 16th-century fortress that now houses the Arms Museum of Fes, displaying weapons from various periods of Moroccan history.',
  'Museum',
  'North of Fes Medina',
  '34.0731, -4.9775',
  '9:00 AM - 5:00 PM, Closed Tuesdays',
  '20 MAD',
  'https://example.com/images/borj_nord.jpg'
); 