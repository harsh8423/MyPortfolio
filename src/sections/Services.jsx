import { motion } from 'framer-motion'
import { FaWandMagicSparkles, FaServer, FaCubes, FaCode } from 'react-icons/fa6'

const services = [
	{
		icon: FaWandMagicSparkles,
		title: 'Generative AI',
		desc: 'LLM apps, RAG, agents, multimodal, evaluation, and MLOps integration.',
		story: 'Where imagination meets intelligence - I craft AI systems that understand, create, and evolve.'
	},
	{
		icon: FaServer,
		title: 'Full‑Stack Development',
		desc: 'React, Node, databases, auth, payments, and production infra.',
		story: 'From concept to deployment, I build complete digital experiences that scale with your vision.'
	},
	{
		icon: FaCubes,
		title: 'Product & Software',
		desc: 'Roadmapping, rapid prototyping, architecture, and delivery management.',
		story: 'Turning ideas into reality through strategic thinking and rapid execution.'
	},
	{
		icon: FaCode,
		title: 'Web Development',
		desc: 'High‑performance, accessible, SEO‑friendly websites with animation.',
		story: 'Crafting digital experiences that captivate and convert, pixel by pixel.'
	},
]

export function Services() {
	return (
		<div className="text-center">
			{/* Enhanced header with better spacing and animations */}
			<motion.div 
				className="mb-20"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<motion.h2 
					className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					The Tools of My Craft
				</motion.h2>
				<motion.p 
					className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Every great story needs the right tools. Here's what I bring to your narrative...
				</motion.p>
			</motion.div>

			{/* Enhanced services grid with better spacing */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
				{services.map((service, index) => (
					<motion.div
						key={service.title}
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ 
							duration: 0.6, 
							delay: index * 0.1,
							ease: "easeOut"
						}}
						whileHover={{ 
							scale: 1.05, 
							y: -5,
							transition: { duration: 0.2 }
						}}
						className="group"
					>
						<div className="glass rounded-2xl p-8 h-full border border-white/5 hover:border-brand/30 transition-all duration-300 relative overflow-hidden">
							{/* Animated background pattern */}
							<motion.div 
								className="absolute inset-0 opacity-5"
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
							>
								<div className="w-full h-full border border-brand/20 rounded-full" />
							</motion.div>
							
							{/* Icon with enhanced glow effect */}
							<motion.div 
								className="relative mb-6"
								whileHover={{ rotate: 5 }}
								transition={{ duration: 0.3 }}
							>
								<div className="absolute inset-0 bg-brand/20 rounded-full blur-xl group-hover:bg-brand/30 transition-all duration-300" />
								<service.icon className="relative text-brand text-4xl z-10" />
							</motion.div>

							{/* Title */}
							<h3 className="text-xl font-semibold mb-3 text-white group-hover:text-brand transition-colors duration-300">
								{service.title}
							</h3>

							{/* Description */}
							<p className="text-zinc-400 text-sm mb-4 leading-relaxed">
								{service.desc}
							</p>

							{/* Enhanced story element */}
							<div className="pt-4 border-t border-white/5">
								<p className="text-xs text-brand/80 italic leading-relaxed">
									"{service.story}"
								</p>
							</div>
							
							{/* Hover shine effect */}
							<motion.div 
								className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								initial={{ x: -100 }}
								whileHover={{ x: 100 }}
								transition={{ duration: 0.6 }}
							/>
						</div>
					</motion.div>
				))}
			</div>

			{/* Enhanced story continuation hint with better spacing */}
			<motion.div 
				className="mt-20 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.8 }}
			>
				<motion.div 
					className="inline-block px-6 py-3 bg-gradient-to-r from-brand/10 to-brand-dark/10 border border-brand/20 rounded-full"
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.2 }}
				>
					<p className="text-zinc-400 text-sm">
						Ready to see these tools in action? Scroll down to explore my journey...
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}

