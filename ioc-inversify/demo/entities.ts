import { Student, Teacher, Classroom } from './interface';
import { inject, injectable } from 'inversify';
import TYPES from './types';

@injectable()
class Haitao implements Student {
  public learn(): string {
    return '📚努力学习';
  }
}

@injectable()
class Zhijia implements Teacher {
  public teaching(): string {
    return '👷 教高级前端';
  }
}

@injectable()
class Yd implements Classroom {
  private _haitao: Student;
  private _zhijia: Teacher;
  constructor(
    @inject(TYPES.Student) haitao: Student,
    @inject(TYPES.Teacher) zhijia: Teacher
  ) {
    this._haitao = haitao;
    this._zhijia = zhijia;
  }
  study(): string {
    return this._zhijia.teaching() + this._haitao.learn();
  }
}

export { Haitao, Zhijia, Yd };
