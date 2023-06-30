import { SpinnerGap } from "@phosphor-icons/react";

type SpinnerProps = {
  color: string;
};

const Spinner = (props: SpinnerProps) => {
  return (
    <div className="flex justify-center animate-spin">
      {props.color === "white" ? (
        <SpinnerGap size={24} color="#ffffff" weight="bold"/>
      ) : (
        <SpinnerGap size={24} color="#3B82F6" weight="bold"/>
      )}
    </div>
  );
};

export default Spinner;
