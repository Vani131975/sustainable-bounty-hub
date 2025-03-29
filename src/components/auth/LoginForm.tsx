
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo credentials for quick testing
  const demoLogins = [
    { role: 'Consumer', email: 'jane@example.com', password: 'password123' },
    { role: 'Farmer', email: 'john@example.com', password: 'password123' }
  ];

  const setDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Log in'
            )}
          </Button>
        </form>
        
        <div className="mt-4">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account? 
            <Link to="/signup" className="underline text-primary ml-1 hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-6">
          <p className="text-xs text-center text-muted-foreground mb-2">
            For demo purposes, you can use:
          </p>
          <div className="flex flex-col space-y-2">
            {demoLogins.map((demo, i) => (
              <div key={i} className="flex justify-between items-center border rounded-md p-2 text-xs">
                <div>
                  <span className="font-medium">{demo.role}:</span> {demo.email}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDemoCredentials(demo.email, demo.password)}
                >
                  Use
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
