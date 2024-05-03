import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center text-4xl font-bold">
      Home Page
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
