// import { readFile } from 'fs/promises';
// async function loadJSON(filename) {
//   const content = await readFile(filename, 'utf8');
//   return JSON.parse(content);
// }
// const users = await loadJSON(new URL('./users.json', import.meta.url));
// const reviews = await loadJSON(new URL('./reviews.json', import.meta.url));
import reviews from "./reviews.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
export default {
  users,
  reviews,
};
