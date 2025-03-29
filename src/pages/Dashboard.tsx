
import { useAuth } from '@/lib/auth';
import { ConsumerDashboard } from '@/components/dashboard/ConsumerDashboard';
import { FarmerDashboard } from '@/components/dashboard/FarmerDashboard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          {user.role === 'consumer' ? (
            <ConsumerDashboard />
          ) : (
            <FarmerDashboard />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
