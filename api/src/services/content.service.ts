import ContentRepo from '@src/repos/ContentRepo';
import { IContent } from '@src/models/content.model';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
async function get(id: number): Promise<any> {  
    const courseContent = await ContentRepo.getOne(id);
    console.log('Here in service ?')
  // Return user
    return courseContent;
  }

/**
 * Get all users.
 */
function getAll(): Promise<IContent[]> {
  return ContentRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(user: any): Promise<void> {
  return ContentRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IContent): Promise<void> {
  const persists = await ContentRepo.persists(123);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return ContentRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await ContentRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return ContentRepo.delete(id);
}


// **** Export default **** //

export default {
  get,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
