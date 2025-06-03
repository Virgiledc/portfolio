"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IStep {
	name: string;
	href: string;
}

const NavMenu = () => {
	const { t } = useTranslation();
	
	// Récupère les steps depuis les traductions
	const steps: IStep[] = (t('nav.menu', { returnObjects: true }) as IStep[]) || [
		{ name: "ABOUT", href: "#about" },
		{ name: "EXPERIENCE", href: "#experience" }, 
		{ name: "PROJECTS", href: "#projects" }
	];
	
	const [selected, setSelected] = useState<IStep | null>(null);

	// Détection améliorée de la section active
	useEffect(() => {
		if (steps.length === 0) return;
		
		window.scrollTo(0, 0);
		setSelected(steps[0]);
		
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			
			const sections = steps.map(step => {
				const id = step.href.substring(1);
				const element = document.getElementById(id);
				return { step, element };
			});
			
			let activeSection = sections[0].step;
			
			for (const { step, element } of sections) {
				if (element && element.offsetTop <= scrollPosition + 300) {
					activeSection = step;
				}
			}
			
			setSelected(activeSection);
		};
		
		window.addEventListener("scroll", handleScroll);
		
		return () => window.removeEventListener("scroll", handleScroll);
	}, [steps.length]);

	const handleSelect = (step: IStep) => {
		setSelected(step);
	};

	return (
		<motion.div 
			className="flex flex-col gap-2 relative"
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8, delay: 0.5 }}
		>
			{/* Ligne verticale décorative */}
			<div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
			
			{steps.map((step, index) => {
				const isSelected = selected?.href === step.href;
				
				return (
					<motion.div
						key={index}
						className="relative"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
					>
						<motion.a
							onClick={() => handleSelect(step)}
							href={step.href}
							className="group flex items-center cursor-pointer relative py-3 px-4 rounded-xl transition-all duration-300"
							whileHover={{ x: 8 }}
							// Suppression des animations de clic
						>
							{/* Arrière-plan pour l'élément sélectionné */}
							<AnimatePresence>
								{isSelected && (
									<motion.div
										layoutId="selectedBackground"
										className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>
							
							{/* Indicateur à gauche */}
							<motion.div
								className="relative flex items-center justify-center mr-4"
								animate={{ 
									scale: isSelected ? 1.2 : 1,
								}}
								transition={{ duration: 0.3 }}
							>
								<motion.div
									className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
										isSelected 
											? "border-cyan-400 bg-cyan-400/50" 
											: "border-blue-400/50 bg-transparent group-hover:border-cyan-400 group-hover:bg-cyan-400/20"
									}`}
									animate={{
										boxShadow: isSelected 
											? "0 0 20px rgba(34, 211, 238, 0.6)" 
											: "0 0 0px rgba(34, 211, 238, 0)"
									}}
									transition={{ duration: 0.3 }}
								/>
								
								{/* Point central lumineux */}
								{isSelected && (
									<motion.div
										className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.2 }}
									/>
								)}
							</motion.div>
							
							{/* Texte du menu */}
							<motion.span
								className={`text-sm font-medium tracking-wide transition-all duration-300 relative z-10 ${
									isSelected 
										? "text-white" 
										: "text-slate-400 group-hover:text-white"
								}`}
								animate={{
									fontWeight: isSelected ? 600 : 500
								}}
							>
								{step.name}
							</motion.span>
							
							{/* Effet de lueur sur hover */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								initial={{ x: -100 }}
								whileHover={{ x: 0 }}
								transition={{ duration: 0.3 }}
							/>
						</motion.a>
						
						{/* Ligne de connexion entre les éléments */}
						{index < steps.length - 1 && (
							<motion.div
								className="absolute left-6 bottom-0 w-px h-3 bg-gradient-to-b from-blue-500/30 to-transparent"
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								transition={{ duration: 0.4, delay: 1 + (index * 0.1) }}
							/>
						)}
					</motion.div>
				);
			})}
		</motion.div>
	);
};

export default NavMenu;