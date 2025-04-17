import db from '../config/db.js';

export const createUser = async (user) => {
  const {
    firstName, lastName, email, password, address, bio, occupation, expertise
  } = user;

  const result = await db.query(`
    INSERT INTO users 
      (first_name, last_name, email, password, address, bio, occupation, expertise)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `, [firstName, lastName, email, password, address, bio, occupation, expertise]);

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

export const promoteToMentor = async (id) => {
  const result = await db.query(`UPDATE users SET role = 'mentor' WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
};

export const findAllMentors = async () => {
  const result = await db.query(`SELECT * FROM users WHERE role = 'mentor'`);
  return result.rows;
}

export const findMentorById = async (id) => {
  const result = await db.query(`SELECT * FROM users WHERE id = $1 AND role = 'mentor'`, [id]);
  return result.rows[0];
};


