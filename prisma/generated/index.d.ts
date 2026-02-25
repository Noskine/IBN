
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model WeeklyObservation
 * 
 */
export type WeeklyObservation = $Result.DefaultSelection<Prisma.$WeeklyObservationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model People
 * 
 */
export type People = $Result.DefaultSelection<Prisma.$PeoplePayload>
/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Loan
 * 
 */
export type Loan = $Result.DefaultSelection<Prisma.$LoanPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LoanStatus: {
  ACTIVE: 'ACTIVE',
  RETURNED: 'RETURNED',
  OVERDUE: 'OVERDUE',
  LOST: 'LOST'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const IsUserAdm: {
  Yes: 'Yes',
  No: 'No'
};

export type IsUserAdm = (typeof IsUserAdm)[keyof typeof IsUserAdm]


export const peopleStatus: {
  DICENTE: 'DICENTE',
  DOCENTE: 'DOCENTE'
};

export type peopleStatus = (typeof peopleStatus)[keyof typeof peopleStatus]

}

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type IsUserAdm = $Enums.IsUserAdm

export const IsUserAdm: typeof $Enums.IsUserAdm

export type peopleStatus = $Enums.peopleStatus

export const peopleStatus: typeof $Enums.peopleStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Attendances
 * const attendances = await prisma.attendance.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Attendances
   * const attendances = await prisma.attendance.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weeklyObservation`: Exposes CRUD operations for the **WeeklyObservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyObservations
    * const weeklyObservations = await prisma.weeklyObservation.findMany()
    * ```
    */
  get weeklyObservation(): Prisma.WeeklyObservationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.people`: Exposes CRUD operations for the **People** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.people.findMany()
    * ```
    */
  get people(): Prisma.PeopleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loans
    * const loans = await prisma.loan.findMany()
    * ```
    */
  get loan(): Prisma.LoanDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Attendance: 'Attendance',
    WeeklyObservation: 'WeeklyObservation',
    User: 'User',
    People: 'People',
    Book: 'Book',
    Category: 'Category',
    Loan: 'Loan'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "attendance" | "weeklyObservation" | "user" | "people" | "book" | "category" | "loan"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      WeeklyObservation: {
        payload: Prisma.$WeeklyObservationPayload<ExtArgs>
        fields: Prisma.WeeklyObservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyObservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyObservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          findFirst: {
            args: Prisma.WeeklyObservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyObservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          findMany: {
            args: Prisma.WeeklyObservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>[]
          }
          create: {
            args: Prisma.WeeklyObservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          createMany: {
            args: Prisma.WeeklyObservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyObservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>[]
          }
          delete: {
            args: Prisma.WeeklyObservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          update: {
            args: Prisma.WeeklyObservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          deleteMany: {
            args: Prisma.WeeklyObservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyObservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeeklyObservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>[]
          }
          upsert: {
            args: Prisma.WeeklyObservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyObservationPayload>
          }
          aggregate: {
            args: Prisma.WeeklyObservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklyObservation>
          }
          groupBy: {
            args: Prisma.WeeklyObservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyObservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyObservationCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyObservationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      People: {
        payload: Prisma.$PeoplePayload<ExtArgs>
        fields: Prisma.PeopleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeopleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeopleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          findFirst: {
            args: Prisma.PeopleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeopleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          findMany: {
            args: Prisma.PeopleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>[]
          }
          create: {
            args: Prisma.PeopleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          createMany: {
            args: Prisma.PeopleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeopleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>[]
          }
          delete: {
            args: Prisma.PeopleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          update: {
            args: Prisma.PeopleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          deleteMany: {
            args: Prisma.PeopleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeopleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeopleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>[]
          }
          upsert: {
            args: Prisma.PeopleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplePayload>
          }
          aggregate: {
            args: Prisma.PeopleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeople>
          }
          groupBy: {
            args: Prisma.PeopleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeopleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeopleCountArgs<ExtArgs>
            result: $Utils.Optional<PeopleCountAggregateOutputType> | number
          }
        }
      }
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Loan: {
        payload: Prisma.$LoanPayload<ExtArgs>
        fields: Prisma.LoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findFirst: {
            args: Prisma.LoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findMany: {
            args: Prisma.LoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          create: {
            args: Prisma.LoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          createMany: {
            args: Prisma.LoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          delete: {
            args: Prisma.LoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          update: {
            args: Prisma.LoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          deleteMany: {
            args: Prisma.LoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          upsert: {
            args: Prisma.LoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          aggregate: {
            args: Prisma.LoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoan>
          }
          groupBy: {
            args: Prisma.LoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanCountArgs<ExtArgs>
            result: $Utils.Optional<LoanCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    attendance?: AttendanceOmit
    weeklyObservation?: WeeklyObservationOmit
    user?: UserOmit
    people?: PeopleOmit
    book?: BookOmit
    category?: CategoryOmit
    loan?: LoanOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PeopleCountOutputType
   */

  export type PeopleCountOutputType = {
    loans: number
    attendances: number
    weeklyObservations: number
  }

  export type PeopleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | PeopleCountOutputTypeCountLoansArgs
    attendances?: boolean | PeopleCountOutputTypeCountAttendancesArgs
    weeklyObservations?: boolean | PeopleCountOutputTypeCountWeeklyObservationsArgs
  }

  // Custom InputTypes
  /**
   * PeopleCountOutputType without action
   */
  export type PeopleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleCountOutputType
     */
    select?: PeopleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PeopleCountOutputType without action
   */
  export type PeopleCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * PeopleCountOutputType without action
   */
  export type PeopleCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * PeopleCountOutputType without action
   */
  export type PeopleCountOutputTypeCountWeeklyObservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyObservationWhereInput
  }


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    loans: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | BookCountOutputTypeCountLoansArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    books: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | CategoryCountOutputTypeCountBooksArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: string | null
    peopleId: string | null
    entryAt: Date | null
    observation: string | null
    exitAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: string | null
    peopleId: string | null
    entryAt: Date | null
    observation: string | null
    exitAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    peopleId: number
    entryAt: number
    observation: number
    exitAt: number
    _all: number
  }


  export type AttendanceMinAggregateInputType = {
    id?: true
    peopleId?: true
    entryAt?: true
    observation?: true
    exitAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    peopleId?: true
    entryAt?: true
    observation?: true
    exitAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    peopleId?: true
    entryAt?: true
    observation?: true
    exitAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: string
    peopleId: string
    entryAt: Date
    observation: string | null
    exitAt: Date | null
    _count: AttendanceCountAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    entryAt?: boolean
    observation?: boolean
    exitAt?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    entryAt?: boolean
    observation?: boolean
    exitAt?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    entryAt?: boolean
    observation?: boolean
    exitAt?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    peopleId?: boolean
    entryAt?: boolean
    observation?: boolean
    exitAt?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "peopleId" | "entryAt" | "observation" | "exitAt", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      people: Prisma.$PeoplePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      peopleId: string
      entryAt: Date
      observation: string | null
      exitAt: Date | null
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances and returns the data updated in the database.
     * @param {AttendanceUpdateManyAndReturnArgs} args - Arguments to update many Attendances.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendanceUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    people<T extends PeopleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeopleDefaultArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'String'>
    readonly peopleId: FieldRef<"Attendance", 'String'>
    readonly entryAt: FieldRef<"Attendance", 'DateTime'>
    readonly observation: FieldRef<"Attendance", 'String'>
    readonly exitAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance updateManyAndReturn
   */
  export type AttendanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model WeeklyObservation
   */

  export type AggregateWeeklyObservation = {
    _count: WeeklyObservationCountAggregateOutputType | null
    _min: WeeklyObservationMinAggregateOutputType | null
    _max: WeeklyObservationMaxAggregateOutputType | null
  }

  export type WeeklyObservationMinAggregateOutputType = {
    id: string | null
    peopleId: string | null
    weekStart: Date | null
    observation: string | null
  }

  export type WeeklyObservationMaxAggregateOutputType = {
    id: string | null
    peopleId: string | null
    weekStart: Date | null
    observation: string | null
  }

  export type WeeklyObservationCountAggregateOutputType = {
    id: number
    peopleId: number
    weekStart: number
    observation: number
    _all: number
  }


  export type WeeklyObservationMinAggregateInputType = {
    id?: true
    peopleId?: true
    weekStart?: true
    observation?: true
  }

  export type WeeklyObservationMaxAggregateInputType = {
    id?: true
    peopleId?: true
    weekStart?: true
    observation?: true
  }

  export type WeeklyObservationCountAggregateInputType = {
    id?: true
    peopleId?: true
    weekStart?: true
    observation?: true
    _all?: true
  }

  export type WeeklyObservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyObservation to aggregate.
     */
    where?: WeeklyObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyObservations to fetch.
     */
    orderBy?: WeeklyObservationOrderByWithRelationInput | WeeklyObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyObservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyObservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyObservations
    **/
    _count?: true | WeeklyObservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyObservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyObservationMaxAggregateInputType
  }

  export type GetWeeklyObservationAggregateType<T extends WeeklyObservationAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyObservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyObservation[P]>
      : GetScalarType<T[P], AggregateWeeklyObservation[P]>
  }




  export type WeeklyObservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyObservationWhereInput
    orderBy?: WeeklyObservationOrderByWithAggregationInput | WeeklyObservationOrderByWithAggregationInput[]
    by: WeeklyObservationScalarFieldEnum[] | WeeklyObservationScalarFieldEnum
    having?: WeeklyObservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyObservationCountAggregateInputType | true
    _min?: WeeklyObservationMinAggregateInputType
    _max?: WeeklyObservationMaxAggregateInputType
  }

  export type WeeklyObservationGroupByOutputType = {
    id: string
    peopleId: string
    weekStart: Date
    observation: string
    _count: WeeklyObservationCountAggregateOutputType | null
    _min: WeeklyObservationMinAggregateOutputType | null
    _max: WeeklyObservationMaxAggregateOutputType | null
  }

  type GetWeeklyObservationGroupByPayload<T extends WeeklyObservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyObservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyObservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyObservationGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyObservationGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyObservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    weekStart?: boolean
    observation?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyObservation"]>

  export type WeeklyObservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    weekStart?: boolean
    observation?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyObservation"]>

  export type WeeklyObservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    weekStart?: boolean
    observation?: boolean
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyObservation"]>

  export type WeeklyObservationSelectScalar = {
    id?: boolean
    peopleId?: boolean
    weekStart?: boolean
    observation?: boolean
  }

  export type WeeklyObservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "peopleId" | "weekStart" | "observation", ExtArgs["result"]["weeklyObservation"]>
  export type WeeklyObservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type WeeklyObservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type WeeklyObservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }

  export type $WeeklyObservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyObservation"
    objects: {
      people: Prisma.$PeoplePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      peopleId: string
      weekStart: Date
      observation: string
    }, ExtArgs["result"]["weeklyObservation"]>
    composites: {}
  }

  type WeeklyObservationGetPayload<S extends boolean | null | undefined | WeeklyObservationDefaultArgs> = $Result.GetResult<Prisma.$WeeklyObservationPayload, S>

  type WeeklyObservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeeklyObservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeeklyObservationCountAggregateInputType | true
    }

  export interface WeeklyObservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyObservation'], meta: { name: 'WeeklyObservation' } }
    /**
     * Find zero or one WeeklyObservation that matches the filter.
     * @param {WeeklyObservationFindUniqueArgs} args - Arguments to find a WeeklyObservation
     * @example
     * // Get one WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyObservationFindUniqueArgs>(args: SelectSubset<T, WeeklyObservationFindUniqueArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeeklyObservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeeklyObservationFindUniqueOrThrowArgs} args - Arguments to find a WeeklyObservation
     * @example
     * // Get one WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyObservationFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyObservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyObservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationFindFirstArgs} args - Arguments to find a WeeklyObservation
     * @example
     * // Get one WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyObservationFindFirstArgs>(args?: SelectSubset<T, WeeklyObservationFindFirstArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyObservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationFindFirstOrThrowArgs} args - Arguments to find a WeeklyObservation
     * @example
     * // Get one WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyObservationFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyObservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeeklyObservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyObservations
     * const weeklyObservations = await prisma.weeklyObservation.findMany()
     * 
     * // Get first 10 WeeklyObservations
     * const weeklyObservations = await prisma.weeklyObservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyObservationWithIdOnly = await prisma.weeklyObservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyObservationFindManyArgs>(args?: SelectSubset<T, WeeklyObservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeeklyObservation.
     * @param {WeeklyObservationCreateArgs} args - Arguments to create a WeeklyObservation.
     * @example
     * // Create one WeeklyObservation
     * const WeeklyObservation = await prisma.weeklyObservation.create({
     *   data: {
     *     // ... data to create a WeeklyObservation
     *   }
     * })
     * 
     */
    create<T extends WeeklyObservationCreateArgs>(args: SelectSubset<T, WeeklyObservationCreateArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeeklyObservations.
     * @param {WeeklyObservationCreateManyArgs} args - Arguments to create many WeeklyObservations.
     * @example
     * // Create many WeeklyObservations
     * const weeklyObservation = await prisma.weeklyObservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyObservationCreateManyArgs>(args?: SelectSubset<T, WeeklyObservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyObservations and returns the data saved in the database.
     * @param {WeeklyObservationCreateManyAndReturnArgs} args - Arguments to create many WeeklyObservations.
     * @example
     * // Create many WeeklyObservations
     * const weeklyObservation = await prisma.weeklyObservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyObservations and only return the `id`
     * const weeklyObservationWithIdOnly = await prisma.weeklyObservation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyObservationCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyObservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeeklyObservation.
     * @param {WeeklyObservationDeleteArgs} args - Arguments to delete one WeeklyObservation.
     * @example
     * // Delete one WeeklyObservation
     * const WeeklyObservation = await prisma.weeklyObservation.delete({
     *   where: {
     *     // ... filter to delete one WeeklyObservation
     *   }
     * })
     * 
     */
    delete<T extends WeeklyObservationDeleteArgs>(args: SelectSubset<T, WeeklyObservationDeleteArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeeklyObservation.
     * @param {WeeklyObservationUpdateArgs} args - Arguments to update one WeeklyObservation.
     * @example
     * // Update one WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyObservationUpdateArgs>(args: SelectSubset<T, WeeklyObservationUpdateArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeeklyObservations.
     * @param {WeeklyObservationDeleteManyArgs} args - Arguments to filter WeeklyObservations to delete.
     * @example
     * // Delete a few WeeklyObservations
     * const { count } = await prisma.weeklyObservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyObservationDeleteManyArgs>(args?: SelectSubset<T, WeeklyObservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyObservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyObservations
     * const weeklyObservation = await prisma.weeklyObservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyObservationUpdateManyArgs>(args: SelectSubset<T, WeeklyObservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyObservations and returns the data updated in the database.
     * @param {WeeklyObservationUpdateManyAndReturnArgs} args - Arguments to update many WeeklyObservations.
     * @example
     * // Update many WeeklyObservations
     * const weeklyObservation = await prisma.weeklyObservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeeklyObservations and only return the `id`
     * const weeklyObservationWithIdOnly = await prisma.weeklyObservation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeeklyObservationUpdateManyAndReturnArgs>(args: SelectSubset<T, WeeklyObservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeeklyObservation.
     * @param {WeeklyObservationUpsertArgs} args - Arguments to update or create a WeeklyObservation.
     * @example
     * // Update or create a WeeklyObservation
     * const weeklyObservation = await prisma.weeklyObservation.upsert({
     *   create: {
     *     // ... data to create a WeeklyObservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyObservation we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyObservationUpsertArgs>(args: SelectSubset<T, WeeklyObservationUpsertArgs<ExtArgs>>): Prisma__WeeklyObservationClient<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeeklyObservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationCountArgs} args - Arguments to filter WeeklyObservations to count.
     * @example
     * // Count the number of WeeklyObservations
     * const count = await prisma.weeklyObservation.count({
     *   where: {
     *     // ... the filter for the WeeklyObservations we want to count
     *   }
     * })
    **/
    count<T extends WeeklyObservationCountArgs>(
      args?: Subset<T, WeeklyObservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyObservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyObservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeeklyObservationAggregateArgs>(args: Subset<T, WeeklyObservationAggregateArgs>): Prisma.PrismaPromise<GetWeeklyObservationAggregateType<T>>

    /**
     * Group by WeeklyObservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyObservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeeklyObservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyObservationGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyObservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeeklyObservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyObservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyObservation model
   */
  readonly fields: WeeklyObservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyObservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyObservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    people<T extends PeopleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeopleDefaultArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeeklyObservation model
   */
  interface WeeklyObservationFieldRefs {
    readonly id: FieldRef<"WeeklyObservation", 'String'>
    readonly peopleId: FieldRef<"WeeklyObservation", 'String'>
    readonly weekStart: FieldRef<"WeeklyObservation", 'DateTime'>
    readonly observation: FieldRef<"WeeklyObservation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyObservation findUnique
   */
  export type WeeklyObservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyObservation to fetch.
     */
    where: WeeklyObservationWhereUniqueInput
  }

  /**
   * WeeklyObservation findUniqueOrThrow
   */
  export type WeeklyObservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyObservation to fetch.
     */
    where: WeeklyObservationWhereUniqueInput
  }

  /**
   * WeeklyObservation findFirst
   */
  export type WeeklyObservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyObservation to fetch.
     */
    where?: WeeklyObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyObservations to fetch.
     */
    orderBy?: WeeklyObservationOrderByWithRelationInput | WeeklyObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyObservations.
     */
    cursor?: WeeklyObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyObservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyObservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyObservations.
     */
    distinct?: WeeklyObservationScalarFieldEnum | WeeklyObservationScalarFieldEnum[]
  }

  /**
   * WeeklyObservation findFirstOrThrow
   */
  export type WeeklyObservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyObservation to fetch.
     */
    where?: WeeklyObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyObservations to fetch.
     */
    orderBy?: WeeklyObservationOrderByWithRelationInput | WeeklyObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyObservations.
     */
    cursor?: WeeklyObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyObservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyObservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyObservations.
     */
    distinct?: WeeklyObservationScalarFieldEnum | WeeklyObservationScalarFieldEnum[]
  }

  /**
   * WeeklyObservation findMany
   */
  export type WeeklyObservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyObservations to fetch.
     */
    where?: WeeklyObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyObservations to fetch.
     */
    orderBy?: WeeklyObservationOrderByWithRelationInput | WeeklyObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyObservations.
     */
    cursor?: WeeklyObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyObservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyObservations.
     */
    skip?: number
    distinct?: WeeklyObservationScalarFieldEnum | WeeklyObservationScalarFieldEnum[]
  }

  /**
   * WeeklyObservation create
   */
  export type WeeklyObservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyObservation.
     */
    data: XOR<WeeklyObservationCreateInput, WeeklyObservationUncheckedCreateInput>
  }

  /**
   * WeeklyObservation createMany
   */
  export type WeeklyObservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyObservations.
     */
    data: WeeklyObservationCreateManyInput | WeeklyObservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyObservation createManyAndReturn
   */
  export type WeeklyObservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * The data used to create many WeeklyObservations.
     */
    data: WeeklyObservationCreateManyInput | WeeklyObservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyObservation update
   */
  export type WeeklyObservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyObservation.
     */
    data: XOR<WeeklyObservationUpdateInput, WeeklyObservationUncheckedUpdateInput>
    /**
     * Choose, which WeeklyObservation to update.
     */
    where: WeeklyObservationWhereUniqueInput
  }

  /**
   * WeeklyObservation updateMany
   */
  export type WeeklyObservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyObservations.
     */
    data: XOR<WeeklyObservationUpdateManyMutationInput, WeeklyObservationUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyObservations to update
     */
    where?: WeeklyObservationWhereInput
    /**
     * Limit how many WeeklyObservations to update.
     */
    limit?: number
  }

  /**
   * WeeklyObservation updateManyAndReturn
   */
  export type WeeklyObservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * The data used to update WeeklyObservations.
     */
    data: XOR<WeeklyObservationUpdateManyMutationInput, WeeklyObservationUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyObservations to update
     */
    where?: WeeklyObservationWhereInput
    /**
     * Limit how many WeeklyObservations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyObservation upsert
   */
  export type WeeklyObservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyObservation to update in case it exists.
     */
    where: WeeklyObservationWhereUniqueInput
    /**
     * In case the WeeklyObservation found by the `where` argument doesn't exist, create a new WeeklyObservation with this data.
     */
    create: XOR<WeeklyObservationCreateInput, WeeklyObservationUncheckedCreateInput>
    /**
     * In case the WeeklyObservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyObservationUpdateInput, WeeklyObservationUncheckedUpdateInput>
  }

  /**
   * WeeklyObservation delete
   */
  export type WeeklyObservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    /**
     * Filter which WeeklyObservation to delete.
     */
    where: WeeklyObservationWhereUniqueInput
  }

  /**
   * WeeklyObservation deleteMany
   */
  export type WeeklyObservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyObservations to delete
     */
    where?: WeeklyObservationWhereInput
    /**
     * Limit how many WeeklyObservations to delete.
     */
    limit?: number
  }

  /**
   * WeeklyObservation without action
   */
  export type WeeklyObservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    pass: string | null
    urlImage: string | null
    createdAt: Date | null
    isAdm: $Enums.IsUserAdm | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    pass: string | null
    urlImage: string | null
    createdAt: Date | null
    isAdm: $Enums.IsUserAdm | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    pass: number
    urlImage: number
    createdAt: number
    isAdm: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    pass?: true
    urlImage?: true
    createdAt?: true
    isAdm?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    pass?: true
    urlImage?: true
    createdAt?: true
    isAdm?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    pass?: true
    urlImage?: true
    createdAt?: true
    isAdm?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    pass: string
    urlImage: string | null
    createdAt: Date
    isAdm: $Enums.IsUserAdm
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    pass?: boolean
    urlImage?: boolean
    createdAt?: boolean
    isAdm?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    pass?: boolean
    urlImage?: boolean
    createdAt?: boolean
    isAdm?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    pass?: boolean
    urlImage?: boolean
    createdAt?: boolean
    isAdm?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    pass?: boolean
    urlImage?: boolean
    createdAt?: boolean
    isAdm?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "pass" | "urlImage" | "createdAt" | "isAdm", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      pass: string
      urlImage: string | null
      createdAt: Date
      isAdm: $Enums.IsUserAdm
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly pass: FieldRef<"User", 'String'>
    readonly urlImage: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly isAdm: FieldRef<"User", 'IsUserAdm'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model People
   */

  export type AggregatePeople = {
    _count: PeopleCountAggregateOutputType | null
    _min: PeopleMinAggregateOutputType | null
    _max: PeopleMaxAggregateOutputType | null
  }

  export type PeopleMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    status: $Enums.peopleStatus | null
    course: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PeopleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    status: $Enums.peopleStatus | null
    course: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PeopleCountAggregateOutputType = {
    id: number
    name: number
    email: number
    status: number
    course: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PeopleMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    course?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PeopleMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    course?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PeopleCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    course?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PeopleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to aggregate.
     */
    where?: PeopleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PeopleOrderByWithRelationInput | PeopleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeopleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PeopleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeopleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeopleMaxAggregateInputType
  }

  export type GetPeopleAggregateType<T extends PeopleAggregateArgs> = {
        [P in keyof T & keyof AggregatePeople]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeople[P]>
      : GetScalarType<T[P], AggregatePeople[P]>
  }




  export type PeopleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeopleWhereInput
    orderBy?: PeopleOrderByWithAggregationInput | PeopleOrderByWithAggregationInput[]
    by: PeopleScalarFieldEnum[] | PeopleScalarFieldEnum
    having?: PeopleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeopleCountAggregateInputType | true
    _min?: PeopleMinAggregateInputType
    _max?: PeopleMaxAggregateInputType
  }

  export type PeopleGroupByOutputType = {
    id: string
    name: string
    email: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt: Date
    updatedAt: Date
    _count: PeopleCountAggregateOutputType | null
    _min: PeopleMinAggregateOutputType | null
    _max: PeopleMaxAggregateOutputType | null
  }

  type GetPeopleGroupByPayload<T extends PeopleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeopleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeopleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeopleGroupByOutputType[P]>
            : GetScalarType<T[P], PeopleGroupByOutputType[P]>
        }
      >
    >


  export type PeopleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    course?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loans?: boolean | People$loansArgs<ExtArgs>
    attendances?: boolean | People$attendancesArgs<ExtArgs>
    weeklyObservations?: boolean | People$weeklyObservationsArgs<ExtArgs>
    _count?: boolean | PeopleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["people"]>

  export type PeopleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    course?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["people"]>

  export type PeopleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    course?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["people"]>

  export type PeopleSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    course?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PeopleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "status" | "course" | "createdAt" | "updatedAt", ExtArgs["result"]["people"]>
  export type PeopleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | People$loansArgs<ExtArgs>
    attendances?: boolean | People$attendancesArgs<ExtArgs>
    weeklyObservations?: boolean | People$weeklyObservationsArgs<ExtArgs>
    _count?: boolean | PeopleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PeopleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PeopleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PeoplePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "People"
    objects: {
      loans: Prisma.$LoanPayload<ExtArgs>[]
      attendances: Prisma.$AttendancePayload<ExtArgs>[]
      weeklyObservations: Prisma.$WeeklyObservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      status: $Enums.peopleStatus
      course: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["people"]>
    composites: {}
  }

  type PeopleGetPayload<S extends boolean | null | undefined | PeopleDefaultArgs> = $Result.GetResult<Prisma.$PeoplePayload, S>

  type PeopleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeopleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeopleCountAggregateInputType | true
    }

  export interface PeopleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['People'], meta: { name: 'People' } }
    /**
     * Find zero or one People that matches the filter.
     * @param {PeopleFindUniqueArgs} args - Arguments to find a People
     * @example
     * // Get one People
     * const people = await prisma.people.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeopleFindUniqueArgs>(args: SelectSubset<T, PeopleFindUniqueArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one People that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeopleFindUniqueOrThrowArgs} args - Arguments to find a People
     * @example
     * // Get one People
     * const people = await prisma.people.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeopleFindUniqueOrThrowArgs>(args: SelectSubset<T, PeopleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleFindFirstArgs} args - Arguments to find a People
     * @example
     * // Get one People
     * const people = await prisma.people.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeopleFindFirstArgs>(args?: SelectSubset<T, PeopleFindFirstArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first People that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleFindFirstOrThrowArgs} args - Arguments to find a People
     * @example
     * // Get one People
     * const people = await prisma.people.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeopleFindFirstOrThrowArgs>(args?: SelectSubset<T, PeopleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.people.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.people.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peopleWithIdOnly = await prisma.people.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeopleFindManyArgs>(args?: SelectSubset<T, PeopleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a People.
     * @param {PeopleCreateArgs} args - Arguments to create a People.
     * @example
     * // Create one People
     * const People = await prisma.people.create({
     *   data: {
     *     // ... data to create a People
     *   }
     * })
     * 
     */
    create<T extends PeopleCreateArgs>(args: SelectSubset<T, PeopleCreateArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PeopleCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const people = await prisma.people.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeopleCreateManyArgs>(args?: SelectSubset<T, PeopleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PeopleCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const people = await prisma.people.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const peopleWithIdOnly = await prisma.people.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeopleCreateManyAndReturnArgs>(args?: SelectSubset<T, PeopleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a People.
     * @param {PeopleDeleteArgs} args - Arguments to delete one People.
     * @example
     * // Delete one People
     * const People = await prisma.people.delete({
     *   where: {
     *     // ... filter to delete one People
     *   }
     * })
     * 
     */
    delete<T extends PeopleDeleteArgs>(args: SelectSubset<T, PeopleDeleteArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one People.
     * @param {PeopleUpdateArgs} args - Arguments to update one People.
     * @example
     * // Update one People
     * const people = await prisma.people.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeopleUpdateArgs>(args: SelectSubset<T, PeopleUpdateArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PeopleDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.people.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeopleDeleteManyArgs>(args?: SelectSubset<T, PeopleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const people = await prisma.people.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeopleUpdateManyArgs>(args: SelectSubset<T, PeopleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PeopleUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const people = await prisma.people.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const peopleWithIdOnly = await prisma.people.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PeopleUpdateManyAndReturnArgs>(args: SelectSubset<T, PeopleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one People.
     * @param {PeopleUpsertArgs} args - Arguments to update or create a People.
     * @example
     * // Update or create a People
     * const people = await prisma.people.upsert({
     *   create: {
     *     // ... data to create a People
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the People we want to update
     *   }
     * })
     */
    upsert<T extends PeopleUpsertArgs>(args: SelectSubset<T, PeopleUpsertArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.people.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PeopleCountArgs>(
      args?: Subset<T, PeopleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeopleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PeopleAggregateArgs>(args: Subset<T, PeopleAggregateArgs>): Prisma.PrismaPromise<GetPeopleAggregateType<T>>

    /**
     * Group by People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PeopleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeopleGroupByArgs['orderBy'] }
        : { orderBy?: PeopleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PeopleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeopleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the People model
   */
  readonly fields: PeopleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for People.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeopleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loans<T extends People$loansArgs<ExtArgs> = {}>(args?: Subset<T, People$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendances<T extends People$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, People$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weeklyObservations<T extends People$weeklyObservationsArgs<ExtArgs> = {}>(args?: Subset<T, People$weeklyObservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyObservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the People model
   */
  interface PeopleFieldRefs {
    readonly id: FieldRef<"People", 'String'>
    readonly name: FieldRef<"People", 'String'>
    readonly email: FieldRef<"People", 'String'>
    readonly status: FieldRef<"People", 'peopleStatus'>
    readonly course: FieldRef<"People", 'String'>
    readonly createdAt: FieldRef<"People", 'DateTime'>
    readonly updatedAt: FieldRef<"People", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * People findUnique
   */
  export type PeopleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where: PeopleWhereUniqueInput
  }

  /**
   * People findUniqueOrThrow
   */
  export type PeopleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where: PeopleWhereUniqueInput
  }

  /**
   * People findFirst
   */
  export type PeopleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PeopleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PeopleOrderByWithRelationInput | PeopleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PeopleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PeopleScalarFieldEnum | PeopleScalarFieldEnum[]
  }

  /**
   * People findFirstOrThrow
   */
  export type PeopleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PeopleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PeopleOrderByWithRelationInput | PeopleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PeopleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PeopleScalarFieldEnum | PeopleScalarFieldEnum[]
  }

  /**
   * People findMany
   */
  export type PeopleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PeopleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PeopleOrderByWithRelationInput | PeopleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PeopleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PeopleScalarFieldEnum | PeopleScalarFieldEnum[]
  }

  /**
   * People create
   */
  export type PeopleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * The data needed to create a People.
     */
    data: XOR<PeopleCreateInput, PeopleUncheckedCreateInput>
  }

  /**
   * People createMany
   */
  export type PeopleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PeopleCreateManyInput | PeopleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * People createManyAndReturn
   */
  export type PeopleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PeopleCreateManyInput | PeopleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * People update
   */
  export type PeopleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * The data needed to update a People.
     */
    data: XOR<PeopleUpdateInput, PeopleUncheckedUpdateInput>
    /**
     * Choose, which People to update.
     */
    where: PeopleWhereUniqueInput
  }

  /**
   * People updateMany
   */
  export type PeopleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PeopleUpdateManyMutationInput, PeopleUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PeopleWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * People updateManyAndReturn
   */
  export type PeopleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PeopleUpdateManyMutationInput, PeopleUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PeopleWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * People upsert
   */
  export type PeopleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * The filter to search for the People to update in case it exists.
     */
    where: PeopleWhereUniqueInput
    /**
     * In case the People found by the `where` argument doesn't exist, create a new People with this data.
     */
    create: XOR<PeopleCreateInput, PeopleUncheckedCreateInput>
    /**
     * In case the People was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeopleUpdateInput, PeopleUncheckedUpdateInput>
  }

  /**
   * People delete
   */
  export type PeopleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
    /**
     * Filter which People to delete.
     */
    where: PeopleWhereUniqueInput
  }

  /**
   * People deleteMany
   */
  export type PeopleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PeopleWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * People.loans
   */
  export type People$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * People.attendances
   */
  export type People$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * People.weeklyObservations
   */
  export type People$weeklyObservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyObservation
     */
    select?: WeeklyObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyObservation
     */
    omit?: WeeklyObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyObservationInclude<ExtArgs> | null
    where?: WeeklyObservationWhereInput
    orderBy?: WeeklyObservationOrderByWithRelationInput | WeeklyObservationOrderByWithRelationInput[]
    cursor?: WeeklyObservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyObservationScalarFieldEnum | WeeklyObservationScalarFieldEnum[]
  }

  /**
   * People without action
   */
  export type PeopleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the People
     */
    select?: PeopleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the People
     */
    omit?: PeopleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeopleInclude<ExtArgs> | null
  }


  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    totalCopies: number | null
    availableCopies: number | null
  }

  export type BookSumAggregateOutputType = {
    totalCopies: number | null
    availableCopies: number | null
  }

  export type BookMinAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    barcode: string | null
    categoryId: string | null
    totalCopies: number | null
    availableCopies: number | null
    publisher: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookMaxAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    barcode: string | null
    categoryId: string | null
    totalCopies: number | null
    availableCopies: number | null
    publisher: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    title: number
    author: number
    barcode: number
    categoryId: number
    totalCopies: number
    availableCopies: number
    publisher: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    totalCopies?: true
    availableCopies?: true
  }

  export type BookSumAggregateInputType = {
    totalCopies?: true
    availableCopies?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    barcode?: true
    categoryId?: true
    totalCopies?: true
    availableCopies?: true
    publisher?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    barcode?: true
    categoryId?: true
    totalCopies?: true
    availableCopies?: true
    publisher?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    barcode?: true
    categoryId?: true
    totalCopies?: true
    availableCopies?: true
    publisher?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: string
    title: string
    author: string
    barcode: string | null
    categoryId: string | null
    totalCopies: number
    availableCopies: number
    publisher: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    barcode?: boolean
    categoryId?: boolean
    totalCopies?: boolean
    availableCopies?: boolean
    publisher?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Book$categoryArgs<ExtArgs>
    loans?: boolean | Book$loansArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    barcode?: boolean
    categoryId?: boolean
    totalCopies?: boolean
    availableCopies?: boolean
    publisher?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Book$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    barcode?: boolean
    categoryId?: boolean
    totalCopies?: boolean
    availableCopies?: boolean
    publisher?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Book$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    barcode?: boolean
    categoryId?: boolean
    totalCopies?: boolean
    availableCopies?: boolean
    publisher?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "barcode" | "categoryId" | "totalCopies" | "availableCopies" | "publisher" | "createdAt" | "updatedAt", ExtArgs["result"]["book"]>
  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Book$categoryArgs<ExtArgs>
    loans?: boolean | Book$loansArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Book$categoryArgs<ExtArgs>
  }
  export type BookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Book$categoryArgs<ExtArgs>
  }

  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      loans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      author: string
      barcode: string | null
      categoryId: string | null
      totalCopies: number
      availableCopies: number
      publisher: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["book"]>
    composites: {}
  }

  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookFindUniqueArgs>(args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookFindFirstArgs>(args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookFindManyArgs>(args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
     */
    create<T extends BookCreateArgs>(args: SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {BookCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookCreateManyArgs>(args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Books and returns the data saved in the database.
     * @param {BookCreateManyAndReturnArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookCreateManyAndReturnArgs>(args?: SelectSubset<T, BookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
     */
    delete<T extends BookDeleteArgs>(args: SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookUpdateArgs>(args: SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookDeleteManyArgs>(args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookUpdateManyArgs>(args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books and returns the data updated in the database.
     * @param {BookUpdateManyAndReturnArgs} args - Arguments to update many Books.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookUpdateManyAndReturnArgs>(args: SelectSubset<T, BookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
     */
    upsert<T extends BookUpsertArgs>(args: SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Book$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Book$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    loans<T extends Book$loansArgs<ExtArgs> = {}>(args?: Subset<T, Book$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Book model
   */
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'String'>
    readonly title: FieldRef<"Book", 'String'>
    readonly author: FieldRef<"Book", 'String'>
    readonly barcode: FieldRef<"Book", 'String'>
    readonly categoryId: FieldRef<"Book", 'String'>
    readonly totalCopies: FieldRef<"Book", 'Int'>
    readonly availableCopies: FieldRef<"Book", 'Int'>
    readonly publisher: FieldRef<"Book", 'String'>
    readonly createdAt: FieldRef<"Book", 'DateTime'>
    readonly updatedAt: FieldRef<"Book", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Book createManyAndReturn
   */
  export type BookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
  }

  /**
   * Book updateManyAndReturn
   */
  export type BookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to delete.
     */
    limit?: number
  }

  /**
   * Book.category
   */
  export type Book$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Book.loans
   */
  export type Book$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    books?: boolean | Category$booksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | Category$booksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      books: Prisma.$BookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends Category$booksArgs<ExtArgs> = {}>(args?: Subset<T, Category$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.books
   */
  export type Category$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Loan
   */

  export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  export type LoanMinAggregateOutputType = {
    id: string | null
    peopleId: string | null
    bookId: string | null
    loanDate: Date | null
    dueDate: Date | null
    returnDate: Date | null
    status: $Enums.LoanStatus | null
  }

  export type LoanMaxAggregateOutputType = {
    id: string | null
    peopleId: string | null
    bookId: string | null
    loanDate: Date | null
    dueDate: Date | null
    returnDate: Date | null
    status: $Enums.LoanStatus | null
  }

  export type LoanCountAggregateOutputType = {
    id: number
    peopleId: number
    bookId: number
    loanDate: number
    dueDate: number
    returnDate: number
    status: number
    _all: number
  }


  export type LoanMinAggregateInputType = {
    id?: true
    peopleId?: true
    bookId?: true
    loanDate?: true
    dueDate?: true
    returnDate?: true
    status?: true
  }

  export type LoanMaxAggregateInputType = {
    id?: true
    peopleId?: true
    bookId?: true
    loanDate?: true
    dueDate?: true
    returnDate?: true
    status?: true
  }

  export type LoanCountAggregateInputType = {
    id?: true
    peopleId?: true
    bookId?: true
    loanDate?: true
    dueDate?: true
    returnDate?: true
    status?: true
    _all?: true
  }

  export type LoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType
  }

  export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoan[P]>
      : GetScalarType<T[P], AggregateLoan[P]>
  }




  export type LoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithAggregationInput | LoanOrderByWithAggregationInput[]
    by: LoanScalarFieldEnum[] | LoanScalarFieldEnum
    having?: LoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanCountAggregateInputType | true
    _min?: LoanMinAggregateInputType
    _max?: LoanMaxAggregateInputType
  }

  export type LoanGroupByOutputType = {
    id: string
    peopleId: string
    bookId: string | null
    loanDate: Date
    dueDate: Date
    returnDate: Date | null
    status: $Enums.LoanStatus
    _count: LoanCountAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanGroupByOutputType[P]>
            : GetScalarType<T[P], LoanGroupByOutputType[P]>
        }
      >
    >


  export type LoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    bookId?: boolean
    loanDate?: boolean
    dueDate?: boolean
    returnDate?: boolean
    status?: boolean
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    bookId?: boolean
    loanDate?: boolean
    dueDate?: boolean
    returnDate?: boolean
    status?: boolean
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    peopleId?: boolean
    bookId?: boolean
    loanDate?: boolean
    dueDate?: boolean
    returnDate?: boolean
    status?: boolean
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectScalar = {
    id?: boolean
    peopleId?: boolean
    bookId?: boolean
    loanDate?: boolean
    dueDate?: boolean
    returnDate?: boolean
    status?: boolean
  }

  export type LoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "peopleId" | "bookId" | "loanDate" | "dueDate" | "returnDate" | "status", ExtArgs["result"]["loan"]>
  export type LoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type LoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }
  export type LoanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | Loan$bookArgs<ExtArgs>
    people?: boolean | PeopleDefaultArgs<ExtArgs>
  }

  export type $LoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Loan"
    objects: {
      book: Prisma.$BookPayload<ExtArgs> | null
      people: Prisma.$PeoplePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      peopleId: string
      bookId: string | null
      loanDate: Date
      dueDate: Date
      returnDate: Date | null
      status: $Enums.LoanStatus
    }, ExtArgs["result"]["loan"]>
    composites: {}
  }

  type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = $Result.GetResult<Prisma.$LoanPayload, S>

  type LoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanCountAggregateInputType | true
    }

  export interface LoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Loan'], meta: { name: 'Loan' } }
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     * 
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanFindManyArgs>(args?: SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     * 
     */
    create<T extends LoanCreateArgs>(args: SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanCreateManyArgs>(args?: SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     * 
     */
    delete<T extends LoanDeleteArgs>(args: SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanUpdateArgs>(args: SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanUpdateManyArgs>(args: SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(
      args?: Subset<T, LoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>

    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanGroupByArgs['orderBy'] }
        : { orderBy?: LoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Loan model
   */
  readonly fields: LoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Loan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends Loan$bookArgs<ExtArgs> = {}>(args?: Subset<T, Loan$bookArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    people<T extends PeopleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeopleDefaultArgs<ExtArgs>>): Prisma__PeopleClient<$Result.GetResult<Prisma.$PeoplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Loan model
   */
  interface LoanFieldRefs {
    readonly id: FieldRef<"Loan", 'String'>
    readonly peopleId: FieldRef<"Loan", 'String'>
    readonly bookId: FieldRef<"Loan", 'String'>
    readonly loanDate: FieldRef<"Loan", 'DateTime'>
    readonly dueDate: FieldRef<"Loan", 'DateTime'>
    readonly returnDate: FieldRef<"Loan", 'DateTime'>
    readonly status: FieldRef<"Loan", 'LoanStatus'>
  }
    

  // Custom InputTypes
  /**
   * Loan findUnique
   */
  export type LoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findUniqueOrThrow
   */
  export type LoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findFirst
   */
  export type LoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findFirstOrThrow
   */
  export type LoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findMany
   */
  export type LoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loans to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan create
   */
  export type LoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to create a Loan.
     */
    data: XOR<LoanCreateInput, LoanUncheckedCreateInput>
  }

  /**
   * Loan createMany
   */
  export type LoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Loan createManyAndReturn
   */
  export type LoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan update
   */
  export type LoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to update a Loan.
     */
    data: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
    /**
     * Choose, which Loan to update.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan updateMany
   */
  export type LoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
  }

  /**
   * Loan updateManyAndReturn
   */
  export type LoanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan upsert
   */
  export type LoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: LoanWhereUniqueInput
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: XOR<LoanCreateInput, LoanUncheckedCreateInput>
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
  }

  /**
   * Loan delete
   */
  export type LoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter which Loan to delete.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan deleteMany
   */
  export type LoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to delete.
     */
    limit?: number
  }

  /**
   * Loan.book
   */
  export type Loan$bookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
  }

  /**
   * Loan without action
   */
  export type LoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    peopleId: 'peopleId',
    entryAt: 'entryAt',
    observation: 'observation',
    exitAt: 'exitAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const WeeklyObservationScalarFieldEnum: {
    id: 'id',
    peopleId: 'peopleId',
    weekStart: 'weekStart',
    observation: 'observation'
  };

  export type WeeklyObservationScalarFieldEnum = (typeof WeeklyObservationScalarFieldEnum)[keyof typeof WeeklyObservationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    pass: 'pass',
    urlImage: 'urlImage',
    createdAt: 'createdAt',
    isAdm: 'isAdm'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PeopleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    status: 'status',
    course: 'course',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PeopleScalarFieldEnum = (typeof PeopleScalarFieldEnum)[keyof typeof PeopleScalarFieldEnum]


  export const BookScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    barcode: 'barcode',
    categoryId: 'categoryId',
    totalCopies: 'totalCopies',
    availableCopies: 'availableCopies',
    publisher: 'publisher',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const LoanScalarFieldEnum: {
    id: 'id',
    peopleId: 'peopleId',
    bookId: 'bookId',
    loanDate: 'loanDate',
    dueDate: 'dueDate',
    returnDate: 'returnDate',
    status: 'status'
  };

  export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'IsUserAdm'
   */
  export type EnumIsUserAdmFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IsUserAdm'>
    


  /**
   * Reference to a field of type 'IsUserAdm[]'
   */
  export type ListEnumIsUserAdmFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IsUserAdm[]'>
    


  /**
   * Reference to a field of type 'peopleStatus'
   */
  export type EnumpeopleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'peopleStatus'>
    


  /**
   * Reference to a field of type 'peopleStatus[]'
   */
  export type ListEnumpeopleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'peopleStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: StringFilter<"Attendance"> | string
    peopleId?: StringFilter<"Attendance"> | string
    entryAt?: DateTimeFilter<"Attendance"> | Date | string
    observation?: StringNullableFilter<"Attendance"> | string | null
    exitAt?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    entryAt?: SortOrder
    observation?: SortOrderInput | SortOrder
    exitAt?: SortOrderInput | SortOrder
    people?: PeopleOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    peopleId?: StringFilter<"Attendance"> | string
    entryAt?: DateTimeFilter<"Attendance"> | Date | string
    observation?: StringNullableFilter<"Attendance"> | string | null
    exitAt?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    entryAt?: SortOrder
    observation?: SortOrderInput | SortOrder
    exitAt?: SortOrderInput | SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendance"> | string
    peopleId?: StringWithAggregatesFilter<"Attendance"> | string
    entryAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    observation?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    exitAt?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
  }

  export type WeeklyObservationWhereInput = {
    AND?: WeeklyObservationWhereInput | WeeklyObservationWhereInput[]
    OR?: WeeklyObservationWhereInput[]
    NOT?: WeeklyObservationWhereInput | WeeklyObservationWhereInput[]
    id?: StringFilter<"WeeklyObservation"> | string
    peopleId?: StringFilter<"WeeklyObservation"> | string
    weekStart?: DateTimeFilter<"WeeklyObservation"> | Date | string
    observation?: StringFilter<"WeeklyObservation"> | string
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }

  export type WeeklyObservationOrderByWithRelationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    weekStart?: SortOrder
    observation?: SortOrder
    people?: PeopleOrderByWithRelationInput
  }

  export type WeeklyObservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeeklyObservationWhereInput | WeeklyObservationWhereInput[]
    OR?: WeeklyObservationWhereInput[]
    NOT?: WeeklyObservationWhereInput | WeeklyObservationWhereInput[]
    peopleId?: StringFilter<"WeeklyObservation"> | string
    weekStart?: DateTimeFilter<"WeeklyObservation"> | Date | string
    observation?: StringFilter<"WeeklyObservation"> | string
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }, "id">

  export type WeeklyObservationOrderByWithAggregationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    weekStart?: SortOrder
    observation?: SortOrder
    _count?: WeeklyObservationCountOrderByAggregateInput
    _max?: WeeklyObservationMaxOrderByAggregateInput
    _min?: WeeklyObservationMinOrderByAggregateInput
  }

  export type WeeklyObservationScalarWhereWithAggregatesInput = {
    AND?: WeeklyObservationScalarWhereWithAggregatesInput | WeeklyObservationScalarWhereWithAggregatesInput[]
    OR?: WeeklyObservationScalarWhereWithAggregatesInput[]
    NOT?: WeeklyObservationScalarWhereWithAggregatesInput | WeeklyObservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyObservation"> | string
    peopleId?: StringWithAggregatesFilter<"WeeklyObservation"> | string
    weekStart?: DateTimeWithAggregatesFilter<"WeeklyObservation"> | Date | string
    observation?: StringWithAggregatesFilter<"WeeklyObservation"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    pass?: StringFilter<"User"> | string
    urlImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isAdm?: EnumIsUserAdmFilter<"User"> | $Enums.IsUserAdm
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    pass?: SortOrder
    urlImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isAdm?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    pass?: StringFilter<"User"> | string
    urlImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    isAdm?: EnumIsUserAdmFilter<"User"> | $Enums.IsUserAdm
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    pass?: SortOrder
    urlImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isAdm?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    pass?: StringWithAggregatesFilter<"User"> | string
    urlImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isAdm?: EnumIsUserAdmWithAggregatesFilter<"User"> | $Enums.IsUserAdm
  }

  export type PeopleWhereInput = {
    AND?: PeopleWhereInput | PeopleWhereInput[]
    OR?: PeopleWhereInput[]
    NOT?: PeopleWhereInput | PeopleWhereInput[]
    id?: StringFilter<"People"> | string
    name?: StringFilter<"People"> | string
    email?: StringNullableFilter<"People"> | string | null
    status?: EnumpeopleStatusFilter<"People"> | $Enums.peopleStatus
    course?: StringFilter<"People"> | string
    createdAt?: DateTimeFilter<"People"> | Date | string
    updatedAt?: DateTimeFilter<"People"> | Date | string
    loans?: LoanListRelationFilter
    attendances?: AttendanceListRelationFilter
    weeklyObservations?: WeeklyObservationListRelationFilter
  }

  export type PeopleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    course?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loans?: LoanOrderByRelationAggregateInput
    attendances?: AttendanceOrderByRelationAggregateInput
    weeklyObservations?: WeeklyObservationOrderByRelationAggregateInput
  }

  export type PeopleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PeopleWhereInput | PeopleWhereInput[]
    OR?: PeopleWhereInput[]
    NOT?: PeopleWhereInput | PeopleWhereInput[]
    name?: StringFilter<"People"> | string
    status?: EnumpeopleStatusFilter<"People"> | $Enums.peopleStatus
    course?: StringFilter<"People"> | string
    createdAt?: DateTimeFilter<"People"> | Date | string
    updatedAt?: DateTimeFilter<"People"> | Date | string
    loans?: LoanListRelationFilter
    attendances?: AttendanceListRelationFilter
    weeklyObservations?: WeeklyObservationListRelationFilter
  }, "id" | "email">

  export type PeopleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    course?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PeopleCountOrderByAggregateInput
    _max?: PeopleMaxOrderByAggregateInput
    _min?: PeopleMinOrderByAggregateInput
  }

  export type PeopleScalarWhereWithAggregatesInput = {
    AND?: PeopleScalarWhereWithAggregatesInput | PeopleScalarWhereWithAggregatesInput[]
    OR?: PeopleScalarWhereWithAggregatesInput[]
    NOT?: PeopleScalarWhereWithAggregatesInput | PeopleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"People"> | string
    name?: StringWithAggregatesFilter<"People"> | string
    email?: StringNullableWithAggregatesFilter<"People"> | string | null
    status?: EnumpeopleStatusWithAggregatesFilter<"People"> | $Enums.peopleStatus
    course?: StringWithAggregatesFilter<"People"> | string
    createdAt?: DateTimeWithAggregatesFilter<"People"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"People"> | Date | string
  }

  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: StringFilter<"Book"> | string
    title?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    barcode?: StringNullableFilter<"Book"> | string | null
    categoryId?: StringNullableFilter<"Book"> | string | null
    totalCopies?: IntFilter<"Book"> | number
    availableCopies?: IntFilter<"Book"> | number
    publisher?: StringNullableFilter<"Book"> | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    loans?: LoanListRelationFilter
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    barcode?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    totalCopies?: SortOrder
    availableCopies?: SortOrder
    publisher?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    loans?: LoanOrderByRelationAggregateInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    barcode?: string
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    title?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    categoryId?: StringNullableFilter<"Book"> | string | null
    totalCopies?: IntFilter<"Book"> | number
    availableCopies?: IntFilter<"Book"> | number
    publisher?: StringNullableFilter<"Book"> | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    loans?: LoanListRelationFilter
  }, "id" | "barcode">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    barcode?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    totalCopies?: SortOrder
    availableCopies?: SortOrder
    publisher?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Book"> | string
    title?: StringWithAggregatesFilter<"Book"> | string
    author?: StringWithAggregatesFilter<"Book"> | string
    barcode?: StringNullableWithAggregatesFilter<"Book"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Book"> | string | null
    totalCopies?: IntWithAggregatesFilter<"Book"> | number
    availableCopies?: IntWithAggregatesFilter<"Book"> | number
    publisher?: StringNullableWithAggregatesFilter<"Book"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    books?: BookListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    books?: BookOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    books?: BookListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type LoanWhereInput = {
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    id?: StringFilter<"Loan"> | string
    peopleId?: StringFilter<"Loan"> | string
    bookId?: StringNullableFilter<"Loan"> | string | null
    loanDate?: DateTimeFilter<"Loan"> | Date | string
    dueDate?: DateTimeFilter<"Loan"> | Date | string
    returnDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    book?: XOR<BookNullableScalarRelationFilter, BookWhereInput> | null
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }

  export type LoanOrderByWithRelationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    bookId?: SortOrderInput | SortOrder
    loanDate?: SortOrder
    dueDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    status?: SortOrder
    book?: BookOrderByWithRelationInput
    people?: PeopleOrderByWithRelationInput
  }

  export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    peopleId?: StringFilter<"Loan"> | string
    bookId?: StringNullableFilter<"Loan"> | string | null
    loanDate?: DateTimeFilter<"Loan"> | Date | string
    dueDate?: DateTimeFilter<"Loan"> | Date | string
    returnDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    book?: XOR<BookNullableScalarRelationFilter, BookWhereInput> | null
    people?: XOR<PeopleScalarRelationFilter, PeopleWhereInput>
  }, "id">

  export type LoanOrderByWithAggregationInput = {
    id?: SortOrder
    peopleId?: SortOrder
    bookId?: SortOrderInput | SortOrder
    loanDate?: SortOrder
    dueDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: LoanCountOrderByAggregateInput
    _max?: LoanMaxOrderByAggregateInput
    _min?: LoanMinOrderByAggregateInput
  }

  export type LoanScalarWhereWithAggregatesInput = {
    AND?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    OR?: LoanScalarWhereWithAggregatesInput[]
    NOT?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Loan"> | string
    peopleId?: StringWithAggregatesFilter<"Loan"> | string
    bookId?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    loanDate?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    dueDate?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    returnDate?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    status?: EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus
  }

  export type AttendanceCreateInput = {
    id?: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
    people: PeopleCreateNestedOneWithoutAttendancesInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: string
    peopleId: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
  }

  export type AttendanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    people?: PeopleUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttendanceCreateManyInput = {
    id?: string
    peopleId: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
  }

  export type AttendanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WeeklyObservationCreateInput = {
    id?: string
    weekStart: Date | string
    observation: string
    people: PeopleCreateNestedOneWithoutWeeklyObservationsInput
  }

  export type WeeklyObservationUncheckedCreateInput = {
    id?: string
    peopleId: string
    weekStart: Date | string
    observation: string
  }

  export type WeeklyObservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
    people?: PeopleUpdateOneRequiredWithoutWeeklyObservationsNestedInput
  }

  export type WeeklyObservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type WeeklyObservationCreateManyInput = {
    id?: string
    peopleId: string
    weekStart: Date | string
    observation: string
  }

  export type WeeklyObservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type WeeklyObservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    pass: string
    urlImage?: string | null
    createdAt?: Date | string
    isAdm?: $Enums.IsUserAdm
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    pass: string
    urlImage?: string | null
    createdAt?: Date | string
    isAdm?: $Enums.IsUserAdm
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    urlImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdm?: EnumIsUserAdmFieldUpdateOperationsInput | $Enums.IsUserAdm
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    urlImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdm?: EnumIsUserAdmFieldUpdateOperationsInput | $Enums.IsUserAdm
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    pass: string
    urlImage?: string | null
    createdAt?: Date | string
    isAdm?: $Enums.IsUserAdm
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    urlImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdm?: EnumIsUserAdmFieldUpdateOperationsInput | $Enums.IsUserAdm
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    urlImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdm?: EnumIsUserAdmFieldUpdateOperationsInput | $Enums.IsUserAdm
  }

  export type PeopleCreateInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutPeopleInput
    attendances?: AttendanceCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationCreateNestedManyWithoutPeopleInput
  }

  export type PeopleUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutPeopleInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationUncheckedCreateNestedManyWithoutPeopleInput
  }

  export type PeopleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutPeopleNestedInput
    attendances?: AttendanceUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutPeopleNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUncheckedUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PeopleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeopleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookCreateInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutBooksInput
    loans?: LoanCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    categoryId?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutBooksNestedInput
    loans?: LoanUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookCreateManyInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    categoryId?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateInput = {
    id?: string
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
    book?: BookCreateNestedOneWithoutLoansInput
    people: PeopleCreateNestedOneWithoutLoansInput
  }

  export type LoanUncheckedCreateInput = {
    id?: string
    peopleId: string
    bookId?: string | null
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type LoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    book?: BookUpdateOneWithoutLoansNestedInput
    people?: PeopleUpdateOneRequiredWithoutLoansNestedInput
  }

  export type LoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    bookId?: NullableStringFieldUpdateOperationsInput | string | null
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type LoanCreateManyInput = {
    id?: string
    peopleId: string
    bookId?: string | null
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type LoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type LoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    bookId?: NullableStringFieldUpdateOperationsInput | string | null
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PeopleScalarRelationFilter = {
    is?: PeopleWhereInput
    isNot?: PeopleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    entryAt?: SortOrder
    observation?: SortOrder
    exitAt?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    entryAt?: SortOrder
    observation?: SortOrder
    exitAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    entryAt?: SortOrder
    observation?: SortOrder
    exitAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WeeklyObservationCountOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    weekStart?: SortOrder
    observation?: SortOrder
  }

  export type WeeklyObservationMaxOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    weekStart?: SortOrder
    observation?: SortOrder
  }

  export type WeeklyObservationMinOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    weekStart?: SortOrder
    observation?: SortOrder
  }

  export type EnumIsUserAdmFilter<$PrismaModel = never> = {
    equals?: $Enums.IsUserAdm | EnumIsUserAdmFieldRefInput<$PrismaModel>
    in?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    not?: NestedEnumIsUserAdmFilter<$PrismaModel> | $Enums.IsUserAdm
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    pass?: SortOrder
    urlImage?: SortOrder
    createdAt?: SortOrder
    isAdm?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    pass?: SortOrder
    urlImage?: SortOrder
    createdAt?: SortOrder
    isAdm?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    pass?: SortOrder
    urlImage?: SortOrder
    createdAt?: SortOrder
    isAdm?: SortOrder
  }

  export type EnumIsUserAdmWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IsUserAdm | EnumIsUserAdmFieldRefInput<$PrismaModel>
    in?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    not?: NestedEnumIsUserAdmWithAggregatesFilter<$PrismaModel> | $Enums.IsUserAdm
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIsUserAdmFilter<$PrismaModel>
    _max?: NestedEnumIsUserAdmFilter<$PrismaModel>
  }

  export type EnumpeopleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.peopleStatus | EnumpeopleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpeopleStatusFilter<$PrismaModel> | $Enums.peopleStatus
  }

  export type LoanListRelationFilter = {
    every?: LoanWhereInput
    some?: LoanWhereInput
    none?: LoanWhereInput
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type WeeklyObservationListRelationFilter = {
    every?: WeeklyObservationWhereInput
    some?: WeeklyObservationWhereInput
    none?: WeeklyObservationWhereInput
  }

  export type LoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyObservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PeopleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    course?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PeopleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    course?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PeopleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    course?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumpeopleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.peopleStatus | EnumpeopleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpeopleStatusWithAggregatesFilter<$PrismaModel> | $Enums.peopleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpeopleStatusFilter<$PrismaModel>
    _max?: NestedEnumpeopleStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    barcode?: SortOrder
    categoryId?: SortOrder
    totalCopies?: SortOrder
    availableCopies?: SortOrder
    publisher?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    totalCopies?: SortOrder
    availableCopies?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    barcode?: SortOrder
    categoryId?: SortOrder
    totalCopies?: SortOrder
    availableCopies?: SortOrder
    publisher?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    barcode?: SortOrder
    categoryId?: SortOrder
    totalCopies?: SortOrder
    availableCopies?: SortOrder
    publisher?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    totalCopies?: SortOrder
    availableCopies?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BookListRelationFilter = {
    every?: BookWhereInput
    some?: BookWhereInput
    none?: BookWhereInput
  }

  export type BookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type BookNullableScalarRelationFilter = {
    is?: BookWhereInput | null
    isNot?: BookWhereInput | null
  }

  export type LoanCountOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    bookId?: SortOrder
    loanDate?: SortOrder
    dueDate?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
  }

  export type LoanMaxOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    bookId?: SortOrder
    loanDate?: SortOrder
    dueDate?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
  }

  export type LoanMinOrderByAggregateInput = {
    id?: SortOrder
    peopleId?: SortOrder
    bookId?: SortOrder
    loanDate?: SortOrder
    dueDate?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type PeopleCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<PeopleCreateWithoutAttendancesInput, PeopleUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutAttendancesInput
    connect?: PeopleWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PeopleUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<PeopleCreateWithoutAttendancesInput, PeopleUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutAttendancesInput
    upsert?: PeopleUpsertWithoutAttendancesInput
    connect?: PeopleWhereUniqueInput
    update?: XOR<XOR<PeopleUpdateToOneWithWhereWithoutAttendancesInput, PeopleUpdateWithoutAttendancesInput>, PeopleUncheckedUpdateWithoutAttendancesInput>
  }

  export type PeopleCreateNestedOneWithoutWeeklyObservationsInput = {
    create?: XOR<PeopleCreateWithoutWeeklyObservationsInput, PeopleUncheckedCreateWithoutWeeklyObservationsInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutWeeklyObservationsInput
    connect?: PeopleWhereUniqueInput
  }

  export type PeopleUpdateOneRequiredWithoutWeeklyObservationsNestedInput = {
    create?: XOR<PeopleCreateWithoutWeeklyObservationsInput, PeopleUncheckedCreateWithoutWeeklyObservationsInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutWeeklyObservationsInput
    upsert?: PeopleUpsertWithoutWeeklyObservationsInput
    connect?: PeopleWhereUniqueInput
    update?: XOR<XOR<PeopleUpdateToOneWithWhereWithoutWeeklyObservationsInput, PeopleUpdateWithoutWeeklyObservationsInput>, PeopleUncheckedUpdateWithoutWeeklyObservationsInput>
  }

  export type EnumIsUserAdmFieldUpdateOperationsInput = {
    set?: $Enums.IsUserAdm
  }

  export type LoanCreateNestedManyWithoutPeopleInput = {
    create?: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput> | LoanCreateWithoutPeopleInput[] | LoanUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutPeopleInput | LoanCreateOrConnectWithoutPeopleInput[]
    createMany?: LoanCreateManyPeopleInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type AttendanceCreateNestedManyWithoutPeopleInput = {
    create?: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput> | AttendanceCreateWithoutPeopleInput[] | AttendanceUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutPeopleInput | AttendanceCreateOrConnectWithoutPeopleInput[]
    createMany?: AttendanceCreateManyPeopleInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type WeeklyObservationCreateNestedManyWithoutPeopleInput = {
    create?: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput> | WeeklyObservationCreateWithoutPeopleInput[] | WeeklyObservationUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: WeeklyObservationCreateOrConnectWithoutPeopleInput | WeeklyObservationCreateOrConnectWithoutPeopleInput[]
    createMany?: WeeklyObservationCreateManyPeopleInputEnvelope
    connect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutPeopleInput = {
    create?: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput> | LoanCreateWithoutPeopleInput[] | LoanUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutPeopleInput | LoanCreateOrConnectWithoutPeopleInput[]
    createMany?: LoanCreateManyPeopleInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutPeopleInput = {
    create?: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput> | AttendanceCreateWithoutPeopleInput[] | AttendanceUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutPeopleInput | AttendanceCreateOrConnectWithoutPeopleInput[]
    createMany?: AttendanceCreateManyPeopleInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type WeeklyObservationUncheckedCreateNestedManyWithoutPeopleInput = {
    create?: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput> | WeeklyObservationCreateWithoutPeopleInput[] | WeeklyObservationUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: WeeklyObservationCreateOrConnectWithoutPeopleInput | WeeklyObservationCreateOrConnectWithoutPeopleInput[]
    createMany?: WeeklyObservationCreateManyPeopleInputEnvelope
    connect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
  }

  export type EnumpeopleStatusFieldUpdateOperationsInput = {
    set?: $Enums.peopleStatus
  }

  export type LoanUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput> | LoanCreateWithoutPeopleInput[] | LoanUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutPeopleInput | LoanCreateOrConnectWithoutPeopleInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutPeopleInput | LoanUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: LoanCreateManyPeopleInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutPeopleInput | LoanUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutPeopleInput | LoanUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type AttendanceUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput> | AttendanceCreateWithoutPeopleInput[] | AttendanceUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutPeopleInput | AttendanceCreateOrConnectWithoutPeopleInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutPeopleInput | AttendanceUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: AttendanceCreateManyPeopleInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutPeopleInput | AttendanceUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutPeopleInput | AttendanceUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type WeeklyObservationUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput> | WeeklyObservationCreateWithoutPeopleInput[] | WeeklyObservationUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: WeeklyObservationCreateOrConnectWithoutPeopleInput | WeeklyObservationCreateOrConnectWithoutPeopleInput[]
    upsert?: WeeklyObservationUpsertWithWhereUniqueWithoutPeopleInput | WeeklyObservationUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: WeeklyObservationCreateManyPeopleInputEnvelope
    set?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    disconnect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    delete?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    connect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    update?: WeeklyObservationUpdateWithWhereUniqueWithoutPeopleInput | WeeklyObservationUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: WeeklyObservationUpdateManyWithWhereWithoutPeopleInput | WeeklyObservationUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: WeeklyObservationScalarWhereInput | WeeklyObservationScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput> | LoanCreateWithoutPeopleInput[] | LoanUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutPeopleInput | LoanCreateOrConnectWithoutPeopleInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutPeopleInput | LoanUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: LoanCreateManyPeopleInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutPeopleInput | LoanUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutPeopleInput | LoanUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput> | AttendanceCreateWithoutPeopleInput[] | AttendanceUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutPeopleInput | AttendanceCreateOrConnectWithoutPeopleInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutPeopleInput | AttendanceUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: AttendanceCreateManyPeopleInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutPeopleInput | AttendanceUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutPeopleInput | AttendanceUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type WeeklyObservationUncheckedUpdateManyWithoutPeopleNestedInput = {
    create?: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput> | WeeklyObservationCreateWithoutPeopleInput[] | WeeklyObservationUncheckedCreateWithoutPeopleInput[]
    connectOrCreate?: WeeklyObservationCreateOrConnectWithoutPeopleInput | WeeklyObservationCreateOrConnectWithoutPeopleInput[]
    upsert?: WeeklyObservationUpsertWithWhereUniqueWithoutPeopleInput | WeeklyObservationUpsertWithWhereUniqueWithoutPeopleInput[]
    createMany?: WeeklyObservationCreateManyPeopleInputEnvelope
    set?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    disconnect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    delete?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    connect?: WeeklyObservationWhereUniqueInput | WeeklyObservationWhereUniqueInput[]
    update?: WeeklyObservationUpdateWithWhereUniqueWithoutPeopleInput | WeeklyObservationUpdateWithWhereUniqueWithoutPeopleInput[]
    updateMany?: WeeklyObservationUpdateManyWithWhereWithoutPeopleInput | WeeklyObservationUpdateManyWithWhereWithoutPeopleInput[]
    deleteMany?: WeeklyObservationScalarWhereInput | WeeklyObservationScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutBooksInput = {
    create?: XOR<CategoryCreateWithoutBooksInput, CategoryUncheckedCreateWithoutBooksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBooksInput
    connect?: CategoryWhereUniqueInput
  }

  export type LoanCreateNestedManyWithoutBookInput = {
    create?: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput> | LoanCreateWithoutBookInput[] | LoanUncheckedCreateWithoutBookInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutBookInput | LoanCreateOrConnectWithoutBookInput[]
    createMany?: LoanCreateManyBookInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput> | LoanCreateWithoutBookInput[] | LoanUncheckedCreateWithoutBookInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutBookInput | LoanCreateOrConnectWithoutBookInput[]
    createMany?: LoanCreateManyBookInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneWithoutBooksNestedInput = {
    create?: XOR<CategoryCreateWithoutBooksInput, CategoryUncheckedCreateWithoutBooksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBooksInput
    upsert?: CategoryUpsertWithoutBooksInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutBooksInput, CategoryUpdateWithoutBooksInput>, CategoryUncheckedUpdateWithoutBooksInput>
  }

  export type LoanUpdateManyWithoutBookNestedInput = {
    create?: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput> | LoanCreateWithoutBookInput[] | LoanUncheckedCreateWithoutBookInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutBookInput | LoanCreateOrConnectWithoutBookInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutBookInput | LoanUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: LoanCreateManyBookInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutBookInput | LoanUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutBookInput | LoanUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput> | LoanCreateWithoutBookInput[] | LoanUncheckedCreateWithoutBookInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutBookInput | LoanCreateOrConnectWithoutBookInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutBookInput | LoanUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: LoanCreateManyBookInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutBookInput | LoanUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutBookInput | LoanUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type BookCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput> | BookCreateWithoutCategoryInput[] | BookUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BookCreateOrConnectWithoutCategoryInput | BookCreateOrConnectWithoutCategoryInput[]
    createMany?: BookCreateManyCategoryInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput> | BookCreateWithoutCategoryInput[] | BookUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BookCreateOrConnectWithoutCategoryInput | BookCreateOrConnectWithoutCategoryInput[]
    createMany?: BookCreateManyCategoryInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput> | BookCreateWithoutCategoryInput[] | BookUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BookCreateOrConnectWithoutCategoryInput | BookCreateOrConnectWithoutCategoryInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutCategoryInput | BookUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BookCreateManyCategoryInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutCategoryInput | BookUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BookUpdateManyWithWhereWithoutCategoryInput | BookUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput> | BookCreateWithoutCategoryInput[] | BookUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BookCreateOrConnectWithoutCategoryInput | BookCreateOrConnectWithoutCategoryInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutCategoryInput | BookUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BookCreateManyCategoryInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutCategoryInput | BookUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BookUpdateManyWithWhereWithoutCategoryInput | BookUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookCreateNestedOneWithoutLoansInput = {
    create?: XOR<BookCreateWithoutLoansInput, BookUncheckedCreateWithoutLoansInput>
    connectOrCreate?: BookCreateOrConnectWithoutLoansInput
    connect?: BookWhereUniqueInput
  }

  export type PeopleCreateNestedOneWithoutLoansInput = {
    create?: XOR<PeopleCreateWithoutLoansInput, PeopleUncheckedCreateWithoutLoansInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutLoansInput
    connect?: PeopleWhereUniqueInput
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type BookUpdateOneWithoutLoansNestedInput = {
    create?: XOR<BookCreateWithoutLoansInput, BookUncheckedCreateWithoutLoansInput>
    connectOrCreate?: BookCreateOrConnectWithoutLoansInput
    upsert?: BookUpsertWithoutLoansInput
    disconnect?: BookWhereInput | boolean
    delete?: BookWhereInput | boolean
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutLoansInput, BookUpdateWithoutLoansInput>, BookUncheckedUpdateWithoutLoansInput>
  }

  export type PeopleUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<PeopleCreateWithoutLoansInput, PeopleUncheckedCreateWithoutLoansInput>
    connectOrCreate?: PeopleCreateOrConnectWithoutLoansInput
    upsert?: PeopleUpsertWithoutLoansInput
    connect?: PeopleWhereUniqueInput
    update?: XOR<XOR<PeopleUpdateToOneWithWhereWithoutLoansInput, PeopleUpdateWithoutLoansInput>, PeopleUncheckedUpdateWithoutLoansInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumIsUserAdmFilter<$PrismaModel = never> = {
    equals?: $Enums.IsUserAdm | EnumIsUserAdmFieldRefInput<$PrismaModel>
    in?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    not?: NestedEnumIsUserAdmFilter<$PrismaModel> | $Enums.IsUserAdm
  }

  export type NestedEnumIsUserAdmWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IsUserAdm | EnumIsUserAdmFieldRefInput<$PrismaModel>
    in?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsUserAdm[] | ListEnumIsUserAdmFieldRefInput<$PrismaModel>
    not?: NestedEnumIsUserAdmWithAggregatesFilter<$PrismaModel> | $Enums.IsUserAdm
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIsUserAdmFilter<$PrismaModel>
    _max?: NestedEnumIsUserAdmFilter<$PrismaModel>
  }

  export type NestedEnumpeopleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.peopleStatus | EnumpeopleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpeopleStatusFilter<$PrismaModel> | $Enums.peopleStatus
  }

  export type NestedEnumpeopleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.peopleStatus | EnumpeopleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.peopleStatus[] | ListEnumpeopleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumpeopleStatusWithAggregatesFilter<$PrismaModel> | $Enums.peopleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpeopleStatusFilter<$PrismaModel>
    _max?: NestedEnumpeopleStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type PeopleCreateWithoutAttendancesInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationCreateNestedManyWithoutPeopleInput
  }

  export type PeopleUncheckedCreateWithoutAttendancesInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationUncheckedCreateNestedManyWithoutPeopleInput
  }

  export type PeopleCreateOrConnectWithoutAttendancesInput = {
    where: PeopleWhereUniqueInput
    create: XOR<PeopleCreateWithoutAttendancesInput, PeopleUncheckedCreateWithoutAttendancesInput>
  }

  export type PeopleUpsertWithoutAttendancesInput = {
    update: XOR<PeopleUpdateWithoutAttendancesInput, PeopleUncheckedUpdateWithoutAttendancesInput>
    create: XOR<PeopleCreateWithoutAttendancesInput, PeopleUncheckedCreateWithoutAttendancesInput>
    where?: PeopleWhereInput
  }

  export type PeopleUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: PeopleWhereInput
    data: XOR<PeopleUpdateWithoutAttendancesInput, PeopleUncheckedUpdateWithoutAttendancesInput>
  }

  export type PeopleUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleUncheckedUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUncheckedUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleCreateWithoutWeeklyObservationsInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutPeopleInput
    attendances?: AttendanceCreateNestedManyWithoutPeopleInput
  }

  export type PeopleUncheckedCreateWithoutWeeklyObservationsInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutPeopleInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutPeopleInput
  }

  export type PeopleCreateOrConnectWithoutWeeklyObservationsInput = {
    where: PeopleWhereUniqueInput
    create: XOR<PeopleCreateWithoutWeeklyObservationsInput, PeopleUncheckedCreateWithoutWeeklyObservationsInput>
  }

  export type PeopleUpsertWithoutWeeklyObservationsInput = {
    update: XOR<PeopleUpdateWithoutWeeklyObservationsInput, PeopleUncheckedUpdateWithoutWeeklyObservationsInput>
    create: XOR<PeopleCreateWithoutWeeklyObservationsInput, PeopleUncheckedCreateWithoutWeeklyObservationsInput>
    where?: PeopleWhereInput
  }

  export type PeopleUpdateToOneWithWhereWithoutWeeklyObservationsInput = {
    where?: PeopleWhereInput
    data: XOR<PeopleUpdateWithoutWeeklyObservationsInput, PeopleUncheckedUpdateWithoutWeeklyObservationsInput>
  }

  export type PeopleUpdateWithoutWeeklyObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutPeopleNestedInput
    attendances?: AttendanceUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleUncheckedUpdateWithoutWeeklyObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutPeopleNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutPeopleNestedInput
  }

  export type LoanCreateWithoutPeopleInput = {
    id?: string
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
    book?: BookCreateNestedOneWithoutLoansInput
  }

  export type LoanUncheckedCreateWithoutPeopleInput = {
    id?: string
    bookId?: string | null
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type LoanCreateOrConnectWithoutPeopleInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput>
  }

  export type LoanCreateManyPeopleInputEnvelope = {
    data: LoanCreateManyPeopleInput | LoanCreateManyPeopleInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceCreateWithoutPeopleInput = {
    id?: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
  }

  export type AttendanceUncheckedCreateWithoutPeopleInput = {
    id?: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
  }

  export type AttendanceCreateOrConnectWithoutPeopleInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput>
  }

  export type AttendanceCreateManyPeopleInputEnvelope = {
    data: AttendanceCreateManyPeopleInput | AttendanceCreateManyPeopleInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyObservationCreateWithoutPeopleInput = {
    id?: string
    weekStart: Date | string
    observation: string
  }

  export type WeeklyObservationUncheckedCreateWithoutPeopleInput = {
    id?: string
    weekStart: Date | string
    observation: string
  }

  export type WeeklyObservationCreateOrConnectWithoutPeopleInput = {
    where: WeeklyObservationWhereUniqueInput
    create: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput>
  }

  export type WeeklyObservationCreateManyPeopleInputEnvelope = {
    data: WeeklyObservationCreateManyPeopleInput | WeeklyObservationCreateManyPeopleInput[]
    skipDuplicates?: boolean
  }

  export type LoanUpsertWithWhereUniqueWithoutPeopleInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutPeopleInput, LoanUncheckedUpdateWithoutPeopleInput>
    create: XOR<LoanCreateWithoutPeopleInput, LoanUncheckedCreateWithoutPeopleInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutPeopleInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutPeopleInput, LoanUncheckedUpdateWithoutPeopleInput>
  }

  export type LoanUpdateManyWithWhereWithoutPeopleInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutPeopleInput>
  }

  export type LoanScalarWhereInput = {
    AND?: LoanScalarWhereInput | LoanScalarWhereInput[]
    OR?: LoanScalarWhereInput[]
    NOT?: LoanScalarWhereInput | LoanScalarWhereInput[]
    id?: StringFilter<"Loan"> | string
    peopleId?: StringFilter<"Loan"> | string
    bookId?: StringNullableFilter<"Loan"> | string | null
    loanDate?: DateTimeFilter<"Loan"> | Date | string
    dueDate?: DateTimeFilter<"Loan"> | Date | string
    returnDate?: DateTimeNullableFilter<"Loan"> | Date | string | null
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
  }

  export type AttendanceUpsertWithWhereUniqueWithoutPeopleInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutPeopleInput, AttendanceUncheckedUpdateWithoutPeopleInput>
    create: XOR<AttendanceCreateWithoutPeopleInput, AttendanceUncheckedCreateWithoutPeopleInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutPeopleInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutPeopleInput, AttendanceUncheckedUpdateWithoutPeopleInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutPeopleInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutPeopleInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: StringFilter<"Attendance"> | string
    peopleId?: StringFilter<"Attendance"> | string
    entryAt?: DateTimeFilter<"Attendance"> | Date | string
    observation?: StringNullableFilter<"Attendance"> | string | null
    exitAt?: DateTimeNullableFilter<"Attendance"> | Date | string | null
  }

  export type WeeklyObservationUpsertWithWhereUniqueWithoutPeopleInput = {
    where: WeeklyObservationWhereUniqueInput
    update: XOR<WeeklyObservationUpdateWithoutPeopleInput, WeeklyObservationUncheckedUpdateWithoutPeopleInput>
    create: XOR<WeeklyObservationCreateWithoutPeopleInput, WeeklyObservationUncheckedCreateWithoutPeopleInput>
  }

  export type WeeklyObservationUpdateWithWhereUniqueWithoutPeopleInput = {
    where: WeeklyObservationWhereUniqueInput
    data: XOR<WeeklyObservationUpdateWithoutPeopleInput, WeeklyObservationUncheckedUpdateWithoutPeopleInput>
  }

  export type WeeklyObservationUpdateManyWithWhereWithoutPeopleInput = {
    where: WeeklyObservationScalarWhereInput
    data: XOR<WeeklyObservationUpdateManyMutationInput, WeeklyObservationUncheckedUpdateManyWithoutPeopleInput>
  }

  export type WeeklyObservationScalarWhereInput = {
    AND?: WeeklyObservationScalarWhereInput | WeeklyObservationScalarWhereInput[]
    OR?: WeeklyObservationScalarWhereInput[]
    NOT?: WeeklyObservationScalarWhereInput | WeeklyObservationScalarWhereInput[]
    id?: StringFilter<"WeeklyObservation"> | string
    peopleId?: StringFilter<"WeeklyObservation"> | string
    weekStart?: DateTimeFilter<"WeeklyObservation"> | Date | string
    observation?: StringFilter<"WeeklyObservation"> | string
  }

  export type CategoryCreateWithoutBooksInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutBooksInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutBooksInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutBooksInput, CategoryUncheckedCreateWithoutBooksInput>
  }

  export type LoanCreateWithoutBookInput = {
    id?: string
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
    people: PeopleCreateNestedOneWithoutLoansInput
  }

  export type LoanUncheckedCreateWithoutBookInput = {
    id?: string
    peopleId: string
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type LoanCreateOrConnectWithoutBookInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput>
  }

  export type LoanCreateManyBookInputEnvelope = {
    data: LoanCreateManyBookInput | LoanCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutBooksInput = {
    update: XOR<CategoryUpdateWithoutBooksInput, CategoryUncheckedUpdateWithoutBooksInput>
    create: XOR<CategoryCreateWithoutBooksInput, CategoryUncheckedCreateWithoutBooksInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutBooksInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutBooksInput, CategoryUncheckedUpdateWithoutBooksInput>
  }

  export type CategoryUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpsertWithWhereUniqueWithoutBookInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutBookInput, LoanUncheckedUpdateWithoutBookInput>
    create: XOR<LoanCreateWithoutBookInput, LoanUncheckedCreateWithoutBookInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutBookInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutBookInput, LoanUncheckedUpdateWithoutBookInput>
  }

  export type LoanUpdateManyWithWhereWithoutBookInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutBookInput>
  }

  export type BookCreateWithoutCategoryInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutCategoryInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput>
  }

  export type BookCreateManyCategoryInputEnvelope = {
    data: BookCreateManyCategoryInput | BookCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type BookUpsertWithWhereUniqueWithoutCategoryInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutCategoryInput, BookUncheckedUpdateWithoutCategoryInput>
    create: XOR<BookCreateWithoutCategoryInput, BookUncheckedCreateWithoutCategoryInput>
  }

  export type BookUpdateWithWhereUniqueWithoutCategoryInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutCategoryInput, BookUncheckedUpdateWithoutCategoryInput>
  }

  export type BookUpdateManyWithWhereWithoutCategoryInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutCategoryInput>
  }

  export type BookScalarWhereInput = {
    AND?: BookScalarWhereInput | BookScalarWhereInput[]
    OR?: BookScalarWhereInput[]
    NOT?: BookScalarWhereInput | BookScalarWhereInput[]
    id?: StringFilter<"Book"> | string
    title?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    barcode?: StringNullableFilter<"Book"> | string | null
    categoryId?: StringNullableFilter<"Book"> | string | null
    totalCopies?: IntFilter<"Book"> | number
    availableCopies?: IntFilter<"Book"> | number
    publisher?: StringNullableFilter<"Book"> | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
  }

  export type BookCreateWithoutLoansInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutBooksInput
  }

  export type BookUncheckedCreateWithoutLoansInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    categoryId?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookCreateOrConnectWithoutLoansInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutLoansInput, BookUncheckedCreateWithoutLoansInput>
  }

  export type PeopleCreateWithoutLoansInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendances?: AttendanceCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationCreateNestedManyWithoutPeopleInput
  }

  export type PeopleUncheckedCreateWithoutLoansInput = {
    id?: string
    name: string
    email?: string | null
    status: $Enums.peopleStatus
    course: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendances?: AttendanceUncheckedCreateNestedManyWithoutPeopleInput
    weeklyObservations?: WeeklyObservationUncheckedCreateNestedManyWithoutPeopleInput
  }

  export type PeopleCreateOrConnectWithoutLoansInput = {
    where: PeopleWhereUniqueInput
    create: XOR<PeopleCreateWithoutLoansInput, PeopleUncheckedCreateWithoutLoansInput>
  }

  export type BookUpsertWithoutLoansInput = {
    update: XOR<BookUpdateWithoutLoansInput, BookUncheckedUpdateWithoutLoansInput>
    create: XOR<BookCreateWithoutLoansInput, BookUncheckedCreateWithoutLoansInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutLoansInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutLoansInput, BookUncheckedUpdateWithoutLoansInput>
  }

  export type BookUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutBooksNestedInput
  }

  export type BookUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeopleUpsertWithoutLoansInput = {
    update: XOR<PeopleUpdateWithoutLoansInput, PeopleUncheckedUpdateWithoutLoansInput>
    create: XOR<PeopleCreateWithoutLoansInput, PeopleUncheckedCreateWithoutLoansInput>
    where?: PeopleWhereInput
  }

  export type PeopleUpdateToOneWithWhereWithoutLoansInput = {
    where?: PeopleWhereInput
    data: XOR<PeopleUpdateWithoutLoansInput, PeopleUncheckedUpdateWithoutLoansInput>
  }

  export type PeopleUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: AttendanceUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUpdateManyWithoutPeopleNestedInput
  }

  export type PeopleUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumpeopleStatusFieldUpdateOperationsInput | $Enums.peopleStatus
    course?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: AttendanceUncheckedUpdateManyWithoutPeopleNestedInput
    weeklyObservations?: WeeklyObservationUncheckedUpdateManyWithoutPeopleNestedInput
  }

  export type LoanCreateManyPeopleInput = {
    id?: string
    bookId?: string | null
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type AttendanceCreateManyPeopleInput = {
    id?: string
    entryAt?: Date | string
    observation?: string | null
    exitAt?: Date | string | null
  }

  export type WeeklyObservationCreateManyPeopleInput = {
    id?: string
    weekStart: Date | string
    observation: string
  }

  export type LoanUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    book?: BookUpdateOneWithoutLoansNestedInput
  }

  export type LoanUncheckedUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookId?: NullableStringFieldUpdateOperationsInput | string | null
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type LoanUncheckedUpdateManyWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookId?: NullableStringFieldUpdateOperationsInput | string | null
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type AttendanceUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttendanceUncheckedUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttendanceUncheckedUpdateManyWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryAt?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    exitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WeeklyObservationUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type WeeklyObservationUncheckedUpdateWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type WeeklyObservationUncheckedUpdateManyWithoutPeopleInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekStart?: DateTimeFieldUpdateOperationsInput | Date | string
    observation?: StringFieldUpdateOperationsInput | string
  }

  export type LoanCreateManyBookInput = {
    id?: string
    peopleId: string
    loanDate?: Date | string
    dueDate: Date | string
    returnDate?: Date | string | null
    status?: $Enums.LoanStatus
  }

  export type LoanUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    people?: PeopleUpdateOneRequiredWithoutLoansNestedInput
  }

  export type LoanUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type LoanUncheckedUpdateManyWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    peopleId?: StringFieldUpdateOperationsInput | string
    loanDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
  }

  export type BookCreateManyCategoryInput = {
    id?: string
    title: string
    author: string
    barcode?: string | null
    totalCopies?: number
    availableCopies?: number
    publisher?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    totalCopies?: IntFieldUpdateOperationsInput | number
    availableCopies?: IntFieldUpdateOperationsInput | number
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}