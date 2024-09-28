import { type Navigator, Navigate, useParams } from "react-router-dom";
import { BackButton } from "../scripts";

import { motion } from "framer-motion";

export default ({ reactNavigator }: { reactNavigator: Navigator }) => {
  const { name } = useParams();

  if (!name) {
    return <Navigate to="/" />;
  }

  BackButton(reactNavigator);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {name}
    </motion.div>
  );
};
