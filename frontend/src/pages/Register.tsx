import { FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log(name,email, password);
      // Add your form submission logic here
      const data = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/api/v1/user/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          navigate("/api/v1/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });

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
