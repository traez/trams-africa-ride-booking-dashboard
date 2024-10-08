import PlacesAutocomplete from "@/components/PlacesAutocomplete";
import RideEstimator from "@/components/RideEstimator";

export default function Home() {
  return (
    <>
      <PlacesAutocomplete />
      <RideEstimator />
      {/* <section className="grid grid-cols-1 sm:grid-cols-2 w-full h-full">
        <article className="h-full flex flex-col items-center justify-between p-4">
          <p className="text-2xl font-bold">First Section</p>
          <p className="text-base">
            Duis a facilisis lorem, vel varius eros. Mauris congue ex id tortor
            lacinia, ac cursus mi viverra. Integer in lectus nec mi elementum
            malesuada. Proin non turpis at magna euismod posuere non non justo.
          </p>
        </article>
        <article className="h-full flex flex-col items-center justify-between p-4">
          <p className="text-2xl font-bold">Second Section</p>
          <p className="text-base">
            Duis a facilisis lorem, vel varius eros. Mauris congue ex id tortor
            lacinia, ac cursus mi viverra. Integer in lectus nec mi elementum
            malesuada. Proin non turpis at magna euismod posuere non non justo.
          </p>
        </article>
      </section> */}
    </>
  );
}
