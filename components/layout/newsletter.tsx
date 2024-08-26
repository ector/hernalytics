export default function Newsletter(): React.ReactNode {
  return (
    <section className="text-primary-cDark1E">
      <div className="w-full max-w-[284px]">
        <p className="text-[18px] leading-tight font-bold">
          Subscribe to our newsletter
        </p>
        <p className="mt-2">
          Join a community of socially conscious people, get the latest updates.
        </p>
        <div className="space-y-4 mt-6">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="w-full max-w-[424px] bg-transparent border border-primary-cGrey92 px-4 py-3.5 rounded-md placeholder:text-primary-cGreyAC text-primary-cDark1E focus-visible:outline-none"
          />
          <button
            type="submit"
            className="w-full py-[15px] px-10 bg-primary-cGreen74 font-semibold text-[17px] text-white rounded uppercase"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}
