import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white fixed w-full shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-xl font-bold text-indigo-600">UserManagement</Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link to="/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Users
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-500 cursor-pointer hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="max-w-7xl mt-10 mx-auto sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
