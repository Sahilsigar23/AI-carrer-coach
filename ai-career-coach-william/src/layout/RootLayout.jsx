import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;