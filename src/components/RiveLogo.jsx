import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
const RiveLogo = ({ className, setSelected }) => {
  const STATE_MACHINE_NAME = "CircleLogo";
  const INPUT_NAME = "onCoke";
  const { rive, RiveComponent } = useRive({
    src: "sodas.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: STATE_MACHINE_NAME,
  });
  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );
  function handleSwitch() {
    setSelected(onClickInput.value);
  }

  return (
    <RiveComponent
      className={className}
      onClick={() => handleSwitch()}
      onTouchStart={() => handleSwitch()}
    />
  );
};

export default RiveLogo;
