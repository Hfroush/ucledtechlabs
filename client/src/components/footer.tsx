import { Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import uclLogo from "@assets/ucl-logo.webp";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Methodology", href: "/#methodology" },
    { name: "Success Stories", href: "/#startups" },
    { name: "London Programme", href: "/autumn-2025" },
    { name: "Paris Programme", href: "/paris" },
    { name: "Supporters & Partners", href: "/past-programs-partners" },
    { name: "Resources & Guides", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const policies = [
    { name: "Accessibility", href: "/accessibility" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Freedom of Information", href: "/freedom-of-information" },
    { name: "Policies & Guidance", href: "/policies-guidance" },
    { name: "Privacy and Cookies", href: "/privacy-cookies" },
    { name: "Slavery Statement", href: "/slavery-statement" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <img
              src={uclLogo}
              alt="UCL Edtech Labs"
              className="h-10 w-auto mb-6 invert"
            />
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Transforming education through innovation. Join our global community of EdTech entrepreneurs making learning accessible, engaging, and effective worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/ucl-edtech-labs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:info@ucledtechlabs.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-300">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link href={policy.href} className="hover:text-white transition-colors text-sm">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} UCL Edtech Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
