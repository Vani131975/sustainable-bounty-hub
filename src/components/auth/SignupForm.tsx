
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from '@/lib/types';
import { Loader2, User, Users } from 'lucide-react';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState<UserRole>('consumer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await signup(name, email, password, role, location);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Sign up to start sharing or growing food sustainably
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consumer" onValueChange={(value) => setRole(value as UserRole)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consumer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Consumer
            </TabsTrigger>
            <TabsTrigger value="farmer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Farmer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consumer">
            <p className="text-sm text-muted-foreground mb-4">
              As a consumer, you can donate surplus food and find recipes for ingredients before they expire.
            </p>
          </TabsContent>
          
          <TabsContent value="farmer">
            <p className="text-sm text-muted-foreground mb-4">
              As a farmer, you can receive sustainable farming recommendations and connect with consumers.
            </p>
          </TabsContent>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, State" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-sm text-destructive mt-1">{passwordError}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account? 
              <Link to="/login" className="underline text-primary ml-1 hover:text-primary/80">
                Log in
              </Link>
            </p>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
