type SpinnerProps = {
  color: string;
}
const Spinner = (props: SpinnerProps) => {
  return props.color === "white" ? (
    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
  ) : (
    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
  );
};

export default Spinner;

