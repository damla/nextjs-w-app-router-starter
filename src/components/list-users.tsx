import { User } from '@prisma/client';
import Image from 'next/image';

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ListUsers() {
  const users: User[] = await getUsers();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 20
      }}
    >
      {users.map(user => (
        <div
          key={user.id}
          style={{ border: '1px solid #ccc', textAlign: 'center' }}
        >
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={180}
            height={180}
            priority
          />
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}
