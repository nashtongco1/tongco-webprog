const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-1000">
      {children}
    </div>
  );
};

export default AuthLayout;