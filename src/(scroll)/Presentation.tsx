"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const Presentation = () => {
  const { t } = useTranslation();
  
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isTextInView = useInView(textContainerRef, { once: false, amount: 0.1 });
  
  const paragraphs: string[] = (t('about.paragraphs', { returnObjects: true }) as string[]) || [];
  const aboutTitle: string = t('about.title') || 'About Me';
  const korokSeeds: string = t('about.korokSeeds') || 'Korok seeds';
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 * i,
      },
    }),
  };
  
  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 0.8
      } 
    }
  };

  const renderAnimatedTitle = (title: string) => {
    return title.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? 
          { opacity: 1, y: 0 } : 
          { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.5,
          delay: 0.3 + (index * 0.03),
          ease: "easeOut"
        }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div className="relative">
      {/* Élément décoratif en arrière-plan */}
      <motion.div
        className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <motion.div
        ref={titleRef}
        className="relative mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={isTitleInView ? 
          { opacity: 1, y: 0 } : 
          { opacity: 0, y: -30 }
        }
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative">
          {renderAnimatedTitle(aboutTitle)}
          
          {/* Ligne décorative sous le titre */}
          <motion.div
            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "40%" } : { width: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          />
        </h2>
      </motion.div>
    
      <motion.div 
        ref={textContainerRef}
        className="flex flex-col gap-8 text-slate-300 text-base lg:text-lg leading-relaxed relative"
        variants={container}
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            variants={paragraphVariants}
            className="relative"
          >
            {/* Petit indicateur numéroté */}
            <motion.div
              className="absolute -left-8 top-1 w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full opacity-30"
              initial={{ scaleY: 0 }}
              animate={isTextInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            />
            
            <p 
              className="text-slate-300 leading-relaxed relative z-10"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /\{korokSeeds\}/g, 
                  `<span class="korok-magic text-gradient-blue font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer inline-block sparkle-effect">${korokSeeds}</span>`
                )
              }}
            />
            
            {/* Effet de lueur subtile au survol du paragraphe */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              initial={{ x: -100 }}
              whileHover={{ x: 0 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Point lumineux décoratif flottant */}
      <motion.div
        className="absolute bottom-8 right-8 w-3 h-3 bg-cyan-400 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.4, 1, 0.4],
          boxShadow: [
            "0 0 10px rgba(34, 211, 238, 0.4)",
            "0 0 20px rgba(34, 211, 238, 0.8)",
            "0 0 10px rgba(34, 211, 238, 0.4)"
          ]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <style jsx>{`
        .text-gradient-blue {
          background: linear-gradient(135deg, #60a5fa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .korok-magic {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .korok-magic:hover {
          text-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5));
        }
        
        .korok-magic:hover::before {
          content: '🌿';
          position: absolute;
          top: -20px;
          left: -10px;
          animation: sparkle 1s ease-in-out;
        }
        
        .korok-magic:hover::after {
          content: '🌟';
          position: absolute;
          bottom: -20px;
          right: -10px;
          animation: sparkle 1s ease-in-out 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Presentation;