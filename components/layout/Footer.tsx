// components/layout/Footer.tsx
import Link from "next/link";
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Pricing", href: "/#pricing" },
        { name: "Features", href: "/#features" },
        { name: "For Students", href: "/#students" },
        { name: "For Colleges", href: "/#colleges" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/faq" },
        { name: "Help Center", href: "/contact" },
        { name: "Contact Us", href: "/contact" },
        { name: "Internship Guide", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Email", href: "mailto:support@edverso.in", icon: Mail },
    { name: "Phone", href: "tel:+919341041274", icon: Phone },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-15 h-15 bg-transparent rounded-lg flex items-center justify-center">
                      <Image src="/booklogo.png" alt="Edverso Logo" width={100} height={100} />
                    </div>
              <div className="flex flex-col">
                <h1 className=" text-2xl md:text-3xl font-bold text-gray-100 leading-tight">
                  Edverso
                </h1>
                <p className="text-xs md:text-sm text-gray-500 leading-tight">
                  Your Digital Internship Platform
                </p>
              </div>
            </Link>
            <p className="mt-4 text-gray-300 max-w-md">
              Empowering students across India with UGC-mandated internship
              certification. A seamless digital platform for registration,
              learning, and certification.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <SocialLink key={name} href={href} name={name} Icon={Icon} />
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © {currentYear}  Edverso. All rights reserved.
          </p>
          <p className="flex flex-row gap-2 items-center text-gray-300 text-sm">
            Powered by <a href="https://www.bssindia.net/" className="flex flex-row gap-2 hover:underline text-blue-400 items-center">
            <Image className="w-auto h-auto mr-2 rounded-full" src="/balajilogo.jpg" alt="BALAJEE SEWA SANSTHAN Logo"  height={50} width={50}/>
            BALAJEE SEWA SANSTHAN</a>
          </p>

          <p className="text-gray-400 text-sm">
            Compliant with UGC Internship Guidelines
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{
  href: string;
  name: string;
  Icon: React.ElementType;
}> = ({ href, name, Icon }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
  >
    <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
  </Link>
);

export default Footer;
