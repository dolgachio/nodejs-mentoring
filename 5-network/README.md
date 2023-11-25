# 5: Network

## Scripts

- `npm run serve`: builds `JS` files from `TS` files, starts server from the existing `./dist` folder files
- `npm run serve:watch`: starts server in a watch mode
- `npm run build`: compiles `JS` files from `TS` files 

## TODO

1. ✅ Create/delete user.
2. ✅ Partially update user properties.
3. ✅ Retrieve user by id, list of users. Returns only user data, no hobbies are returned.
4. Add/delete hobby for a specific user.
5. Get a list of user hobbies.

### Acceptance criteria:

1. No frameworks are used. Server is created using http module.
2. API is designed based on REST API principles. Constraints are not violated.
3. The functionality mentioned above is implemented. Proper status codes are used for responses (not only `200`, but also e.g `201`, `404`). Input validation and authentication can be skipped.

**Note**: Try to think of modular structure for the task. Please do not have all the implementation in one file.

#### 1. Additional (optional tasks):

1. Caching headers are added (hint: hobbies do not change so often).
2. Hypermedia links (HATEOAS) are included (for each user to retrieve a list of hobbies).