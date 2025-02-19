<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-5 right-5 z-50 p-4 rounded shadow-lg text-white ${
            type === "success" ? "bg-green-700" : "bg-red-700"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
=======
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-5 right-5 z-50 p-4 rounded shadow-lg text-white ${
            type === "success" ? "bg-green-700" : "bg-red-700"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
>>>>>>> e8a0b93e4ade8906b6713cf98a567d34cb64f685
