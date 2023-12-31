import clsx from "clsx";

const Day = ({ hidden, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        `w-8 h-8 rounded-lg`,
        disabled
          ? "border border-neutral-800"
          : "cursor-pointer bg-rose-500 hover:bg-rose-400 transition-colors active:bg-rose-300",
        hidden && "invisible"
      )}
    />
  );
};

type Props = {
  hidden?: boolean;
  disabled?: boolean;
};
export default Day;
