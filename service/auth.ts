import knex from "../db/postgre";
import { sessionsTable } from "../constants"

export const getSessionByToken = async (token: string) => {
     if (!token) {
          throw new Error('No token is provided ')
     }
     const [session] = await knex(sessionsTable).select().where({ token });
     const result =
       session && new Date(session.expiresAt).getTime() > Date.now()
         ? session
         : null;

    if (!result && session) {
        //clean db
    }
     return result
}