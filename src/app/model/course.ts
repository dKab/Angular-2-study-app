import Author from './author';

export default class Course {
  id?: number;
  title: string = '';
  duration: number = 60;
  description: string = '';
  authors: Array<Author> = [];
  date: string;
}
