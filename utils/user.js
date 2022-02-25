/* eslint-disable import/prefer-default-export */
function nameFilter(val) {
  if (val.length < 4) {
    throw new Error('length of name must by greater than 4');
  }
  if (val[0] < 'A' || val[0] > 'Z') {
    throw new Error('error  content first leter mast by have a capital leter');
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < val.length; i++) {
    if (!(val[i] >= 'a' && val[i] <= 'z')) {
      throw new Error('error` the content  must  have a  only leter');
    }
  }
  console.log('valid name ok');
}
export function validUserData(rfUsData, bodyData) {
  return new Promise((resolve) => {
    const fileUser = Object.values(rfUsData);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fileUser.length; i++) {
      if (fileUser[i].username === bodyData.username) {
        throw new Error('error this user already exists');
      }
      nameFilter(bodyData.fName);
      nameFilter(bodyData.lName);
    }
    const age = Number(bodyData.age);
    if (!(Number.isInteger(age)) && !(age > 0 && age <= 150)) {
      console.log('age must by number');
      return;
    } console.log('age is ok');
    resolve(bodyData);
  });
}
