import { Placeholder, Spinner } from "@telegram-apps/telegram-ui";
import { AnimatePresence, motion } from "framer-motion";

const Wait = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Placeholder style={{ paddingTop: "0", width: "100%" }}>
          <Spinner size="l" />
        </Placeholder>
      </motion.div>
    </AnimatePresence>
  );
};

export default Wait;
