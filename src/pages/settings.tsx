import { type Navigator } from "react-router-dom";
import { motion } from "framer-motion";
import { BackButton } from "../scripts";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  BackButton(reactNavigator);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      "asd"
    </motion.div>
  );
};
