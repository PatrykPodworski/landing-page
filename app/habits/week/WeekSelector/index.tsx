import { ChevronLeft, ChevronRight } from "@/icons";

const WeekSelector = () => {
  return (
    <div className="flex w-full justify-between mb-6">
      <ChevronLeft />
      <WeekLabel />
      <ChevronRight />
    </div>
  );
};

const WeekLabel = () => {
  return (
    <div className="flex gap-3 items-baseline ">
      <h1 className="text-neutral-100 text-lg">February 2024</h1>
      <small className="rounded px-2 bg-neutral-300 font-medium text-neutral-950 text-sm">
        Week 8
      </small>
    </div>
  );
};
export default WeekSelector;
