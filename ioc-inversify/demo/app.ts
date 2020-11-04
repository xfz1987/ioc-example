import 'reflect-metadata';
import container from './inversify.config';
import { Classroom } from './interface';
import TYPES from './types';

const classroom = container.get<Classroom>(TYPES.Classroom);
console.log(classroom.study());
