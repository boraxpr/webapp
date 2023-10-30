import { sql } from "@vercel/postgres";

export default async function Cart({ params }) {
  const { rows } = await sql`SELECT * from USERS}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}