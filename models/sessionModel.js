import db from '../config/db.js';

export const createSession = async (session) => {
  const {
    mentorId, menteeId, questions, status
  } = session;

    const result = await db.query(`
        INSERT INTO sessions 
        (mentor_id, mentee_id, questions, status)
        VALUES 
        ($1, $2, $3, $4)
        RETURNING *;
    `, [mentorId, menteeId, questions, status]);
    return result.rows[0];
};

export const findSessionById = async (id) => {
  const result = await db.query(`SELECT * FROM sessions WHERE id = $1`, [id]);
  return result.rows[0];
};

export const findAllMenteeSessions = async (id) => {
  const result = await db.query(`SELECT * FROM sessions WHERE mentee_id = $1`, [id]);
  if (result.rowCount === 0) {
    return [];
  }
  return result.rows;
};

export const findAllMentorSessions = async (id) => {
    const result = await db.query(`SELECT * FROM sessions WHERE mentor_id = $1`, [id]);
    if (result.rowCount === 0) {
      return [];
    }
    return result.rows;
  };

export const updateSession = async (id, updates) => {
  const { questions, status } = updates;

  const result = await db.query(`
    UPDATE sessions 
    SET questions = $1, status = $2
    WHERE id = $3
    RETURNING *;
  `, [questions, status, id]);

  return result.rows[0];
};

export const deleteSession = async (id) => {
  const result = await db.query(`DELETE FROM sessions WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
};

export const findSessionsByMentorId = async (mentorId) => {
  const result = await db.query(`SELECT * FROM sessions WHERE mentor_id = $1`, [mentorId]);
  return result.rows;
};

