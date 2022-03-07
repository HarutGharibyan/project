import path from 'path';
import {
    creteFile, readFile, writeFile, isExists,

  
} from '../../utils/fs.js';


 const usersUrl = path.resolve('api/product/product.json');
export async function getAllService() {

  const users = await readFile(usersUrl);
  
  
  return users;
}
export async function getOneService(params) {
    const index = Number(params.index);
    const users = await readFile(usersUrl);
    const user = users[index];
   return user;
 }
 export async function createService(body) {
    if (!isExists(usersUrl)) {
      await creteFile('api/product/product.json');
    }
    let users = await readFile(usersUrl);
    if (!users) {
      users = [];
    }
    users.push(body);
    await writeFile(usersUrl, users);
    return body;
  }
  export async function removeService(params) {
  
    const index = Number(params.index);
    let users = await readFile(usersUrl)
       users.splice(index, 1);
       await writeFile(usersUrl,users)
       return users
       }
       export async function updateService(params,body) {
  
        const index = Number(params.index);
        const users = await readFile(usersUrl);
        for (const key of Object.keys(body)) {
          if (users[index].hasOwnProperty(key)) {
            users[index][key] = body[key];
          }
        }
        await writeFile(usersUrl, users);
     return body
   }