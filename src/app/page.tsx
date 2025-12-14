import ExamcontentCard from "./(auth)/_components/exam-content-card";
import LoginForm from "./(auth)/login/_components/login-form";

export default function Home() {
  return (
    <div className="md:flex md:p-0 p-5">
      <ExamcontentCard />
      <LoginForm />
    </div>
  );
}
