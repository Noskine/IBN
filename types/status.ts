export enum Status {
  // status de sucesso!
  OK = 200,
  Created = 201,
  NoContent = 204,

  // Algo está errado, mas tratado
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,

  // Error!
  InternalServerError = 500,
  NotImplemented = 501,
}