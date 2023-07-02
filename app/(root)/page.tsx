import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="mb-4">Orbitmart Admin Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
