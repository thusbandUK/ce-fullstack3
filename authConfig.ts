//this wasn't part of the previous set up

import {NextAuthConfig} from "next-auth";
import PostgresAdapter from "@auth/pg-adapter"
import pool from "./databaseConfig";
/*import { Pool } from "@neondatabase/serverless"*/


export default {
    providers: [],
    session: { strategy: "database" },
    // other options...
} satisfies NextAuthConfig