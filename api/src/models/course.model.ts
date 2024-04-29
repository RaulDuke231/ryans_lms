import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface ICourse {
  id: number;
  name: string;
  subject: string;
  cost: number;
  authors: [{
    name: string;
    edit: Date;
  }],
  modules: any;
  created: Date;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  name?: string,
  created?: Date,
  id?: number, // id last cause usually set by db
): any {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    created: (created ? new Date(created) : new Date()),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): ICourse {
  const p = param as ICourse;
  return new_(p.name, p.created, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
// function isUser(arg: unknown): boolean {
//   return (
//     !!arg &&
//     typeof arg === 'object' &&
//     'id' in arg && typeof arg.id === 'number' && 
//     'email' in arg && typeof arg.email === 'string' && 
//     'name' in arg && typeof arg.name === 'string' 
//   );
// }


// **** Export default **** //

export default {
  new: new_,
  from,
} as const;
