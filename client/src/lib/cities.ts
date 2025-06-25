// Real world cities data for autocomplete
export interface City {
  name: string;
  country: string;
  display: string;
}

// Major cities worldwide with country validation
export const cities: City[] = [
  // United Kingdom
  { name: "London", country: "United Kingdom", display: "London, United Kingdom" },
  { name: "Manchester", country: "United Kingdom", display: "Manchester, United Kingdom" },
  { name: "Birmingham", country: "United Kingdom", display: "Birmingham, United Kingdom" },
  { name: "Edinburgh", country: "United Kingdom", display: "Edinburgh, United Kingdom" },
  { name: "Glasgow", country: "United Kingdom", display: "Glasgow, United Kingdom" },
  { name: "Bristol", country: "United Kingdom", display: "Bristol, United Kingdom" },
  { name: "Liverpool", country: "United Kingdom", display: "Liverpool, United Kingdom" },
  { name: "Cambridge", country: "United Kingdom", display: "Cambridge, United Kingdom" },
  { name: "Oxford", country: "United Kingdom", display: "Oxford, United Kingdom" },
  
  // France
  { name: "Paris", country: "France", display: "Paris, France" },
  { name: "Lyon", country: "France", display: "Lyon, France" },
  { name: "Marseille", country: "France", display: "Marseille, France" },
  { name: "Toulouse", country: "France", display: "Toulouse, France" },
  { name: "Nice", country: "France", display: "Nice, France" },
  { name: "Nantes", country: "France", display: "Nantes, France" },
  { name: "Montpellier", country: "France", display: "Montpellier, France" },
  { name: "Strasbourg", country: "France", display: "Strasbourg, France" },
  { name: "Bordeaux", country: "France", display: "Bordeaux, France" },
  
  // Canada
  { name: "Toronto", country: "Canada", display: "Toronto, Canada" },
  { name: "Vancouver", country: "Canada", display: "Vancouver, Canada" },
  { name: "Montreal", country: "Canada", display: "Montreal, Canada" },
  { name: "Calgary", country: "Canada", display: "Calgary, Canada" },
  { name: "Ottawa", country: "Canada", display: "Ottawa, Canada" },
  { name: "Edmonton", country: "Canada", display: "Edmonton, Canada" },
  { name: "Winnipeg", country: "Canada", display: "Winnipeg, Canada" },
  { name: "Quebec City", country: "Canada", display: "Quebec City, Canada" },
  { name: "Hamilton", country: "Canada", display: "Hamilton, Canada" },
  
  // UAE
  { name: "Dubai", country: "United Arab Emirates", display: "Dubai, United Arab Emirates" },
  { name: "Abu Dhabi", country: "United Arab Emirates", display: "Abu Dhabi, United Arab Emirates" },
  { name: "Sharjah", country: "United Arab Emirates", display: "Sharjah, United Arab Emirates" },
  { name: "Ajman", country: "United Arab Emirates", display: "Ajman, United Arab Emirates" },
  
  // United States
  { name: "New York", country: "United States", display: "New York, United States" },
  { name: "San Francisco", country: "United States", display: "San Francisco, United States" },
  { name: "Los Angeles", country: "United States", display: "Los Angeles, United States" },
  { name: "Chicago", country: "United States", display: "Chicago, United States" },
  { name: "Boston", country: "United States", display: "Boston, United States" },
  { name: "Seattle", country: "United States", display: "Seattle, United States" },
  { name: "Austin", country: "United States", display: "Austin, United States" },
  { name: "Miami", country: "United States", display: "Miami, United States" },
  { name: "Denver", country: "United States", display: "Denver, United States" },
  { name: "Atlanta", country: "United States", display: "Atlanta, United States" },
  
  // Germany
  { name: "Berlin", country: "Germany", display: "Berlin, Germany" },
  { name: "Munich", country: "Germany", display: "Munich, Germany" },
  { name: "Hamburg", country: "Germany", display: "Hamburg, Germany" },
  { name: "Frankfurt", country: "Germany", display: "Frankfurt, Germany" },
  { name: "Cologne", country: "Germany", display: "Cologne, Germany" },
  { name: "Stuttgart", country: "Germany", display: "Stuttgart, Germany" },
  
  // Netherlands
  { name: "Amsterdam", country: "Netherlands", display: "Amsterdam, Netherlands" },
  { name: "Rotterdam", country: "Netherlands", display: "Rotterdam, Netherlands" },
  { name: "The Hague", country: "Netherlands", display: "The Hague, Netherlands" },
  { name: "Utrecht", country: "Netherlands", display: "Utrecht, Netherlands" },
  
  // Spain
  { name: "Madrid", country: "Spain", display: "Madrid, Spain" },
  { name: "Barcelona", country: "Spain", display: "Barcelona, Spain" },
  { name: "Valencia", country: "Spain", display: "Valencia, Spain" },
  { name: "Seville", country: "Spain", display: "Seville, Spain" },
  
  // Italy
  { name: "Rome", country: "Italy", display: "Rome, Italy" },
  { name: "Milan", country: "Italy", display: "Milan, Italy" },
  { name: "Naples", country: "Italy", display: "Naples, Italy" },
  { name: "Turin", country: "Italy", display: "Turin, Italy" },
  
  // Switzerland
  { name: "Zurich", country: "Switzerland", display: "Zurich, Switzerland" },
  { name: "Geneva", country: "Switzerland", display: "Geneva, Switzerland" },
  { name: "Basel", country: "Switzerland", display: "Basel, Switzerland" },
  { name: "Bern", country: "Switzerland", display: "Bern, Switzerland" },
  
  // Belgium
  { name: "Brussels", country: "Belgium", display: "Brussels, Belgium" },
  { name: "Antwerp", country: "Belgium", display: "Antwerp, Belgium" },
  { name: "Ghent", country: "Belgium", display: "Ghent, Belgium" },
  
  // Sweden
  { name: "Stockholm", country: "Sweden", display: "Stockholm, Sweden" },
  { name: "Gothenburg", country: "Sweden", display: "Gothenburg, Sweden" },
  { name: "Malmö", country: "Sweden", display: "Malmö, Sweden" },
  
  // Norway
  { name: "Oslo", country: "Norway", display: "Oslo, Norway" },
  { name: "Bergen", country: "Norway", display: "Bergen, Norway" },
  
  // Denmark
  { name: "Copenhagen", country: "Denmark", display: "Copenhagen, Denmark" },
  { name: "Aarhus", country: "Denmark", display: "Aarhus, Denmark" },
  
  // Finland
  { name: "Helsinki", country: "Finland", display: "Helsinki, Finland" },
  { name: "Tampere", country: "Finland", display: "Tampere, Finland" },
  
  // Australia
  { name: "Sydney", country: "Australia", display: "Sydney, Australia" },
  { name: "Melbourne", country: "Australia", display: "Melbourne, Australia" },
  { name: "Brisbane", country: "Australia", display: "Brisbane, Australia" },
  { name: "Perth", country: "Australia", display: "Perth, Australia" },
  
  // Singapore
  { name: "Singapore", country: "Singapore", display: "Singapore, Singapore" },
  
  // Hong Kong
  { name: "Hong Kong", country: "Hong Kong", display: "Hong Kong, Hong Kong" },
  
  // Japan
  { name: "Tokyo", country: "Japan", display: "Tokyo, Japan" },
  { name: "Osaka", country: "Japan", display: "Osaka, Japan" },
  { name: "Kyoto", country: "Japan", display: "Kyoto, Japan" },
  
  // South Korea
  { name: "Seoul", country: "South Korea", display: "Seoul, South Korea" },
  { name: "Busan", country: "South Korea", display: "Busan, South Korea" },
  
  // India
  { name: "Mumbai", country: "India", display: "Mumbai, India" },
  { name: "Delhi", country: "India", display: "Delhi, India" },
  { name: "Bangalore", country: "India", display: "Bangalore, India" },
  { name: "Hyderabad", country: "India", display: "Hyderabad, India" },
  { name: "Chennai", country: "India", display: "Chennai, India" },
  { name: "Pune", country: "India", display: "Pune, India" },
  
  // China
  { name: "Beijing", country: "China", display: "Beijing, China" },
  { name: "Shanghai", country: "China", display: "Shanghai, China" },
  { name: "Shenzhen", country: "China", display: "Shenzhen, China" },
  { name: "Guangzhou", country: "China", display: "Guangzhou, China" },
  
  // Brazil
  { name: "São Paulo", country: "Brazil", display: "São Paulo, Brazil" },
  { name: "Rio de Janeiro", country: "Brazil", display: "Rio de Janeiro, Brazil" },
  { name: "Brasília", country: "Brazil", display: "Brasília, Brazil" },
  
  // Mexico
  { name: "Mexico City", country: "Mexico", display: "Mexico City, Mexico" },
  { name: "Guadalajara", country: "Mexico", display: "Guadalajara, Mexico" },
  { name: "Monterrey", country: "Mexico", display: "Monterrey, Mexico" },
  
  // Argentina
  { name: "Buenos Aires", country: "Argentina", display: "Buenos Aires, Argentina" },
  { name: "Córdoba", country: "Argentina", display: "Córdoba, Argentina" },
  
  // South Africa
  { name: "Cape Town", country: "South Africa", display: "Cape Town, South Africa" },
  { name: "Johannesburg", country: "South Africa", display: "Johannesburg, South Africa" },
  
  // Israel
  { name: "Tel Aviv", country: "Israel", display: "Tel Aviv, Israel" },
  { name: "Jerusalem", country: "Israel", display: "Jerusalem, Israel" },
  
  // Turkey
  { name: "Istanbul", country: "Turkey", display: "Istanbul, Turkey" },
  { name: "Ankara", country: "Turkey", display: "Ankara, Turkey" },
  
  // Russia
  { name: "Moscow", country: "Russia", display: "Moscow, Russia" },
  { name: "Saint Petersburg", country: "Russia", display: "Saint Petersburg, Russia" },
];

export function filterCities(query: string): City[] {
  if (!query) return cities.slice(0, 10); // Show top 10 cities by default
  
  const lowerQuery = query.toLowerCase();
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) || 
      city.country.toLowerCase().includes(lowerQuery) ||
      city.display.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 20); // Limit to 20 results
}

export function validateCity(cityDisplay: string): boolean {
  return cities.some(city => city.display === cityDisplay);
}