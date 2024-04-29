import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import CourseService from '@src/services/course.service';
import { IUser } from '@src/models/user.model';
import { IReq, IRes } from './types/express/misc';
import { ICourse } from '@src/models/course.model';


// **** Functions **** //

/**
 * Get all courses.
 */
async function getAll(_: IReq, res: IRes) {
  const courses = await CourseService.getAll();
  return res.status(HttpStatusCodes.OK).json({ courses });
}

/**
 * Add one user.
 */
async function add(req: IReq<{course: any}>, res: IRes) {
  const { course } = req.body;
  await CourseService.addOne(course);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{course: ICourse}>, res: IRes) {
  const { course } = req.body;
  await CourseService.updateOne(course);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await CourseService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
