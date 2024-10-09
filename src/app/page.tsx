import LocationAutocomplete from "@/components/LocationAutocomplete";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-between w-full h-full p-4 gap-4">
        <h1 className="text-xl font-bold text-center">
          Kindly input your PickUp and Destination details.
        </h1>
        <h2 className="text-xl font-bold text-center">
          Feedback will run automatically
        </h2>
        <LocationAutocomplete />
      </section>
    </>
  );
}
