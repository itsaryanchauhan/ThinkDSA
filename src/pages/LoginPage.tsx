
import LoginForm from "@/components/auth/LoginForm";
import Layout from "@/components/layout/Layout";

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to DSAlgo</h1>
          <p className="text-muted-foreground mt-2">
            Your personal DSA learning assistant
          </p>
        </div>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
