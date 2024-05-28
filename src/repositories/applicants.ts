import { Pool, PoolClient, QueryResult } from "pg";

import { IApplicantsData } from "../models/applicants";

export const registerApplicant = (
  siswaId: number,
  courseIds: number[],
  pgConn: Pool | PoolClient
): Promise<QueryResult<IApplicantsData>> => {
  let query = `insert into applicants (siswa_id, course_id) values `;
  const values: number[] = [];
  for (const courseId of courseIds) {
    if (values.length) query += ",";
    query += `($${values.length + 1}, $${values.length + 2})`;
    values.push(siswaId, courseId);
  }
  query += " returning id, siswa_id, course_id";
  //   console.log(query, values);
  return pgConn.query(query, values);
};
