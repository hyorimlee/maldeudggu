import { motion } from "framer-motion"

import Text from "../text/text"
import Image from '../image/image'

import styles from "./loading.module.css"

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 1
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
    y: "70%"
  },
  end: {
    y: "220%"
  }
};

const loadingCircleTransition = {
  duration: 0.9,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: "easeInOut"
};

export default function ThreeDotsWave({ contents }) {
  return (
    <article className={styles.container}>
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
    </article>
  );
}