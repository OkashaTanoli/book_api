import postgres from 'postgres';
const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export default sql
