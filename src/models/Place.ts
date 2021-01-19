import { v4 as uuid } from 'uuid';

class Place {
  id: string;

  country: string;

  location: string;

  goal: number;

  flag: string;

  constructor({ country, location, goal, flag }: Omit<Place, 'id'>) {
    this.id = uuid();
    this.country = country;
    this.location = location;
    this.goal = goal;
    this.flag = flag;
  }
}

export default Place;
