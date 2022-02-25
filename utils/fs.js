import fs from 'fs';

export function creteFile(url) {
  return new Promise((resolve, reject) => {
    fs.open(url, 'w', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, data) => {
      if (err) return reject(err);
      if (!data.toString()) return resolve();
      return resolve(JSON.parse(data));
    });
  });
}

export function writeFile(url, users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(url, JSON.stringify(users), (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export function isExists(url) {
  return fs.existsSync(url);
}
