type buttonProps = {
  children: React.ReactNode;
  onClick: () => void;
};
const Button = (props: buttonProps) => {
  return (
    <button
      className="px-8 py-4 text-2xl  bg-green-500 hover:bg-green-700 text-white font-bold rounded-2xl"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
