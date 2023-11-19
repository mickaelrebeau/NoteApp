import { Note } from 'src/note/model/note.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  path: string;

  @ManyToOne(() => Note, (note) => note.files)
  note: Note;
}
