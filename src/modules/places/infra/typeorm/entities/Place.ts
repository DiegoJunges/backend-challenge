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
  goal: Date;

  @Column()
  flag_url: string;
}

export default Place;
