import { UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="flex justify-end p-6">
      <UserButton />
    </header>
  );
};
