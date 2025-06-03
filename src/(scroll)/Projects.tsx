"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IProject {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

const ProjectCard = ({ project, index }: { project: IProject; index: number }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            className="w-full rounded-2xl mb-6 group"
            initial={{ opacity: 0, x: 50, y: 30 }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 20,
                    delay: index * 0.15
                }
            }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <motion.div
                className="flex flex-col w-full h-full p-8 rounded-2xl cursor-pointer relative
              bg-slate-800/40 backdrop-blur-sm border border-slate-700/50
              hover:bg-slate-800/60 hover:border-blue-500/40 transition-all duration-200
              overflow-hidden group"
            >
                {/* Effet de lueur d'arrière-plan au survol */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                />
                {/* Effet de lueur d'arrière-plan statique */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.6 }}
                />

                {/* Bordure lumineuse en haut */}
                <motion.div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                />

                {/* Numéro du projet avec effet magique */}
                <motion.div
                    className="absolute top-6 right-6 w-8 h-8 rounded-full border flex items-center 
							  justify-center text-xs font-bold text-blue-300 sparkle-effect
							  bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: (index * 0.15) + 0.5, type: "spring", stiffness: 200 }
                    }}
                    viewport={{ once: false }}
                    whileHover={{
                        scale: 1.1,
                        borderColor: "rgba(59, 130, 246, 0.8)",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                    }}
                >
                    {(index + 1).toString().padStart(2, '0')}
                </motion.div>

                {/* Constellation de points magiques */}
                <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                                left: i * 8,
                                top: i * 4,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </motion.div>

                <div className="relative z-10">
                    <motion.h3
                        className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { delay: (index * 0.15) + 0.3 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.title}
                    </motion.h3>

                    <motion.p
                        className="text-slate-300 mb-6 leading-relaxed text-sm lg:text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { delay: (index * 0.15) + 0.4 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div
                        className="flex flex-wrap gap-2 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: (index * 0.15) + 0.5 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.technologies.map((tech, techIndex) => (
                            <motion.span
                                key={techIndex}
                                className="text-xs px-3 py-2 rounded-xl bg-slate-700/60 text-blue-200 
                                          border border-slate-600/50 hover:border-blue-500/50 
                                          hover:bg-slate-700/80 hover:text-blue-100 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: { delay: (index * 0.15) + 0.5 + (techIndex * 0.05) }
                                }}
                                viewport={{ once: false }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Liens du projet */}
                    <motion.div
                        className="flex gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: (index * 0.15) + 0.6 }
                        }}
                        viewport={{ once: false }}
                    >
                        {project.link && (
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium
                                          group/link transition-all duration-300"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{t('projects.viewProject')}</span>
                                <motion.svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </motion.svg>
                            </motion.a>
                        )}

                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium
                                          group/github transition-all duration-300"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </motion.svg>
                                <span>{t('projects.github')}</span>
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Effet de particules flottantes dans la carte */}
                <motion.div
                    className="absolute bottom-4 right-4 w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.7
                    }}
                />

                {/* Message secret au survol prolongé */}
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                              text-xs text-cyan-300 opacity-0 pointer-events-none"
                    whileHover={{
                        opacity: [0, 0, 0, 1],
                        scale: [0.8, 0.8, 0.8, 1],
                    }}
                    transition={{
                        duration: 2,
                        times: [0, 0.7, 0.9, 1]
                    }}
                >
                    ✨ Projet magique ✨
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation();
    const projects: IProject[] = t('projects.list', { returnObjects: true }) as IProject[] || [];

    return (
        <div className="relative">
            {/* Élément décoratif en arrière-plan */}
            <motion.div
                className="absolute -top-24 -left-24 w-56 h-56 bg-gradient-to-tr from-blue-600/6 to-cyan-400/6 rounded-full blur-3xl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5 }}
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
                    {t('projects.title')}

                    {/* Ligne décorative sous le titre */}
                    <motion.div
                        className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "45%" }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />
                </h2>

                {/* Sous-titre avec compteur de projets */}
                <motion.p
                    className="text-slate-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {projects.length} projets sélectionnés
                </motion.p>
            </motion.div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* Ligne décorative de fin */}
            <motion.div
                className="mt-16 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
                    <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    />
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;