import { FormEvent, useState } from "react";
import Heading from "../components/Heading"
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import Terms from "../components/Terms";
import Footer from "../components/Footer";

export default function Register() {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log(name,email, password);
      // Add your form submission logic here
    };
  return (
    <div className="bg-gray-50 dark:bg-gray-900 " id="main">
      <section className="bg-gray-50 dark:bg-gray-900 h-100%">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Heading />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <SubHeading heading="Create an account" />
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <InputBox
                  name="name"
                  placeholder="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
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
                <InputBox
                  name="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <Terms value={checked} onClick={() => setChecked(!checked)} />
                <Button text="Register" type="submit" />
                <Footer text="Already have an account?" to="Login" link="/api/v1/login" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
