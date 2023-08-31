import { useState, useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
const RiveLoading = ({ className, selected }) => {
  const STATE_MACHINE_NAME = "Loading";
  const INPUT_NAME = "Loading";
  const { rive, RiveComponent } = useRive({
    src: "sodas.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Loading",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
  });
  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );
  useEffect(() => {
    if (rive && onClickInput) {
      onClickInput.fire();
    }
  }, [selected]);

  return <RiveComponent className={className} />;
};

export default RiveLoading;
