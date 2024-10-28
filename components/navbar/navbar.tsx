import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/components/context/AuthContext";

export const NavbarWrapper = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();

  };

  return (
    <NextUINavbar maxWidth="full" position="static" className="bg-green-500">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-white italic">A Board</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          {isAuthenticated ? (
            <Button
              className="text-sm font-semibold bg-danger text-white"
              onClick={handleSignOut}
              variant="flat"
            >
              Sign out
            </Button>
          ) : (
            <Button
              className="text-sm font-semibold bg-success text-white"
              as={NextLink}
              href={siteConfig.links.signin}
              variant="flat"
            >
              Sign in
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu></NavbarMenu>
    </NextUINavbar>
  );
};
