
import { Navigate } from 'react-router-dom';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/lib/auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sprout } from 'lucide-react';

const Signup = () => {
  const { user } = useAuth();

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sprout className="h-12 w-12 text-leaf-dark" />
            </div>
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join Sustainable Bounty Hub and start making a difference</p>
          </div>
          
          <SignupForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
