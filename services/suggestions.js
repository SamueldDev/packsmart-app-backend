

// services/suggestions.js

export const SUGGESTION_DB = {
  beach: [
  "Swimsuit",
  "Sunscreen",
  "Beach towel",
  "Flip flops",
  "Sun hat",
  "Sunglasses",
  "Snorkel gear",
  "Waterproof phone pouch",
  "Beach mat",
  "Aloe vera gel",
  "Portable beach umbrella",
  "Water bottle",
  "Light beach cover-up",
  "Swim goggles",
  "Beach bag"
  ],

  city: [
  "Casual wear",
  "Walking shoes",
  "Travel adapter",
  "Phone charger",
  "Reusable water bottle",
  "City map or app",
  "Credit/debit cards",
  "Museum pass",
  "Public transport card",
  "Hand sanitizer",
  "Compact umbrella",
  "Camera",
  "Notebook and pen",
  "Power bank",
  "Daypack or sling bag"
  ],

  hiking: [
  "Hiking boots",
  "Trail snacks",
  "Rain jacket",
  "Backpack",
  "First aid kit",
  "Map or GPS",
  "Water bladder or bottles",
  "Trekking poles",
  "Headlamp or flashlight",
  "Multi-tool or knife",
  "Bug spray",
  "Sunscreen",
  "Hat or buff",
  "Emergency whistle",
  "Energy bars"
  ],

  cold: [
  "Thermal wear",
  "Winter jacket",
  "Gloves",
  "Beanie",
  "Snow boots",
  "Moisturizer",
  "Lip balm",
  "Hand warmers",
  "Wool socks",
  "Scarf",
  "Insulated water bottle",
  "Long underwear",
  "Sweaters",
  "Earmuffs",
  "Travel blanket"
  ],

  tropical: [
  "Lightweight clothing",
  "Bug spray",
  "Quick-dry towel",
  "Sandals",
  "Sunscreen",
  "Rain poncho",
  "Anti-diarrhea meds",
  "Mosquito net",
  "Hammock",
  "Electrolyte packets",
  "Waterproof bag",
  "Reusable straw",
  "Sunhat",
  "Afterbite cream",
  "Light hoodie for AC"
],

airport:[
  "Passport",
  "Boarding pass",
  "Travel documents",
  "Luggage tags",
  "Noise-canceling headphones",
  "Neck pillow",
  "Travel-sized toiletries",
  "Compression socks",
  "Entertainment (book, tablet)",
  "Snacks"
],

camping: [
  "Tent",
  "Sleeping bag",
  "Camping stove",
  "Flashlight",
  "Insect repellent",
  "Camping chair",
  "Cooler",
  "Marshmallows",
  "Lighter or matches",
  "Tarp"
],

international:[

  "Passport",
  "Visa documents",
  "Travel insurance",
  "Currency or card",
  "Universal adapter",
  "Phrasebook or translation app",
  "Vaccination proof",
  "Copy of important documents",
  "SIM card or roaming setup",
  "Power bank"

],

business:[
  "Laptop",
  "Chargers",
  "Dress shoes",
  "Formal wear",
  "Business cards",
  "Notebook and pen",
  "Presentation materials",
  "Toiletries",
  "Planner or agenda",
  "Work ID"
],

bedpacking:[

  "Lightweight backpack",
  "Travel towel",
  "Flip flops",
  "Multi-purpose clothing",
  "Dry bag",
  "Water filter",
  "Travel journal",
  "Portable charger",
  "Hostel padlock",
  "Laundry soap"
],

family:[

  "Baby wipes",
  "Diapers",
  "Toys and games",
  "Children’s clothes",
  "Snacks",
  "Sippy cups",
  "Kids' medicine",
  "Stroller",
  "Blanket",
  "Family travel documents"

],

romantic:[

  "Dinner outfit",
  "Fragrance",
  "Gift or card",
  "Candles",
  "Massage oil",
  "Swimwear",
  "Music playlist",
  "Polaroid camera",
  "Nice shoes",
  "Wine or drinks"

],

festival:[
  "Tickets/wristbands",
  "Sunglasses",
  "Portable charger",
  "Earplugs",
  "Bandana or scarf",
  "Outfits/costumes",
  "Reusable cup",
  "Fanny pack",
  "Rain poncho",
  "Glitter or body paint"

],

wellness:[
  "Yoga mat",
  "Workout clothes",
  "Meditation app",
  "Reusable water bottle",
  "Healthy snacks",
  "Book",
  "Journal",
  "Essential oils",
  "Supplements",
  "Comfy shoes"
],

photography:[
  "Camera body",
  "Lenses",
  "SD cards",
  "Tripod",
  "Battery charger",
  "Lens wipes",
  "Camera bag",
  "Filters",
  "Backup drive",
  "Drone (if applicable)"
]


};

// Accepts an array of tags like ["cold", "hiking"]
export function getSuggestions({ destinationTypes = [] }) {
  const allItems = destinationTypes.flatMap(type => SUGGESTION_DB[type] || []);
  const uniqueItems = [...new Set(allItems)];
  return uniqueItems;
}
