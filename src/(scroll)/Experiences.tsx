"use client";

import LinkSvg from "@/app/svgs/LinkSvg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ILink {
	name: string;
	url: string;
}

interface IExperience {
	date: string;
	title: string;
	description: string;
	links?: ILink[];
	languages?: string[];
}

const Link = ({ link }: { link: ILink }) => {
	const handleLink = (link: ILink) => {
		window.open(link.url, "_blank");
	};

	return (
		<motion.div
			className="rounded-xl text-xs font-medium text-white w-fit px-3 py-2 flex gap-2 
			          bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30
			          hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/50
			          cursor-pointer group relative overflow-hidden"
			onClick={() => handleLink(link)}
			whileHover={{ scale: 1.05, y: -2 }}
			whileTap={{ scale: 0.95 }}
		>
			{/* Effet de lueur au survol */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100"
				transition={{ duration: 0.3 }}
			/>
			<LinkSvg />
			<span className="relative z-10">{link.name}</span>
		</motion.div>
	);
};

const TagLanguage = ({ language }: { language: string }) => {
	return (
		<motion.div
			className="rounded-xl text-xs font-medium bg-slate-700/50 text-blue-200 w-fit px-3 py-2
			          border border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700/70
			          hover:text-blue-100 transition-all duration-300 cursor-default"
			whileHover={{ scale: 1.05, y: -1 }}
		>
			<span>{language}</span>
		</motion.div>
	);
};

const ExperienceCard = ({ experience, index }: { experience: IExperience; index: number }) => {
	return (
		<motion.div 
			className="w-full rounded-2xl mb-6 group"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ 
				opacity: 1, 
				y: 0,
				transition: { 
					duration: 0.4,
					delay: index * 0.1
				}
			}}
			viewport={{ once: true, amount: 0.3 }}
		>
			<div 
				className="flex flex-col lg:flex-row w-full h-full p-6 lg:p-8 rounded-2xl cursor-pointer relative
				          bg-slate-800/30 backdrop-blur-sm border border-slate-700/50
				          hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-150 overflow-hidden"
			>
				{/* Effet de lueur en arrière-plan au survol */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				{/* Ligne décorative à gauche (seulement sur desktop) */}
				<div className="hidden lg:block absolute left-0 top-8 bottom-8 w-1 rounded-full opacity-30 group-hover:opacity-100 bg-gradient-to-b from-blue-500 to-cyan-500 transition-opacity duration-150" />

				{/* Ligne décorative en haut (seulement sur mobile) */}
				<div className="lg:hidden absolute top-0 left-6 right-6 h-1 rounded-full opacity-30 group-hover:opacity-100 bg-gradient-to-r from-blue-500 to-cyan-500 transition-opacity duration-150" />

				{/* Date - en haut sur mobile, à gauche sur desktop */}
				<div className="w-full lg:w-[140px] flex-shrink-0 relative mb-4 lg:mb-0">
					<span className="text-blue-300 font-semibold text-sm tracking-wide block">
						{experience.date}
					</span>
					
					{/* Point décoratif - à droite sur desktop, en bas sur mobile */}
					<div className="absolute lg:-right-2 lg:top-1 -bottom-2 left-0 lg:left-auto w-2 h-2 bg-blue-400 rounded-full opacity-60" />
				</div>
				
				{/* Contenu principal */}
				<div className="flex flex-col gap-4 flex-1 relative z-10">
					<h3 className="text-lg font-bold text-white hover:text-blue-300 transition-colors duration-150">
						{experience.title}
					</h3>
					
					<p className="text-slate-300 text-sm leading-relaxed">
						{experience.description}
					</p>
					
					{/* Liens */}
					{experience.links && experience.links.length > 0 && (
						<div className="flex gap-2 flex-wrap">
							{experience.links.map((link, linkIndex) => (
								<div key={linkIndex}>
									<Link link={link} />
								</div>
							))}
						</div>
					)}
					
					{/* Technologies */}
					<div className="flex gap-2 flex-wrap">
						{experience.languages?.map((language, langIndex) => (
							<div key={langIndex}>
								<TagLanguage language={language} />
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};
const Experiences = () => {
	const { t } = useTranslation();
	const experiences: IExperience[] = t('experiences.list', { returnObjects: true }) as IExperience[] || [];

	return (
		<div className="relative">
			{/* Élément décoratif en arrière-plan */}
			<motion.div
				className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-bl from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
				initial={{ scale: 0, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				transition={{ duration: 2 }}
			/>

			<motion.div
				className="relative mb-12"
				initial={{ opacity: 0, x: -30 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: false, amount: 0.8 }}
				transition={{
					duration: 0.6,
					type: "spring",
					stiffness: 100
				}}
			>
				<h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 relative">
					{t('experiences.title')}

					{/* Ligne décorative sous le titre */}
					<motion.div
						className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
						initial={{ width: 0 }}
						whileInView={{ width: "50%" }}
						transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
					/>
				</h2>
			</motion.div>

			<div className="space-y-2">
				{experiences.map((experience, index) => (
					<ExperienceCard key={index} experience={experience} index={index} />
				))}
			</div>
		</div>
	);
};

export default Experiences;