import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";
export default function RiveText({ className, selected }) {
  const STATE_MACHINE_NAME = "Texts";
  const INPUT_NAME = "Trigger";
  const BOOL_NAME = "isVisible";
  const { rive, RiveComponent } = useRive({
    src: "sodas.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Texts",
  });
  const pepsiInfo = [
    "PEPSI",
    "Serving Size 12 fl oz (355 mL)",
    "Servings Per Container 1",
    "Amount Per Serving",
    "Calories 150",
    "% Daily Value *",
    "0%",
    "1%",
    "14%",
    "Total Fat 0g",
    "Sodium 30mg",
    "Total Carbohydrate 41g",
    "Sugars 41g",
    "Protein 0g",
    "Not a significant source of other nutrients.",
    "*Percent Daily Values are based on a 2,000 calorie diet.",
    "CARBONATED WATER HIGH FRUCTOSE CORN SYRUP CARAMEL COLOR SUGAR PHOSPHORIC ACID CAFFEINE CITRIC ACID NATURAL FLAVOR",
    "",
  ];
  const cokeInfo = [
    "COCA-COLA",
    "12 servings per container",
    "Serving size 1 Can",
    "Amount Per Serving",
    "Calories 140",
    "% Daily Value *",
    "0%",
    "2%",
    "14%",
    "Total Fat 0g",
    "Sodium 45mg",
    "Total Carbohydrate 39g",
    "Total Sugars 39g",
    "Includes 39g Added Sugars 78%",
    "Caffeine Content: 34 mg/ 12 fl oz",
    "* Not a significant source of saturated fat, trans fat, cholesterol, dietary fiber, vitamin D, calcium, iron and potassium.",
    "CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CARAMEL COLOR, PHOSPHORIC ACID, NATURAL FLAVORS, CAFFEINE.",
    "",
  ];
  useEffect(() => {
    if (rive) {
      for (let index = 1; index < cokeInfo.length - 1; index++) {
        rive.setTextRunValue("myP_" + index, cokeInfo[index]);
      }
      rive.setTextRunValue("myH", "COCA-COLA");
    }
    if (rive && onClickInput && onBoolInput) {
      if (selected) {
        handleAnim();
        for (let index = 1; index < cokeInfo.length - 1; index++) {
          rive.setTextRunValue("myP_" + index, cokeInfo[index]);
        }
        rive.setTextRunValue("myH", "COCA-COLA");
      } else {
        handleAnim();
        for (let index = 1; index < pepsiInfo.length - 1; index++) {
          rive.setTextRunValue("myP_" + index, pepsiInfo[index]);
        }
        rive.setTextRunValue("myH", "PEPSI");
      }
    }
  }, [rive, selected]);

  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );
  const onBoolInput = useStateMachineInput(rive, STATE_MACHINE_NAME, BOOL_NAME);

  function handleAnim() {
    onBoolInput.value = false;
    setTimeout(() => {
      onBoolInput.value = true;
      onClickInput.fire();
    }, 2000);
  }

  return <RiveComponent className={className} />;
}
