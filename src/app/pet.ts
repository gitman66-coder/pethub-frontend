// the shape of one pet (same as the objects in pets.json)
export interface Pet {
  id: number;
  name: string;
  category: string;
  age: string;
  price: number;
  emoji: string;
  stock: number;
  featured: boolean;
}

// delivery cities (cities.json)
export interface City {
  name: string;
  days: number;
  charge: number;
}
