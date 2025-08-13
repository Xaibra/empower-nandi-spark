import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Impact Stories", href: "#impact" },
    { name: "Get Involved", href: "#get-involved" },
    { name: "News & Events", href: "#news" },
    { name: "Contact", href: "#contact" }
  ];

  const programs = [
    "Economic Empowerment",
    "Education & Training",
    "Gender Equality",
    "Health & Wellbeing",
    "Climate Action",
    "Digital Inclusion"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <div className="font-bold text-lg">Tujitume</div>
                <div className="text-sm opacity-80">Youth & Women CBO</div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Empowering youth and women in Nandi County through comprehensive 
              skills development, leadership training, and community engagement programs.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program}>
                  <span className="text-sm opacity-90">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-secondary flex-shrink-0" />
                <span className="text-sm opacity-90">
                  Kapsabet Town, Nandi County, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm opacity-90">
                  +254 700 000 000
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="text-sm opacity-90">
                  info@tujitume.org
                </span>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium mb-2">Office Hours</h5>
              <p className="text-sm opacity-90">
                Monday - Friday: 8:00 AM - 5:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80">
              © 2024 Tujitume Youth and Women CBO. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="opacity-80 hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#terms" className="opacity-80 hover:opacity-100 transition-opacity">
                Terms of Use
              </a>
              <a href="#safeguarding" className="opacity-80 hover:opacity-100 transition-opacity">
                Safeguarding
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;