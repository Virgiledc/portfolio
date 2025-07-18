"use client";

import GithubSvg from "@/app/svgs/GithubSvg";
import LinkedIn from "@/app/svgs/LinkedIn";
import { JSX } from "react";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";

interface ISocial {
  name: string;
  url: string;
  icon: JSX.Element
}

const socials: ISocial[] = [
  {
    name: "Github",
    url: "https://github.com/Virgiledc",
    icon: <GithubSvg />
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/virgilefouche/",
    icon: <LinkedIn />
  },
];

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.4,
        ease: easeInOut,
      },
      scale: {
        duration: 0.2
      }
    }
  },
  tap: { 
    scale: 0.9,
    transition: {
      duration: 0.1
    }
  }
};

const Social = ({ social, index }: { social: ISocial; index: number }) => {
  const handleOpen = () => {
    window.open(social.url, "_blank");
  };

  return (
    <motion.div
      onClick={handleOpen}
      className="relative group cursor-pointer sparkle-effect"
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={iconVariants}
    >
      {/* Arrière-plan avec glassmorphism et effet arc-en-ciel */}
      <motion.div
        className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 
                   hover:border-blue-500/50 text-white rounded-2xl flex items-center 
                   justify-center p-4 transition-all duration-300 relative overflow-hidden
                   hover:bg-slate-800/80 magic-hover"
        whileHover={{ 
          boxShadow: [
            "0 10px 30px rgba(59, 130, 246, 0.2)",
            "0 10px 30px rgba(167, 139, 250, 0.3)",
            "0 10px 30px rgba(236, 72, 153, 0.2)",
            "0 10px 30px rgba(59, 130, 246, 0.2)"
          ],
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
        }}
        style={{
          animation: "rainbow-border 3s ease-in-out infinite"
        }}
      >
        {/* Effet de lueur en arrière-plan magique */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: "conic-gradient(from 0deg, rgba(59, 130, 246, 0.2), rgba(167, 139, 250, 0.2), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))"
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Icône */}
        <div className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-300">
          {social.icon}
        </div>
        
        {/* Étoiles magiques qui apparaissent au survol */}
        <motion.div
          className="absolute top-1 right-1 text-xs opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          ⭐
        </motion.div>
        
        <motion.div
          className="absolute bottom-1 left-1 text-xs opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          💫
        </motion.div>
      </motion.div>
      
      {/* Tooltip au survol */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                   bg-slate-800/90 backdrop-blur-sm text-white text-xs px-3 py-2 
                   rounded-lg border border-blue-500/30 opacity-0 group-hover:opacity-100
                   pointer-events-none whitespace-nowrap"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {social.name}
        {/* Petite flèche */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                        border-l-4 border-r-4 border-t-4 border-transparent 
                        border-t-slate-800/90"></div>
      </motion.div>
    </motion.div>
  );
};

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 1,
      staggerChildren: 0.2
    }
  }
};

const NavSocials = () => {
  return (
    <motion.div 
      className="flex gap-4 relative"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {/* Ligne décorative au-dessus */}
      <motion.div
        className="absolute -top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      
      {socials.map((social, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { delay: 1.2 + (index * 0.1) }
          }}
        >
          <Social social={social} index={index} />
        </motion.div>
      ))}
      
      {/* Élément décoratif flottant */}
      <motion.div
        className="absolute -right-4 -top-2 w-2 h-2 bg-cyan-400 rounded-full opacity-50"
        animate={{ 
          x: [0, 10, 0],
          y: [0, -5, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default NavSocials;