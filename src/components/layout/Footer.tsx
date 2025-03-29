
import { Link } from 'react-router-dom';
import { Sprout, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-leaf-dark" />
              <span className="font-semibold text-xl">Sustainable Bounty Hub</span>
            </div>
            <p className="text-muted-foreground mt-2">
              A platform connecting food sharing with sustainable agriculture to 
              reduce waste and optimize resource utilization.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/food-listings" className="hover:text-primary transition-colors">Food Listings</Link>
              <Link to="/crop-recommendations" className="hover:text-primary transition-colors">Crop Recommendations</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/food-waste-tips" className="hover:text-primary transition-colors">Food Waste Tips</Link>
              <Link to="/sustainable-farming" className="hover:text-primary transition-colors">Sustainable Farming</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-2">
              <a href="mailto:info@sustainablebountyhub.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@sustainablebountyhub.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Green Street, Portland, OR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Sustainable Bounty Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-sm hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
