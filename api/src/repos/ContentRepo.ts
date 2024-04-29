import { IContent } from '@src/models/content.model';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IContent | null> {
  const db = await orm.openDb();
  for (const content of db.content) {
    if (content.id === id) {
      return content;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const content of db.content) {
    if (content.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IContent[]> {
  const db = await orm.openDb();
  return db.content;
}

/**
 * Add one user.
 */
async function add(content: IContent): Promise<void> {
  const db = await orm.openDb();
  content.id = getRandomInt();
  content.updated_on = new Date();
  db.content.push(content);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(content: IContent): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.content.length; i++) {
    if (db.content[i].id === content.id) {
      const dbContent = db.content[i];
      db.content[i] = {
        ...dbContent,
        updated_on: new Date(),
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
