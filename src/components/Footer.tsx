export default function Footer() {
  return (
    <>
      <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800  bg-[#7393B3]  text-blue-900">
        <a
          href="https://github.com/traez/trams-africa-ride-booking-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:underline hover:text-blue-100 font-bold text-blue-900"
        >
          Trams Africa Ride Booking Dashboard
        </a>
        <b>
          <span>© {new Date().getFullYear()}</span> Trae Zeeofor
        </b>
      </footer>
    </>
  );
}
