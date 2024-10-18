import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Header() {
  return (
    <>
    <header className="h-14 w-screen fixed top-0 left-0 flex justify-between py-2 px-4 items-center bg-blue-400">
      <div className="">
        <h1 className="text-2xl font-bold text-center text-gray-900">Just2Min</h1>
      </div>
      <Avatar>
        <AvatarImage></AvatarImage>
        <AvatarFallback>PF</AvatarFallback>
      </Avatar>
    </header>
    <div className="h-14"></div>
    </>
  );
}