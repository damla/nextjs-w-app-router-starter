import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/auth-options';

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col min-h-screen items-start p-24">
      {session?.user?.name}
    </main>
  );
}
