import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState([]);

  const router = useRouter();

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(`http://103.164.54.252:8000/api/auth/login`, {
          username,
          password
        });
        localStorage.setItem('token', response.data.access);
        setToken(response.data)
        console.log('Response from server:', response.data);
  
        if (response.data.access) {
          const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
          });
  
          if (result.error) {
            setError('Login gagal, silakan periksa kembali username dan password Anda.');
          } else {
            router.push('/articles');
          }
        } else {
          setError('Login gagal, silakan periksa kembali username dan password Anda.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Terjadi kesalahan saat melakukan login.');
      }
  };


  return (
    <div className=" w-full h-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}