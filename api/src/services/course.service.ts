import CourseRepo from '@src/repos/CourseRepo';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICourse } from '@src/models/course.model';


// **** Variables **** //

export const COURSE_NOT_FOUND_ERR = 'cOURSE not found';


// **** Functions **** //

/**
 * Get all courses.
 */
function getAll(): Promise<ICourse[]> {
  return CourseRepo.getAll();
}

/**
 * Add one course.
 */
function addOne(course: any): Promise<void> {
  return CourseRepo.add(course);
}

/**
 * Update one course.
 */
async function updateOne(course: ICourse): Promise<void> {
  const persists = await CourseRepo.persists(123);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COURSE_NOT_FOUND_ERR,
    );
  }
  // Return course
  return CourseRepo.update(course);
}

/**
 * Delete a course by its id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await CourseRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COURSE_NOT_FOUND_ERR,
    );
  }
  // Delete course
  return CourseRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
