import LoginForm from "./_components/login-form";
type Props = {
  searchParams: { email?: string };
};
export default function Loginpage({ searchParams }: Props) {
  return <LoginForm defaultEmail={searchParams.email} />;
}
