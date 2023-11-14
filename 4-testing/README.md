## Testing in Node.js

### Installation

Run script from this folder: `npm install`, it installs all dependencies.

### Scripts

- `npm test`: run all tests
- `npm run test:coverage`: run test coverage and put it to `/coverage` folder

## Notes

- `/coverage` folder with coverage result is added to the `.gitignore` 
- Integration tests: `./src/services/public-holidays.service.integration.spec.ts`
- e2e tests: `./src/nager-date-api.e2e.spec.ts`