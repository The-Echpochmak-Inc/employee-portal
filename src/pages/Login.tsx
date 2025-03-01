import { useState } from "react";

export default function Login() {
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("Invalid credentials. Contact your Echpochmak Compliance Officer.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-200 tracking-widest">
                    ECHPOCHMAK EMPLOYEE PORTAL
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Employee ID</label>
                        <input 
                            type="text"
                            className="mt-1 w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input 
                            type="password"
                            className="mt-1 w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm font-semibold text-center mt-2">
                            {error}
                        </p>
                    )}
                    <button 
                        type="submit" 
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                    Unauthorized access is strictly prohibited. Compliance is mandatory.
                </p>
            </div>
        </div>
    );
}
