import Link from "next/link";
import { PiCarProfileBold } from "react-icons/pi";

export default async function Header() {
  return (
    <nav className="flex flex-col justify-center items-center gap-1 md:flex-row md:justify-between py-1 px-4 border-b-2 border-gray-800  bg-[#7393B3]  text-blue-900  ">
      <menu className="flex justify-start">
        <Link
          href="/"
          className="flex items-center self-center text-2xl font-semibold whitespace-nowrap  hover:text-blue-100"
        >
         Ride Booking Dashboard
        </Link>
      </menu>
      <PiCarProfileBold size="40px"/>
    </nav>
  );
}
