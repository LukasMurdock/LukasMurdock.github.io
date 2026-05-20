---
layout: post
title: 'Advanced TypeScript Patterns'
description: 'Make the hard type machinery invisible and give users precise autocomplete, safe composition, and readable errors.'
date: 'May 20, 2026'
code: true
---

Read the TypeScript Handbook, especially
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

### 1. Concentrate type information in one “type-bearing” value

Don’t ask users to pass generics everywhere. Create one rich value whose type carries the whole graph.

Examples:

```ts
const appRouter = router({
  users: usersRouter,
  posts: postsRouter,
})

type AppRouter = typeof appRouter
```

Library pattern:

```ts
type ProcedureDef = {
  _def: {
    $types: {
      input: unknown
      output: unknown
      context: unknown
      meta: unknown
    }
  }
}
```

Then project from it:

```ts
type InferInput<T> =
  T extends { _def: { $types: { input: infer I } } }
    ? I
    : never

type InferOutput<T> =
  T extends { _def: { $types: { output: infer O } } }
    ? O
    : never
```

Put the type graph somewhere stable, private-ish, and machine-readable: `_def`, `$types`, `routeTree`, `schema`, `config`, etc.

---

### 2. Use fluent builders as type accumulators

Fluent APIs let users build complex typed objects without writing generics manually.

```ts
const getUser = procedure
  .input(userInputSchema)
  .middleware(authMiddleware)
  .query(({ input, ctx }) => {
    return ctx.db.user.find(input.id)
  })
```

Internally, each method returns a new builder with updated phantom types:

```ts
type ProcedureBuilder<TInput, TOutput, TContext> = {
  input<TNewInput>(
    schema: Schema<TNewInput>
  ): ProcedureBuilder<TNewInput, TOutput, TContext>

  use<TNewContext>(
    middleware: Middleware<TContext, TNewContext>
  ): ProcedureBuilder<TInput, TOutput, TNewContext>

  query<TNewOutput>(
    resolver: Resolver<TInput, TNewContext, TNewOutput>
  ): Procedure<TInput, TNewOutput, TNewContext>
}
```

Fluent builders are great to preserve inference while accumulating type state.

---

### 3. Prefer inference over explicit generics

For application developers, this is ideal:

```ts
const route = createRoute({
  path: '/users/$userId',
  validateSearch: userSearchSchema,
})
```

Instead of:

```ts
createRoute<
  '/users/$userId',
  { userId: string },
  UserSearch,
  UserContext
>(...)
```

Library APIs should infer from values:

```ts
function createRoute<const TPath extends string, TSearch>(
  options: {
    path: TPath
    validateSearch?: Schema<TSearch>
  }
): Route<TPath, TSearch> {
  // ...
}
```

Make runtime declarations the source of truth, then derive types from them.

---

### 4. Use `const` type parameters to preserve literals

For routing, events, command names, field names, and registries, literal preservation is critical.

```ts
function defineCommand<const TName extends string>(
  name: TName
): Command<TName> {
  // ...
}
```

Without `const`, values often widen:

```ts
'create-user' -> string
```

With `const`, they stay precise:

```ts
'create-user' -> 'create-user'
```

Use `const` type parameters for public APIs where literal strings matter.

---

### 5. Project types with conditional extractors

A common pattern is: accept a rich object, then extract one useful slice.

```ts
type InferRouteParams<TRoute> =
  TRoute extends Route<any, infer TParams, any>
    ? TParams
    : never

type InferRouteSearch<TRoute> =
  TRoute extends Route<any, any, infer TSearch>
    ? TSearch
    : never
```

This gives consumers small, useful helpers:

```ts
type UserParams = InferRouteParams<typeof userRoute>
type UserSearch = InferRouteSearch<typeof userRoute>
```

Expose `Infer*` helpers. They turn advanced internal types into ergonomic user-facing types.

---

### 6. Recursively map over user-defined trees

Routers, route trees, schema trees, command registries, and plugin maps often need recursive type projection.

```ts
type InferRouterOutputs<TRouter> = {
  [K in keyof TRouter]:
    TRouter[K] extends Procedure<any, infer TOutput>
      ? TOutput
      : TRouter[K] extends Record<string, any>
        ? InferRouterOutputs<TRouter[K]>
        : never
}
```

Input:

```ts
const router = {
  users: {
    list: procedure.query(() => [{ id: '1' }]),
  },
}
```

Output:

```ts
type Outputs = {
  users: {
    list: { id: string }[]
  }
}
```

Recursive mapped types let users organize code naturally while preserving deep inference.

---

### 7. Use module augmentation as a global type registry

Some libraries need the app’s root type to be “globally known.”

```ts
declare module '@acme/router' {
  interface Register {
    router: typeof router
  }
}
```

Then library APIs can default to the registered type:

```ts
type RegisteredRouter =
  Register extends { router: infer TRouter }
    ? TRouter
    : never
```

This enables APIs like:

```tsx
<Link to="/users/$userId" params={{ userId: '123' }} />
```

