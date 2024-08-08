import db from './db.js'; // 假设你的数据库连接在这里

export const addUserToDatabase = (username: string, password: string) => {
  const hashedPassword = password; // 在生产环境中使用实际的密码哈希
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  return new Promise((resolve, reject) => {
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const getAllUsers = () => {
  const sql = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
