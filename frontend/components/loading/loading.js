import { motion } from "framer-motion"

import Text from "../text/text"
import Image from '../image/image'

import styles from "./loading.module.css"

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
  duration: 2,
  repeat: Infinity,
  repeatType: 'loop',
  ease: "easeInOut"
};

export default function ThreeDotsWave({ contents }) {
  return (
    <>
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
      <Image type='logo' path='/img/logo/logo.png'></Image>
      <Text
        size={16}
        bold={true}
        contents={contents}
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