'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Dashboard() {
  const [newName, setNewName] = useState('');
  const { data: session, status, update } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dashboard</p>
      <p>Hi {session?.user?.name}</p>
      <p>Address: {session?.user?.address}</p>
      <label>Update Name</label>
      <input
        type="text"
        placeholder="Enter new name"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <button
        onClick={() => update({ name: newName })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
