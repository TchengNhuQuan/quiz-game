"use client";

const WelcomeTitle = () => {
  return (
    <div
      className="
        border-[1px] w-full md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
          bg-rose-500

      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          p-2
          text-md
          font-semibold
          px-6
          text-white
        "
      >
        Welcome to Quiz Maker Website
      </div>
    </div>
  );
};

export default WelcomeTitle;
