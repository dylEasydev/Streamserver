import { ViewInterface } from '../interface';
import { Appreciation } from './appreciation.model';

export class View extends Appreciation implements ViewInterface{
    declare pertinance: number;
}