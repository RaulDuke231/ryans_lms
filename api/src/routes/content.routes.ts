import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import ContentService from '@src/services/content.service';
import { IContent } from '@src/models/content.model';
import { IReq, IRes } from './types/express/misc';
// **** Functions **** //

/**
 * Get all courses.
 */
async function get(req: IReq, res: IRes) {
  console.log('Here ?')
  const id = +req.params.id;

  console.log('Am i here router ?')

  const content = await ContentService.get(id);




  return res.status(HttpStatusCodes.OK).json({ content });
}

/**
 * Add one user.
 */
async function add(req: IReq<{content: any}>, res: IRes) {
  const { content } = req.body;
  await ContentService.addOne(content);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{content: IContent}>, res: IRes) {
  const { content } = req.body;
  await ContentService.updateOne(content);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await ContentService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  get,
  add,
  update,
  delete: delete_,
} as const;