without needing:

```tsx
<Link<typeof router> ... />
```

Module augmentation is powerful for app-wide registries, especially routers, stores, themes, i18n keys, and plugin systems.

---

### 8. Validate user options by deriving the intended canonical type

A sophisticated pattern is to accept partial user options, infer intent, then constrain them against the canonical shape.

```ts
type InferTo<TOptions> =
  TOptions extends { to: infer TTo }
    ? TTo
    : undefined

type ValidateNavigateOptions<TOptions, TRouter> =
  TOptions extends NavigateOptions<TRouter, InferTo<TOptions>>
    ? TOptions
    : never
```

This lets users write natural code:

```ts
navigate({
  to: '/users/$userId',
  params: { userId: '123' },
})
```

while the library checks whether `params` matches `to`.

Infer from the user’s object first, then validate the object against the inferred target.

---

### 9. Design intentional error types

Advanced libraries can improve error messages by returning readable diagnostic types.

```ts
type CheckPath<TPath, TValidPaths> =
  TPath extends TValidPaths
    ? TPath
    : {
        error: 'Invalid route path'
        validPaths: TValidPaths
      }
```

Instead of a mysterious structural mismatch, users see:

```ts
{
  error: 'Invalid route path'
  validPaths: '/users' | '/posts' | '/settings'
}
```

Use friendly error payloads at key failure points. Type errors are part of your API.

---

### 10. Use `Constrain` helpers to balance inference and strictness

A useful pattern:

```ts
type Constrain<T, TConstraint, TDefault = TConstraint> =
  | (T extends TConstraint ? T : never)
  | TDefault
```

This lets the compiler keep inference flexible while still putting pressure on invalid inputs.

A simpler version:

```ts
type Ensure<T, TConstraint> =
  T extends TConstraint ? T : never
```

Constraints should guide inference, not destroy it too early.

---

### 11. Normalize complex unions before exposing them

Advanced TS libraries often create huge unions internally. Normalize them before exposing them.

```ts
type UnionToIntersection<T> =
  (T extends any ? (x: T) => void : never) extends
  (x: infer I) => void
    ? I
    : never
```

Useful for merging plugin-provided types:

```ts
type PluginContexts =
  | { auth: AuthContext }
  | { db: DbContext }

type AppContext = UnionToIntersection<PluginContexts>
```

Result:

```ts
type AppContext = {
  auth: AuthContext
  db: DbContext
}
```

Public types should be readable even if internal types are highly compositional.

---

### 12. Use distributive conditional types deliberately

This distributes over unions:

```ts
type NonEmptyObject<T> =
  T extends any
    ? {} extends T
      ? never
      : T
    : never
```

For:

```ts
type X = NonEmptyObject<{} | { id: string } | { name: string }>
```

You get:

```ts
type X = { id: string } | { name: string }
```

Distributive conditionals are powerful for filtering and transforming unions, but they can hurt performance if overused.

---

### 13. Encode runtime boundaries in the type system

For client/server libraries, the type system should model what can actually cross the boundary.

```ts
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

type ValidateJSON<T> =
  T extends (...args: any[]) => any
    ? 'Function is not serializable'
    : T extends JSONValue
      ? T
      : T extends object
        ? { [K in keyof T]: ValidateJSON<T[K]> }
        : T
```

This catches mistakes like returning a class instance, `Response`, function, database client, or request object from a server function.

Type safety is incomplete unless transport/runtime constraints are represented.

---

### 14. Beware server type vs client runtime mismatches

A value can be typed as this on the server:

```ts
type User = {
  createdAt: Date
}
```

But arrive like this on the client:

```ts
type SerializedUser = {
  createdAt: string
}
```

A library should be explicit about whether inference means:

```ts
InferServerOutput<T>
```

or:

```ts
InferClientOutput<T>
```

Better:

```ts
type InferWireOutput<T> = Serialize<InferServerOutput<T>>
```

Name your helpers according to the boundary they represent. `Output` is ambiguous in networked libraries.

---

### 15. Keep server-only types out of published client types

A common failure mode:

```ts
export type AppRouter = typeof appRouter
```

accidentally exposes:

```ts
DbClient
AuthService
InternalContext
SecretConfig
```

Better pattern:

```ts
type PublicRouterShape<TRouter> = {
  procedures: InferPublicProcedures<TRouter>
  transformer: InferTransformer<TRouter>
  errorShape: InferErrorShape<TRouter>
}
```

Create narrow “client-relevant” type surfaces instead of exporting the entire internal graph.

---

## Core Pattern

```ts
// 1. User creates a runtime value.
const thing = createThing(...)

// 2. The value secretly carries a rich type graph.
type Thing = typeof thing

// 3. The library exposes projections.
type Input = InferInput<Thing>
type Output = InferOutput<Thing>
type Context = InferContext<Thing>

// 4. Public APIs validate user objects against that graph.
useThing({
  // autocomplete + type errors come from the projected graph
})
```
