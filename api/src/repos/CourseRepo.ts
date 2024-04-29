import { ICourse } from '@src/models/course.model';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<ICourse | null> {
  const db = await orm.openDb();
  for (const course of db.courses) {
    if (course.id === id) {
      return course;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const course of db.users) {
    if (course.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<ICourse[]> {
  const db = await orm.openDb();
  return db.courses;
}

/**
 * Add one user.
 */
async function add(course: ICourse): Promise<void> {
  const db = await orm.openDb();
  course.id = getRandomInt();
  course.created = new Date();
  db.courses.push(course);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(course: ICourse): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.courses.length; i++) {
    if (db.courses[i].id === course.id) {
      const dbCourse = db.courses[i];
      db.courses[i] = {
        ...dbCourse,
        name: course.name,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.courses.length; i++) {
    if (db.courses[i].id === id) {
      db.courses.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
