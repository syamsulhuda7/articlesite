import { useSession } from 'next-auth/react';

export default function Navbar() {

  const {data} = useSession();

  return (
    <nav className="bg-gray-800 text-white h-[10vh] flex px-8">
      <div className=" w-full mx-auto flex justify-start items-center">
            {data && <p className="mr-4">Welcome, {data.user.username == 'demo1' ? 'Owner' : data.user.username}!</p>}
      </div>
    </nav>
  );
}
