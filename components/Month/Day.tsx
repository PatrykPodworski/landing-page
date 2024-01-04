import clsx from "clsx";

const Day = ({ invisible, disabled, index }: Props) => {
  return (
    <div
      data-testid="day"
      className={clsx(
        `w-8 h-8 rounded-lg flex justify-center items-center`,
        disabled
          ? "border border-neutral-800 text-neutral-700"
          : "cursor-pointer bg-rose-500 hover:bg-rose-400 transition-colors active:bg-rose-300 text-rose-100",
        invisible && "invisible"
      )}
    >
      {!invisible && index + 1}
    </div>
  );
};

type Props = {
  invisible?: boolean;
  disabled?: boolean;
  index: number;
};
export default Day;
