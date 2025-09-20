import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 overflow-x-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/authImg.png)',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <main className="relative z-10 flex-grow flex justify-center items-start">
        <div className="w-full max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;