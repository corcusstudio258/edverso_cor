// components/layout/Logo.tsx
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      {/* Placeholder for actual logo image */}
      <div className="w-17 h-17 bg-transparent rounded-lg flex items-center justify-center">
        <Image src="/logo.png" alt="Edverso Logo" width={100} height={100} />
      </div>
      <div className="flex flex-col md:ml-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Edverso
        </h1>
        <p className="text-xs md:text-sm text-gray-500 leading-tight">
          Powered by KIVT
        </p>
      </div>
    </Link>
  );
};

export default Logo;