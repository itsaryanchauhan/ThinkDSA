
import RegisterForm from "@/components/auth/RegisterForm";
import Layout from "@/components/layout/Layout";

const RegisterPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Join DSAlgo</h1>
          <p className="text-muted-foreground mt-2">
            Create an account to start organizing your DSA journey
          </p>
        </div>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
