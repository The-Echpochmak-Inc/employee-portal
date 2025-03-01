import { useState } from "react";
import logo from "../assets/logo.jpg";
import {generateId} from "../idgen";

const SECRET_KEY = "echpochmak-secret-is-3";
const complianceMessages = [
    "INVALID CREDENTIALS. Your login attempt has been logged by the Bureau of Compliance & Internal Alignment.",
    "ACCESS DENIED: Your clearance level is insufficient. HR has been notified for sentiment review.",
    "Your credentials are under review by the Workforce Sentiment Monitoring Taskforce. A decision will be made shortly.",
    "Multi-Factor Compliance Verification Required. Please submit to a mandatory morale assessment with nearby Morale Officer.",
    "Unauthorized access attempt detected. IT has been instructed to disable your workstation.",
    "Login temporarily unavailable. The Predictive Employee Behavior Office is assessing your past decisions.",
    "You have exceeded your monthly login attempts. Please submit a Form-77-B to the Personnel Reallocation & Optimization Division."
];

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cookiesAccepted, setCookiesAccepted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        setTimeout(() => {
            setLoading(false);
            if (username === "admin" && password === "admin") {
                generateId(SECRET_KEY).then((id) => {
                    window.location.href = `mailto:compliance@echpochmak.tech?subject=[Employee Portal]${id}&body=Your login attempt triggered a non-compliance flag. A review is in progress. Please explain your actions:`;
                });
            } else {
                setError(complianceMessages[Math.floor(Math.random() * complianceMessages.length)]);
            }
        }, 2000);
    };

    const handleReport = (e: React.FormEvent) => {
        e.preventDefault();
        setError("The Inquisition Department is overloaded right now. Please come back later.")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative">
            {/* Security Overlay */}
            <div className="absolute top-2 right-2 text-gray-500 text-xs opacity-50 animate-pulse">
                [SECURITY FEED ONLINE]
            </div>

            <div className="w-full max-w-md p-8 bg-gray-900 shadow-lg rounded-lg border border-gray-800 relative">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Echpochmak Logo" className="h-32 w-32 rounded-full" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-300 tracking-widest">
                    ECHPOCHMAK EMPLOYEE PORTAL
                </h1>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Employee ID</label>
                        <input 
                            name="username"
                            type="text"
                            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Password</label>
                        <input 
                            name="password"
                            type="password"
                            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Login"}
                    </button>
                </form>

                {/* Report a Colleague Button */}
                <div className="mt-4 text-center">
                    <button className="text-xs text-gray-500 hover:text-red-500 transition" onClick={handleReport}>
                        🔍 Report Non-Compliant Employee
                    </button>
                </div>

                {/* Compliance Warning */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    Unauthorized access is strictly prohibited. Compliance is mandatory.
                </p>
            </div>

            {/* Mandatory Cookie Agreement */}
            {!cookiesAccepted && (
                <div className="fixed bottom-5 left-5 bg-gray-800 p-4 text-xs text-gray-400 border border-gray-700 rounded">
                    This portal requires mandatory compliance with Employee Digital Transparency Act (EDTA).
                    <br/>
                    Your data collection consent has been pre-approved by the Systems Integrity Bureau.
                    <br/>
                    <button onClick={() => setCookiesAccepted(true)} className="text-yellow-500 underline ml-1">
                        Click here to close this window
                    </button>
                    <button className="text-gray-500 underline ml-3 cursor-not-allowed opacity-50">
                        Decline Consent
                    </button>
                </div>
            )}
        </div>
    );
}
