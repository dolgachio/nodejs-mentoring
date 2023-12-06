# 5: Network

## Scripts

- `npm run serve`: builds `JS` files from `TS` files, starts server from the existing `./dist` folder files
- `npm run serve:watch`: starts server in a watch mode
- `npm run build`: compiles `JS` files from `TS` files 

## 6. Express and Layered Architecture

### Acceptance criteria:

Note: TypeScript should be used.

1. API is implemented based on swagger.yaml. Proper HTTP status codes are returned in responses (not only 200 or 500).
2. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example xxx.repository.ts contains functions to retrieve data (data access layer), xxx.service.ts contains services that implement business logic, xxx.controller.ts contains functions that manage status codes/responses returned (presentation layer).
3. Data is stored either in memory or on file system.
4. joi is used to validate data in PUT /api/profile/cart.
5. Simple authentication middleware is added to check if user with such id exists. User id is passed in x-user-id header.
6. Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed.

### Additional (optional) tasks:

1. For DELETE /api/profile/cart soft-delete approach is be used. Make sure that client of your API will not know that soft-delete approach is used.


