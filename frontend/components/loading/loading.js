import { motion } from "framer-motion";
import styles from "./loading.module.css";
import Text from "../text/text";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.4
    }
  },
  end: {
    transition: {
      staggerChildren: 0.4
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: "50%"
  },
  end: {
    y: "150%"
  }
};

const loadingCircleTransition = {
  duration: 0.8,
  yoyo: Infinity,
  ease: "easeInOut"
};

export default function ThreeDotsWave() {
  return (
    <>
    <Text
      size={14}
      bold={true}
      contents={'잠시만 기다려 주세요'}
    ></Text>
    <motion.div
      className={styles.loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
        />
    </motion.div>
    </>
  );
}