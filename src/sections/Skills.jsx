import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { FaCode, FaBrain, FaServer, FaPalette, FaDatabase, FaCloud } from 'react-icons/fa'

const skillCategories = [
	{
		id: 'frontend',
		name: 'Frontend',
		icon: FaCode,
		color: 'from-blue-500 to-cyan-500',
		skills: [
			{ name: 'React' },
			{ name: 'Tailwind CSS' },
			{ name: 'Three.js' },
			{ name: 'Vite' },
			{ name: 'Next.js' }
		]
	},
	{
		id: 'ai',
		name: 'AI & ML',
		icon: FaBrain,
		color: 'from-purple-500 to-pink-500',
		skills: [
			{ name: 'Generative AI' },
			{ name: 'RAG' },
			{ name: 'Agents & Chatbots' },
			{ name: 'LangChain' },
			{ name: 'TensorFlow / PyTorch' },
			{ name: 'Vector DBs' }
		]
	},
	{
		id: 'backend',
		name: 'Backend',
		icon: FaServer,
		color: 'from-green-500 to-emerald-500',
		skills: [
			{ name: 'Node.js' },
			{ name: 'Express' },
			{ name: 'Python' },
			{ name: 'FastAPI' },
			{ name: 'REST / Webhooks' }
		]
	},
	{
		id: 'design',
		name: 'Design & UX',
		icon: FaPalette,
		color: 'from-orange-500 to-red-500',
		skills: [
			{ name: 'Figma' },
			{ name: 'Prototyping' },
			{ name: 'Wireframing' }
		]
	},
	{
		id: 'data',
		name: 'Data & DevOps',
		icon: FaDatabase,
		color: 'from-indigo-500 to-blue-500',
		skills: [
			{ name: 'PostgreSQL' },
			{ name: 'MongoDB' },
			{ name: 'Redis' },
			{ name: 'Docker' },
		]
	},
	{
		id: 'cloud',
		name: 'Cloud & Infra',
		icon: FaCloud,
		color: 'from-teal-500 to-green-500',
		skills: [
			{ name: 'AWS' },
			{ name: 'Vercel' },
			{ name: 'Netlify' }
		]
	}
]

export function Skills() {
	const [activeCategory, setActiveCategory] = useState('frontend')
	const containerRef = useRef(null)
	
	// Scroll-based animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	})
	
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	const currentCategory = skillCategories.find(cat => cat.id === activeCategory)

	return (
		<div ref={containerRef} className="text-center">
			<motion.div 
				className="mb-16"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
					The Skills I've Mastered
				</h2>
				<p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					A curated toolset I use to craft beautiful, performant, and intelligent products.
				</p>
			</motion.div>

			{/* Category Navigation */}
			<motion.div 
				className="flex flex-wrap justify-center gap-3 mb-12"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				{skillCategories.map((category, index) => (
					<motion.button
						key={category.id}
						onClick={() => setActiveCategory(category.id)}
						className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 group ${
							activeCategory === category.id
								? 'border-brand bg-brand/10 text-brand'
								: 'border-white/10 hover:border-brand/30 text-zinc-400 hover:text-white'
						}`}
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
					>
						<category.icon className="text-lg" />
						<span className="font-medium">{category.name}</span>
					</motion.button>
				))}
			</motion.div>

			{/* Skills Display */}
			<div className="max-w-4xl mx-auto">
				{/* Category Header */}
				<motion.div 
					key={activeCategory}
					className="mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${currentCategory.color} text-white mb-4`}>
						<currentCategory.icon className="text-xl" />
						<span className="text-lg font-semibold">{currentCategory.name}</span>
					</div>
				</motion.div>

				{/* Skill Chips Grid */}
				<div className="grid md:grid-cols-2 gap-6">
					{currentCategory.skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							className="glass rounded-xl p-5 text-left border border-white/5 hover:border-brand/20 transition-all"
							initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.05 + index * 0.07 }}
						>
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-white">{skill.name}</h3>
								<motion.div
									className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center"
									whileHover={{ rotate: 10, scale: 1.05 }}
								>
									<div className="w-3 h-3 rounded-full bg-brand" />
								</motion.div>
							</div>

							{/* Accents */}
							<div className="mt-4 flex gap-2">
								<div className="h-1 w-1/3 bg-gradient-to-r from-brand/60 to-brand/20 rounded-full" />
								<div className="h-1 w-1/4 bg-gradient-to-r from-brand/40 to-brand/10 rounded-full" />
								<div className="h-1 w-1/5 bg-gradient-to-r from-brand/30 to-transparent rounded-full" />
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Story continuation hint */}
			<motion.div 
				className="mt-16 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 1 }}
			>
				<p className="text-zinc-500 text-sm">
					Curious about my educational journey? Scroll down to discover my academic foundation...
				</p>
			</motion.div>
		</div>
	)
} 