import { initBackButton } from "@telegram-apps/sdk";
import { useEffect } from "react";

import { type Navigator } from "react-router-dom";

export default (reactNavigator: Navigator) => {
  const [backButton] = initBackButton();

  useEffect(() => {
    const hanldebackbutton = () => {
      reactNavigator.go(-1);
    };

    backButton.show();
    backButton.on("click", hanldebackbutton);

    return () => backButton.off("click", hanldebackbutton);
  }, [backButton]);
};
