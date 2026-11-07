export type GeographyUnit={id:string;title:string;icon:string;chapter:string;facts:string[];pairs:{answer:string;clue:string}[]};
export const GEOGRAPHY_UNITS:GeographyUnit[]=[
  {
    "id": "geo-oceans",
    "title": "The five oceans",
    "icon": "🌊",
    "chapter": "Our world",
    "facts": [
      "Earth has five named oceans.",
      "The Pacific is the largest ocean.",
      "The Atlantic lies between the Americas and Europe and Africa.",
      "The Indian Ocean lies west of Australia.",
      "The Southern Ocean circles Antarctica."
    ],
    "pairs": [
      {
        "answer": "Pacific",
        "clue": "Largest ocean"
      },
      {
        "answer": "Atlantic",
        "clue": "Between the Americas and Europe"
      },
      {
        "answer": "Indian",
        "clue": "West of Australia"
      },
      {
        "answer": "Southern",
        "clue": "Around Antarctica"
      },
      {
        "answer": "Arctic",
        "clue": "Around the North Pole"
      }
    ]
  },
  {
    "id": "geo-maps",
    "title": "Reading a map",
    "icon": "🗺️",
    "chapter": "Our world",
    "facts": [
      "A map is a picture of a place viewed from above.",
      "A map key explains symbols.",
      "A compass rose shows directions.",
      "A scale helps compare map distances.",
      "A map title tells you what it shows."
    ],
    "pairs": [
      {
        "answer": "Key",
        "clue": "Explains symbols"
      },
      {
        "answer": "Compass rose",
        "clue": "Shows directions"
      },
      {
        "answer": "Scale",
        "clue": "Shows distances"
      },
      {
        "answer": "Title",
        "clue": "Names the map"
      },
      {
        "answer": "Map",
        "clue": "View from above"
      }
    ]
  },
  {
    "id": "geo-compass",
    "title": "Compass challenges",
    "icon": "🧭",
    "chapter": "Our world",
    "facts": [
      "North, east, south and west are four main directions.",
      "North is opposite south.",
      "East is opposite west.",
      "Northeast is between north and east.",
      "Southwest is between south and west."
    ],
    "pairs": [
      {
        "answer": "North",
        "clue": "Opposite south"
      },
      {
        "answer": "East",
        "clue": "Opposite west"
      },
      {
        "answer": "Northeast",
        "clue": "Between north and east"
      },
      {
        "answer": "Southwest",
        "clue": "Between south and west"
      },
      {
        "answer": "South",
        "clue": "Opposite north"
      }
    ]
  },
  {
    "id": "geo-symbols",
    "title": "Map symbols and scale",
    "icon": "📍",
    "chapter": "Our world",
    "facts": [
      "Symbols make maps easier to read.",
      "A blue line often shows a river.",
      "A dotted line can show a walking track.",
      "A scale bar represents real distance.",
      "Always check the map key: symbols can vary."
    ],
    "pairs": [
      {
        "answer": "Map key",
        "clue": "Explains symbols"
      },
      {
        "answer": "Scale bar",
        "clue": "Represents distance"
      },
      {
        "answer": "Blue line",
        "clue": "Often a river"
      },
      {
        "answer": "Dotted line",
        "clue": "Can show a track"
      },
      {
        "answer": "North arrow",
        "clue": "Shows north"
      }
    ]
  },
  {
    "id": "geo-australia",
    "title": "Australia on the globe",
    "icon": "🇦🇺",
    "chapter": "Australia",
    "facts": [
      "Australia lies south of the Equator.",
      "The Indian Ocean is to Australia's west.",
      "The Pacific Ocean is to Australia's east.",
      "Australia is both a country and a continent.",
      "Canberra is Australia's capital city."
    ],
    "pairs": [
      {
        "answer": "Canberra",
        "clue": "Capital of Australia"
      },
      {
        "answer": "Indian Ocean",
        "clue": "West of Australia"
      },
      {
        "answer": "Pacific Ocean",
        "clue": "East of Australia"
      },
      {
        "answer": "Southern Hemisphere",
        "clue": "Australia's hemisphere"
      },
      {
        "answer": "Australia",
        "clue": "Country and continent"
      }
    ]
  },
  {
    "id": "geo-states",
    "title": "Australian states",
    "icon": "🦘",
    "chapter": "Australia",
    "facts": [
      "Australia has six states and two mainland territories.",
      "Queensland is in the northeast.",
      "Western Australia is the largest state by area.",
      "Tasmania is an island state.",
      "New South Wales is south of Queensland."
    ],
    "pairs": [
      {
        "answer": "Queensland",
        "clue": "Northeast state"
      },
      {
        "answer": "Western Australia",
        "clue": "Largest state"
      },
      {
        "answer": "Tasmania",
        "clue": "Island state"
      },
      {
        "answer": "New South Wales",
        "clue": "South of Queensland"
      },
      {
        "answer": "Victoria",
        "clue": "South of New South Wales"
      }
    ]
  },
  {
    "id": "geo-capitals",
    "title": "Australian capital cities",
    "icon": "🏙️",
    "chapter": "Australia",
    "facts": [
      "Brisbane is Queensland's capital.",
      "Sydney is New South Wales's capital.",
      "Melbourne is Victoria's capital.",
      "Perth is Western Australia's capital.",
      "Hobart is Tasmania's capital."
    ],
    "pairs": [
      {
        "answer": "Brisbane",
        "clue": "Queensland"
      },
      {
        "answer": "Sydney",
        "clue": "New South Wales"
      },
      {
        "answer": "Melbourne",
        "clue": "Victoria"
      },
      {
        "answer": "Perth",
        "clue": "Western Australia"
      },
      {
        "answer": "Hobart",
        "clue": "Tasmania"
      }
    ]
  },
  {
    "id": "geo-landmarks-au",
    "title": "Australian landmarks",
    "icon": "🏞️",
    "chapter": "Australia",
    "facts": [
      "Uluru is a huge sandstone formation in the Northern Territory.",
      "The Great Barrier Reef is off Queensland's coast.",
      "The Sydney Opera House is beside Sydney Harbour.",
      "K'gari is a large sand island in Queensland.",
      "Cradle Mountain is in Tasmania."
    ],
    "pairs": [
      {
        "answer": "Uluru",
        "clue": "Northern Territory"
      },
      {
        "answer": "Great Barrier Reef",
        "clue": "Queensland coast"
      },
      {
        "answer": "Sydney Opera House",
        "clue": "Sydney"
      },
      {
        "answer": "K'gari",
        "clue": "Queensland"
      },
      {
        "answer": "Cradle Mountain",
        "clue": "Tasmania"
      }
    ]
  },
  {
    "id": "geo-landscapes-au",
    "title": "Australian landscapes",
    "icon": "🌿",
    "chapter": "Australia",
    "facts": [
      "Australia has deserts, forests, mountains and coasts.",
      "The Great Dividing Range runs along eastern Australia.",
      "The Murray River flows through southeastern Australia.",
      "The Outback includes large dry inland areas.",
      "Rainforests grow in parts of tropical Queensland."
    ],
    "pairs": [
      {
        "answer": "Great Dividing Range",
        "clue": "Eastern Australia"
      },
      {
        "answer": "Murray River",
        "clue": "Southeast Australia"
      },
      {
        "answer": "Outback",
        "clue": "Dry inland regions"
      },
      {
        "answer": "Rainforest",
        "clue": "Tropical Queensland"
      },
      {
        "answer": "Coast",
        "clue": "Where land meets sea"
      }
    ]
  },
  {
    "id": "geo-north-america",
    "title": "Countries of North America",
    "icon": "🌎",
    "chapter": "Countries and flags",
    "facts": [
      "Canada lies north of the United States.",
      "Mexico lies south of the United States.",
      "Ottawa is Canada's capital.",
      "Washington, D.C. is the United States capital.",
      "Mexico City is Mexico's capital."
    ],
    "pairs": [
      {
        "answer": "Canada",
        "clue": "Ottawa"
      },
      {
        "answer": "United States",
        "clue": "Washington, D.C."
      },
      {
        "answer": "Mexico",
        "clue": "Mexico City"
      },
      {
        "answer": "Canada",
        "clue": "North of the United States"
      },
      {
        "answer": "Mexico",
        "clue": "South of the United States"
      }
    ]
  },
  {
    "id": "geo-south-america",
    "title": "Countries of South America",
    "icon": "🦜",
    "chapter": "Countries and flags",
    "facts": [
      "Brazil is the largest South American country by area.",
      "Brasília is Brazil's capital.",
      "Argentina's capital is Buenos Aires.",
      "Chile stretches along South America's western edge.",
      "Peru is home to Machu Picchu."
    ],
    "pairs": [
      {
        "answer": "Brazil",
        "clue": "Brasília"
      },
      {
        "answer": "Argentina",
        "clue": "Buenos Aires"
      },
      {
        "answer": "Chile",
        "clue": "Western edge of South America"
      },
      {
        "answer": "Peru",
        "clue": "Machu Picchu"
      },
      {
        "answer": "Brazil",
        "clue": "Largest by area"
      }
    ]
  },
  {
    "id": "geo-europe",
    "title": "Countries of Europe",
    "icon": "🏰",
    "chapter": "Countries and flags",
    "facts": [
      "France's capital is Paris.",
      "Italy's capital is Rome.",
      "Spain's capital is Madrid.",
      "Germany's capital is Berlin.",
      "The United Kingdom's capital is London."
    ],
    "pairs": [
      {
        "answer": "France",
        "clue": "Paris"
      },
      {
        "answer": "Italy",
        "clue": "Rome"
      },
      {
        "answer": "Spain",
        "clue": "Madrid"
      },
      {
        "answer": "Germany",
        "clue": "Berlin"
      },
      {
        "answer": "United Kingdom",
        "clue": "London"
      }
    ]
  },
  {
    "id": "geo-africa",
    "title": "Countries of Africa",
    "icon": "🦁",
    "chapter": "Countries and flags",
    "facts": [
      "Africa contains more than fifty countries.",
      "Egypt is home to the Pyramids of Giza.",
      "Kenya's capital is Nairobi.",
      "Nigeria's capital is Abuja.",
      "Morocco lies in northwestern Africa."
    ],
    "pairs": [
      {
        "answer": "Egypt",
        "clue": "Pyramids of Giza"
      },
      {
        "answer": "Kenya",
        "clue": "Nairobi"
      },
      {
        "answer": "Nigeria",
        "clue": "Abuja"
      },
      {
        "answer": "Morocco",
        "clue": "Northwestern Africa"
      },
      {
        "answer": "Africa",
        "clue": "More than fifty countries"
      }
    ]
  },
  {
    "id": "geo-asia",
    "title": "Countries of Asia",
    "icon": "🐼",
    "chapter": "Countries and flags",
    "facts": [
      "Asia is the largest continent.",
      "China's capital is Beijing.",
      "Japan's capital is Tokyo.",
      "India's capital is New Delhi.",
      "Thailand's capital is Bangkok."
    ],
    "pairs": [
      {
        "answer": "China",
        "clue": "Beijing"
      },
      {
        "answer": "Japan",
        "clue": "Tokyo"
      },
      {
        "answer": "India",
        "clue": "New Delhi"
      },
      {
        "answer": "Thailand",
        "clue": "Bangkok"
      },
      {
        "answer": "Asia",
        "clue": "Largest continent"
      }
    ]
  },
  {
    "id": "geo-oceania",
    "title": "Countries of Oceania",
    "icon": "🏝️",
    "chapter": "Countries and flags",
    "facts": [
      "Oceania includes Australia and many Pacific islands.",
      "New Zealand's capital is Wellington.",
      "Fiji's capital is Suva.",
      "Papua New Guinea's capital is Port Moresby.",
      "Samoa's capital is Apia."
    ],
    "pairs": [
      {
        "answer": "New Zealand",
        "clue": "Wellington"
      },
      {
        "answer": "Fiji",
        "clue": "Suva"
      },
      {
        "answer": "Papua New Guinea",
        "clue": "Port Moresby"
      },
      {
        "answer": "Samoa",
        "clue": "Apia"
      },
      {
        "answer": "Oceania",
        "clue": "Pacific region"
      }
    ]
  },
  {
    "id": "geo-flags",
    "title": "Flags around the world",
    "icon": "🚩",
    "chapter": "Countries and flags",
    "facts": [
      "Flags are symbols of countries.",
      "Japan's flag has a red circle on white.",
      "Canada's flag has a maple leaf.",
      "Australia's flag includes the Southern Cross.",
      "Brazil's flag has a yellow diamond."
    ],
    "pairs": [
      {
        "answer": "Japan",
        "clue": "Red circle"
      },
      {
        "answer": "Canada",
        "clue": "Maple leaf"
      },
      {
        "answer": "Australia",
        "clue": "Southern Cross"
      },
      {
        "answer": "Brazil",
        "clue": "Yellow diamond"
      },
      {
        "answer": "Flags",
        "clue": "Symbols of countries"
      }
    ]
  },
  {
    "id": "geo-mountains",
    "title": "Mountains of the world",
    "icon": "🏔️",
    "chapter": "Land and water",
    "facts": [
      "Mountains are high areas of land.",
      "Mount Everest is in the Himalayas.",
      "The Andes run along western South America.",
      "The Alps are in Europe.",
      "The Great Dividing Range is in Australia."
    ],
    "pairs": [
      {
        "answer": "Everest",
        "clue": "Himalayas"
      },
      {
        "answer": "Andes",
        "clue": "South America"
      },
      {
        "answer": "Alps",
        "clue": "Europe"
      },
      {
        "answer": "Great Dividing Range",
        "clue": "Australia"
      },
      {
        "answer": "Mountain",
        "clue": "High land"
      }
    ]
  },
  {
    "id": "geo-rivers",
    "title": "Great rivers",
    "icon": "🏞️",
    "chapter": "Land and water",
    "facts": [
      "Rivers are moving streams of water.",
      "The Nile flows through northeastern Africa.",
      "The Amazon flows across South America.",
      "The Mississippi is a major North American river.",
      "The Murray is an important Australian river."
    ],
    "pairs": [
      {
        "answer": "Nile",
        "clue": "Africa"
      },
      {
        "answer": "Amazon",
        "clue": "South America"
      },
      {
        "answer": "Mississippi",
        "clue": "North America"
      },
      {
        "answer": "Murray",
        "clue": "Australia"
      },
      {
        "answer": "River",
        "clue": "Flowing water"
      }
    ]
  },
  {
    "id": "geo-lakes",
    "title": "Lakes and freshwater",
    "icon": "💧",
    "chapter": "Land and water",
    "facts": [
      "A lake is water surrounded by land.",
      "Lake Baikal is in Russia.",
      "Lake Victoria is in eastern Africa.",
      "The Great Lakes are between the United States and Canada.",
      "Freshwater is important for people, plants and animals."
    ],
    "pairs": [
      {
        "answer": "Lake Baikal",
        "clue": "Russia"
      },
      {
        "answer": "Lake Victoria",
        "clue": "Africa"
      },
      {
        "answer": "Great Lakes",
        "clue": "United States and Canada"
      },
      {
        "answer": "Lake",
        "clue": "Water surrounded by land"
      },
      {
        "answer": "Freshwater",
        "clue": "Needed by living things"
      }
    ]
  },
  {
    "id": "geo-seas",
    "title": "Seas and coastlines",
    "icon": "🐚",
    "chapter": "Land and water",
    "facts": [
      "A sea is usually smaller than an ocean.",
      "The Mediterranean Sea lies between Europe and Africa.",
      "The Coral Sea is off northeastern Australia.",
      "The Red Sea lies between Africa and the Arabian Peninsula.",
      "A coastline is where land meets the sea."
    ],
    "pairs": [
      {
        "answer": "Mediterranean Sea",
        "clue": "Europe and Africa"
      },
      {
        "answer": "Coral Sea",
        "clue": "Northeastern Australia"
      },
      {
        "answer": "Red Sea",
        "clue": "Africa and Arabia"
      },
      {
        "answer": "Coastline",
        "clue": "Land meets sea"
      },
      {
        "answer": "Sea",
        "clue": "Usually smaller than ocean"
      }
    ]
  },
  {
    "id": "geo-islands",
    "title": "Islands and peninsulas",
    "icon": "🏝️",
    "chapter": "Land and water",
    "facts": [
      "An island is land surrounded by water.",
      "Greenland is the world's largest island that is not a continent.",
      "Madagascar is an island east of Africa.",
      "A peninsula has water on most sides but joins larger land.",
      "New Zealand consists of two main islands and many smaller ones."
    ],
    "pairs": [
      {
        "answer": "Greenland",
        "clue": "Largest non-continental island"
      },
      {
        "answer": "Madagascar",
        "clue": "East of Africa"
      },
      {
        "answer": "Peninsula",
        "clue": "Joined to larger land"
      },
      {
        "answer": "Island",
        "clue": "Surrounded by water"
      },
      {
        "answer": "New Zealand",
        "clue": "Two main islands"
      }
    ]
  },
  {
    "id": "geo-weather",
    "title": "Weather around Earth",
    "icon": "🌤️",
    "chapter": "Climate and life",
    "facts": [
      "Weather describes conditions today or this week.",
      "Temperature tells us how hot or cold it is.",
      "Rainfall measures how much rain falls.",
      "Wind is moving air.",
      "Climate describes usual weather over many years."
    ],
    "pairs": [
      {
        "answer": "Temperature",
        "clue": "How hot or cold"
      },
      {
        "answer": "Rainfall",
        "clue": "Amount of rain"
      },
      {
        "answer": "Wind",
        "clue": "Moving air"
      },
      {
        "answer": "Climate",
        "clue": "Long-term weather"
      },
      {
        "answer": "Weather",
        "clue": "Current conditions"
      }
    ]
  },
  {
    "id": "geo-climate",
    "title": "Climate zones",
    "icon": "🌦️",
    "chapter": "Climate and life",
    "facts": [
      "Tropical places are often warm throughout the year.",
      "Polar places are usually very cold.",
      "Deserts receive very little rain.",
      "Temperate places often have changing seasons.",
      "Altitude can make mountain climates cooler."
    ],
    "pairs": [
      {
        "answer": "Tropical",
        "clue": "Often warm"
      },
      {
        "answer": "Polar",
        "clue": "Usually very cold"
      },
      {
        "answer": "Desert",
        "clue": "Very little rain"
      },
      {
        "answer": "Temperate",
        "clue": "Changing seasons"
      },
      {
        "answer": "Altitude",
        "clue": "Can make climate cooler"
      }
    ]
  },
  {
    "id": "geo-habitats-world",
    "title": "World habitats",
    "icon": "🐾",
    "chapter": "Climate and life",
    "facts": [
      "Habitats are places where living things survive.",
      "Rainforests are home to many species.",
      "Desert animals have ways to cope with dry conditions.",
      "Polar animals need adaptations for cold.",
      "Grasslands support many grazing animals."
    ],
    "pairs": [
      {
        "answer": "Rainforest",
        "clue": "Many species"
      },
      {
        "answer": "Desert",
        "clue": "Dry habitat"
      },
      {
        "answer": "Polar",
        "clue": "Cold habitat"
      },
      {
        "answer": "Grassland",
        "clue": "Grazing animals"
      },
      {
        "answer": "Habitat",
        "clue": "Where living things live"
      }
    ]
  },
  {
    "id": "geo-biomes",
    "title": "Animals across continents",
    "icon": "🦘",
    "chapter": "Climate and life",
    "facts": [
      "Kangaroos are native to Australia.",
      "Lemurs live naturally on Madagascar.",
      "Polar bears live in the Arctic, not Antarctica.",
      "Penguins live in the Southern Hemisphere, including Antarctica.",
      "Giraffes are native to Africa."
    ],
    "pairs": [
      {
        "answer": "Kangaroo",
        "clue": "Australia"
      },
      {
        "answer": "Lemur",
        "clue": "Madagascar"
      },
      {
        "answer": "Polar bear",
        "clue": "Arctic"
      },
      {
        "answer": "Penguin",
        "clue": "Southern Hemisphere"
      },
      {
        "answer": "Giraffe",
        "clue": "Africa"
      }
    ]
  },
  {
    "id": "geo-equator",
    "title": "Latitude and the Equator",
    "icon": "🌐",
    "chapter": "Finding places",
    "facts": [
      "Latitude measures how far north or south a place is.",
      "The Equator is zero degrees latitude.",
      "The North Pole is 90 degrees north.",
      "The South Pole is 90 degrees south.",
      "Lines of latitude run around Earth from east to west."
    ],
    "pairs": [
      {
        "answer": "Equator",
        "clue": "0° latitude"
      },
      {
        "answer": "North Pole",
        "clue": "90° north"
      },
      {
        "answer": "South Pole",
        "clue": "90° south"
      },
      {
        "answer": "Latitude",
        "clue": "North-south position"
      },
      {
        "answer": "Latitude lines",
        "clue": "Run east-west"
      }
    ]
  },
  {
    "id": "geo-tropics",
    "title": "The tropics",
    "icon": "☀️",
    "chapter": "Finding places",
    "facts": [
      "The Tropic of Cancer lies north of the Equator.",
      "The Tropic of Capricorn lies south of the Equator.",
      "The region between these lines is called the tropics.",
      "Parts of northern Australia lie in the tropics.",
      "Tropical areas can have wet and dry seasons."
    ],
    "pairs": [
      {
        "answer": "Tropic of Cancer",
        "clue": "North of Equator"
      },
      {
        "answer": "Tropic of Capricorn",
        "clue": "South of Equator"
      },
      {
        "answer": "Tropics",
        "clue": "Between the two tropic lines"
      },
      {
        "answer": "Northern Australia",
        "clue": "Partly tropical"
      },
      {
        "answer": "Equator",
        "clue": "Between the tropics"
      }
    ]
  },
  {
    "id": "geo-longitude",
    "title": "Longitude and time zones",
    "icon": "🕒",
    "chapter": "Finding places",
    "facts": [
      "Longitude measures how far east or west a place is.",
      "The Prime Meridian is zero degrees longitude.",
      "Earth turns once in about 24 hours.",
      "Different places experience noon at different times.",
      "Time zones help communities agree on local clock times."
    ],
    "pairs": [
      {
        "answer": "Prime Meridian",
        "clue": "0° longitude"
      },
      {
        "answer": "Longitude",
        "clue": "East-west position"
      },
      {
        "answer": "Earth's rotation",
        "clue": "About 24 hours"
      },
      {
        "answer": "Time zone",
        "clue": "Local clock time"
      },
      {
        "answer": "Latitude",
        "clue": "North-south position"
      }
    ]
  },
  {
    "id": "geo-landmarks-world",
    "title": "Famous world landmarks",
    "icon": "🗼",
    "chapter": "People and places",
    "facts": [
      "The Eiffel Tower is in Paris, France.",
      "The Taj Mahal is in Agra, India.",
      "Machu Picchu is in Peru.",
      "The Great Wall is in China.",
      "The Pyramids of Giza are in Egypt."
    ],
    "pairs": [
      {
        "answer": "Eiffel Tower",
        "clue": "France"
      },
      {
        "answer": "Taj Mahal",
        "clue": "India"
      },
      {
        "answer": "Machu Picchu",
        "clue": "Peru"
      },
      {
        "answer": "Great Wall",
        "clue": "China"
      },
      {
        "answer": "Pyramids of Giza",
        "clue": "Egypt"
      }
    ]
  },
  {
    "id": "geo-cultures",
    "title": "People and cultures",
    "icon": "🎉",
    "chapter": "People and places",
    "facts": [
      "People around the world speak many languages.",
      "Many communities celebrate different festivals.",
      "Foods and traditions vary between regions.",
      "No country has just one way of living.",
      "Learning about cultures means listening respectfully."
    ],
    "pairs": [
      {
        "answer": "Language",
        "clue": "Way people communicate"
      },
      {
        "answer": "Festival",
        "clue": "Community celebration"
      },
      {
        "answer": "Tradition",
        "clue": "Practice passed down"
      },
      {
        "answer": "Culture",
        "clue": "Ways people live"
      },
      {
        "answer": "Respect",
        "clue": "Listening and learning"
      }
    ]
  },
  {
    "id": "geo-landmark-match",
    "title": "Places and countries",
    "icon": "📍",
    "chapter": "People and places",
    "facts": [
      "A landmark can help us recognise a place.",
      "The Colosseum is in Rome, Italy.",
      "The Statue of Liberty is in New York, United States.",
      "Angkor Wat is in Cambodia.",
      "Petra is in Jordan."
    ],
    "pairs": [
      {
        "answer": "The Acropolis is in Athens, Greece."
      },
      {
        "answer": "Colosseum",
        "clue": "Italy"
      },
      {
        "answer": "Statue of Liberty",
        "clue": "United States"
      },
      {
        "answer": "Angkor Wat",
        "clue": "Cambodia"
      },
      {
        "answer": "Petra",
        "clue": "Jordan"
      },
      {
        "answer": "Acropolis",
        "clue": "Greece"
      }
    ]
  },
  {
    "id": "geo-projections",
    "title": "Why flat maps stretch Earth",
    "icon": "🌍",
    "chapter": "Advanced maps",
    "facts": [
      "Earth is round, but paper maps are flat.",
      "Every flat world map changes some shapes, sizes or distances.",
      "Mercator maps stretch areas near the poles.",
      "Africa is about fourteen times larger than Greenland.",
      "Equal Earth maps show relative areas more accurately."
    ],
    "pairs": [
      {
        "answer": "Mercator",
        "clue": "Stretches high latitudes"
      },
      {
        "answer": "Equal Earth",
        "clue": "Better area comparison"
      },
      {
        "answer": "Africa",
        "clue": "About 14 times Greenland"
      },
      {
        "answer": "Globe",
        "clue": "Round model"
      },
      {
        "answer": "Projection",
        "clue": "Way to flatten Earth"
      }
    ]
  }
];
