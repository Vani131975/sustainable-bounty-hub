
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Sprout, Home } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-background/60 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-leaf-dark" />
            <span className="font-semibold text-xl">Sustainable Bounty Hub</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:items-center md:space-x-6">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/food-listings" className="text-sm font-medium hover:text-primary transition-colors">
              Food Listings
            </Link>
            <Link to="/crop-recommendations" className="text-sm font-medium hover:text-primary transition-colors">
              Crop Recommendations
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
        
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link 
                  to="/food-listings" 
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Food Listings
                </Link>
                <Link 
                  to="/crop-recommendations" 
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Crop Recommendations
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <div className="border-t my-4" />
                
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                    
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-destructive hover:text-white mt-2"
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button asChild>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
