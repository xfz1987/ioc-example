import { Container } from 'inversify';
import { Haitao, Yd, Zhijia } from './entities';
import { Classroom, Student, Teacher } from './interface';
import TYPES from './types';

//创建一个基本的容器
const container = new Container();
//容器.添加<什么类型>(名称).到（具体的实现类）;
container.bind<Student>(TYPES.Student).to(Haitao);
container.bind<Teacher>(TYPES.Teacher).to(Zhijia);
container.bind<Classroom>(TYPES.Classroom).to(Yd);
export default container;
