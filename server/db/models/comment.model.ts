import { CommentInterface } from '../interface';
import { Appreciation } from './appreciation.model';

export class Comment extends Appreciation implements CommentInterface{
    declare message: string;
}