import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/user.model';


import UserRoutes from './user.routes';
import CourseRoutes from './course.routes';
import ContentRoutes from './content.routes';


// **** Variables **** //
const apiRouter = Router(), validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const courseRouter = Router();
const contentRouter = Router();

userRouter.get(Paths.Users.Get,UserRoutes.getAll);
userRouter.post(Paths.Users.Add,UserRoutes.add,);
userRouter.put(Paths.Users.Update,validate(['user', User.isUser]),UserRoutes.update,);
userRouter.delete(Paths.Users.Delete,validate(['id', 'number', 'params']),UserRoutes.delete,);

courseRouter.get(Paths.Courses.Get,CourseRoutes.getAll);
courseRouter.post(Paths.Courses.Add,CourseRoutes.add,);
courseRouter.put(Paths.Courses.Update,CourseRoutes.update,);
courseRouter.delete(Paths.Courses.Delete,validate(['id', 'number', 'params']),CourseRoutes.delete,);

contentRouter.get(Paths.Content.Get, ContentRoutes.get);
contentRouter.post(Paths.Content.Add,ContentRoutes.add,);
contentRouter.put(Paths.Content.Update,ContentRoutes.update,);
contentRouter.delete(Paths.Content.Delete,validate(['id', 'number', 'params']),ContentRoutes.delete,);

apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Courses.Base, courseRouter);
apiRouter.use(Paths.Content.Base, contentRouter);

// **** Export default **** //

export default apiRouter;
