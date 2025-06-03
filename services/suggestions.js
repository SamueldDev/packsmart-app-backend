

// services/suggestions.js

const SUGGESTION_DB = {
  beach: [
    "Swimsuit",
    "Sunscreen",
    "Beach towel",
    "Flip flops",
    "Sun hat",
    "Sunglasses"
  ],
  city: [
    "Casual wear",
    "Walking shoes",
    "Travel adapter",
    "Phone charger",
    "Reusable water bottle"
  ],
  hiking: [
    "Hiking boots",
    "Trail snacks",
    "Rain jacket",
    "Backpack",
    "First aid kit",
    "Map or GPS"
  ],
  cold: [
    "Thermal wear",
    "Winter jacket",
    "Gloves",
    "Beanie",
    "Snow boots",
    "Moisturizer"
  ],
  tropical: [
    "Lightweight clothing",
    "Bug spray",
    "Quick-dry towel",
    "Sandals",
    "Sunscreen"
  ]
};

// Accepts an array of tags like ["cold", "hiking"]
export function getSuggestions({ destinationTypes = [] }) {
  const allItems = destinationTypes.flatMap(type => SUGGESTION_DB[type] || []);
  const uniqueItems = [...new Set(allItems)];
  return uniqueItems;
}
