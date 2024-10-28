"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/components/context/AuthContext"; // นำเข้า useAuth

export const Signin = () => {
  const router = useRouter();
  const { checkAuth } = useAuth();

  const [values, setValues] = useState<LoginFormType>({
    usename: "user1",
  });

  const [errors, setErrors] = useState<Partial<LoginFormType>>({});

  const validate = useCallback(() => {
    const newErrors: Partial<LoginFormType> = {};

    if (!values.usename) {
      newErrors.usename = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleChange = useCallback(
    (field: keyof LoginFormType) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        await checkAuth(); // เรียก checkAuth เพื่ออัพเดท isAuthenticated
        router.replace("/");
      } else {
        // จัดการข้อผิดพลาด
        console.error("Login failed");
      }
    },
    [validate, router]
  );

  return (
    <div className="w-1/2">
      <div className="font-bold mb-10 text-white text-custom-28">Sign in</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <Input
          value={values.usename}
          isInvalid={!!errors.usename}
          errorMessage={errors.usename}
          onChange={handleChange("usename")}
          className=" w-full"
        />
        <Button
          type="submit"
          variant="flat"
          className=" bg-success text-white w-full"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};
