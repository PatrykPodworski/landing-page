// TODO: Feature: Motion animation on hover and click
const IconButton = ({ children, onClick }: IconButtonProps) => (
  <button
    className="rounded-full hover:bg-[#ffffff1f] transition-all duration-300 p-2"
    onClick={onClick}
  >
    {children}
  </button>
);

type IconButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export default IconButton;
