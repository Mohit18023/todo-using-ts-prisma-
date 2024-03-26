import { FormEvent, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import Footer from "../components/Footer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log(email, password);
      // Add your form submission logic here
    };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-100% h-100%">
      <section className="bg-gray-50 dark:bg-gray-900 h-100%">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Heading />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <SubHeading heading="Login to your account" />
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <InputBox
                  name="email"
                  placeholder="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <InputBox
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button text="Register" type="submit" />
                <Footer
                  text="Don't have an account?"
                  to="Register"
                  link="/api/v1/register"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
