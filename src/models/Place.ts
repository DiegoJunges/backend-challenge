import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column()
  goal: string;

  @Column()
  flag: string;
}

export default Place;
