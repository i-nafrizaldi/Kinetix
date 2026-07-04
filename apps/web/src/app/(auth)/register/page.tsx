"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import useRegister from "@/hooks/api/auth/useRegister";
import Link from "next/link";

const Register = () => {
  const { isLoading, register } = useRegister();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        fullName:'',
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        register(values);
      },
    });
  return (
    <main className="container">
      <div className="mx-auto min-h-screen px-6 md:grid md:grid-cols-2">
        <div className="hidden md:block">lgo</div>
        <div className="min-h-screen content-center">
          <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Register to your account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <FormInput
                    name="fullName"
                    label="Your Name"
                    error={errors.fullName}
                    isError={!touched.fullName && !errors.fullName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Your Name"
                    type="text"
                    value={values.fullName}
                  />
                  <FormInput
                    name="email"
                    label="Email"
                    error={errors.email}
                    isError={!touched.email && !errors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="your@mail.com"
                    type="email"
                    value={values.email}
                  />

                  <FormInput
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    isError={!!touched.password && !!errors.password}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Your Password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="mt-6 w-full" type="submit">
                  Register
                </Button>
                 <div>
                   have account? <Link className="font-bold" href={"/login"}>Login</Link>
                </div>
                <Link className="font-bold" href={'/'} >Back to Home</Link>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
