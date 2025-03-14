import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          About FesGuide
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4">
            FesGuide is an AI-powered virtual tourist guide designed
            specifically for Fes, Morocco. Our mission is to help tourists
            discover the rich history, culture, and beauty of Fes by providing
            accurate, helpful, and engaging information.
          </p>
          <p className="text-gray-700">
            Whether you're planning your trip or already exploring the ancient
            medina, FesGuide is your companion for navigating one of Morocco's
            most fascinating cities.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            What FesGuide Offers
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Comprehensive information about monuments, historical sites, and
              attractions
            </li>
            <li>
              Practical details like opening hours, ticket prices, and locations
            </li>
            <li>Cultural insights and local customs</li>
            <li>Directions and navigation assistance</li>
            <li>Recommendations for restaurants, shopping, and experiences</li>
            <li>
              Support in multiple languages including English, French, Arabic,
              and Spanish
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            About Fes
          </h2>
          <p className="text-gray-700 mb-4">
            Fes (or Fez) is the second largest city in Morocco and one of the
            country's most historic and culturally rich destinations. Founded in
            the 9th century, it's home to the oldest university in the world,
            the University of Al-Qarawiyyin.
          </p>
          <p className="text-gray-700 mb-4">
            The city is famous for its ancient walled medina, Fes el Bali, which
            is a UNESCO World Heritage site and one of the largest car-free
            urban areas in the world. With its labyrinthine streets, historic
            monuments, vibrant souks, and traditional crafts, Fes offers
            visitors an authentic glimpse into Morocco's rich heritage.
          </p>
          <p className="text-gray-700">
            Key attractions include the Bou Inania Madrasa, the Chouara Tannery,
            Al-Qarawiyyin Mosque and University, Dar Batha Museum, and the
            bustling souks where artisans continue centuries-old traditions of
            leatherwork, ceramics, and metalwork.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            Have questions, suggestions, or feedback? We'd love to hear from
            you!
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Email:</span> info@fesguide.com
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> Fes, Morocco
          </p>

          <div className="mt-6">
            <Link
              to="/guide"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Ask Our AI Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
