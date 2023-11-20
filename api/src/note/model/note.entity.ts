import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from 'src/upload/model/file.entity';
import { User } from 'src/user/model/user.entity';

export type Label = 'bug' | 'feature' | 'fix' | 'documentation' | 'other';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  label: Label;

  @OneToMany(() => File, (file) => file.note)
  files: File[];

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
