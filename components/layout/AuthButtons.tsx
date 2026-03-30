// components/layout/AuthButtons.tsx
import Link from "next/link";

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="btn btn-primary text-sm"
      >
        Get Started
      </Link>
    </div>
  );
};

export default AuthButtons;