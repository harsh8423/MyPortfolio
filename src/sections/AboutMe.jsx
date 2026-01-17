import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaLightbulb, FaRocket, FaHeart, FaBrain, FaUsers, FaClock, FaGraduationCap } from 'react-icons/fa'

const challenges = [
	{
		icon: FaBrain,
		title: "The Manual Process Monster",
		description: "I’ve watched teams waste hours on repetitive tasks that should never require human effort. It’s painful to see creativity and focus drained by mindless manual work.",
		solution: "I build AI-powered automation systems that remove repetitive work and let people focus on decisions, creativity, and impact.",
		weapons: ["Python", "OpenAI API", "LangChain", "RAG Systems", "MLOps"],
		color: "from-purple-500 to-pink-500"
	},
	{
		icon: FaClock,
		title: "The Availability Gap",
		description: "Small businesses kept losing leads and customers—not because they lacked skill, but because they couldn’t be available all the time.",
		solution: "So, I built AI-powered sales and customer support copilot that handles conversations on demand and keeps businesses responsive without increasing their workforce.",
		weapons: ["AI Agents", "Workflow Engine", "Omnichannel Messaging", "Voice AI", "Automation"],
		color: "from-indigo-500 to-purple-500"
	},
	{
		icon: FaBrain,
		title: "The Orchestration Overload",
		description: "Teams were using powerful AI tools in isolation—one for research, another for writing, another for scheduling. The real challenge wasn’t intelligence, it was orchestration.",
		solution: "I built a multimodal AI agent ecosystem where specialized agents collaborate to research, analyze, generate, and execute tasks end-to-end.",
		weapons: ["Python", "FastAPI", "Multiple LLMs", "RAG Systems", "Redis", "MongoDB"],
		color: "from-purple-500 to-pink-500"
	},
	{
		icon: FaRocket,
		title: "The Demo Bottleneck",
		description: "Inbound sales slowed down because live demos didn’t scale. High-intent leads waited for calendars to align, and momentum was lost before real conversations began.",
		solution: "So, I built a shareable AI demo assistant that delivers interactive, voice-driven product demos on demand—qualifying leads and triggering follow-ups automatically.",
		weapons: ["Node.js", "Python", "LiveKit", "WebRTC", "STT/TTS", "LLMs", "RAG"],
		color: "from-orange-500 to-red-500"
	}
];


export function AboutMe() {
	const containerRef = useRef(null)
	
	// Scroll-based animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	})
	
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	return (
		<div ref={containerRef} className="text-center">
			<motion.div 
				className="mb-20"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
					The Spark That Started It All
				</h2>
				<p className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
					This isn't just about skills or experience. It's about the moments that shaped me, the problems that keep me up at night, and why I can't stop building.
				</p>
			</motion.div>

			{/* The Origin Story */}
			<motion.div 
				className="max-w-5xl mx-auto mb-12 sm:mb-20"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3 }}
			>
				<div className="glass rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/5 relative overflow-hidden">
					{/* Background decorative elements */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl" />
					<div className="absolute bottom-0 left-0 w-24 h-24 bg-brand/10 rounded-full blur-2xl" />
					
					<div className="relative z-10">
						<motion.div 
							className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-brand/10 border border-brand/20 rounded-full text-brand text-base sm:text-lg font-medium mb-6 sm:mb-8"
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
						>
							<FaCode className="text-xl" />
							<span>About Me</span>
						</motion.div>

						<motion.div 
							className="text-left sm:text-justify space-y-4 sm:space-y-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.7 }}
						>
							<p className="text-base sm:text-lg lg:text-xl text-zinc-200 leading-relaxed">
								When I was in high school, I always wondered: <i>How does a WhatsApp message get delivered instantly? How do video calls work in real time? How are businesses able to build such custom websites? </i>
								These questions kept revolving in my mind every time I interacted with technology. That curiosity is what led me to choose engineering as my path.							</p>
							
							<p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed">
							As I entered college, AI was evolving rapidly, and so was my passion for technology—it naturally turned into a love for code. I was fascinated by how a few lines could bring ideas to life. What started as simple experiments with websites has now grown into building AI-powered applications that solve real-world problems.
							</p>
							<p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed">
								Freelancing became my reality check. I learned that clients don't care about your tech stack—they care about solutions. When a restaurant owner told me their manual order system was costing them customers, I didn't just build an app. I built a system that integrated with their existing workflow, trained their staff, and increased their efficiency by 40%.
							</p>
						</motion.div>

						{/* Personal touch elements */}
						<motion.div 
							className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1 }}
						>
							<div className="flex items-center gap-2 text-zinc-400 text-sm sm:text-base">
								<FaGraduationCap className="text-brand" />
								<span>Computer Science Graduate</span>
							</div>
							<div className="flex items-center gap-2 text-zinc-400 text-sm sm:text-base">
								<FaHeart className="text-brand" />
								<span>3+ Years Building</span>
							</div>
							<div className="flex items-center gap-2 text-zinc-400 text-sm sm:text-base">
								<FaRocket className="text-brand" />
								<span>10+ Projects Shipped</span>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* The Challenges Section */}
			<motion.div 
				className="mb-6 px-4 sm:px-0"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.2 }}
			>
				<h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">The Challenges That Drive Me</h3>
				<p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto">
					Instead of listing skills, let me show you the problems I love solving and the tools I use as my weapons.
				</p>
			</motion.div>

			{/* Challenges Grid */}
			<div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
				{challenges.map((challenge, index) => (
					<motion.div
						key={challenge.title}
						className="glass rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-brand/20 transition-all duration-300"
						initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
						whileHover={{ scale: 1.02, y: -5 }}
					>
						{/* Challenge Header */}
						<div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
							<div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${challenge.color} flex items-center justify-center text-white text-lg sm:text-2xl flex-shrink-0`}>
								<challenge.icon />
							</div>
							<div className="text-left">
								<h4 className="text-lg sm:text-xl font-semibold text-white mb-2">{challenge.title}</h4>
								<p className="text-zinc-300 text-sm leading-relaxed">{challenge.description}</p>
							</div>
						</div>

						{/* Solution */}
						<div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-brand/5 border border-brand/20 rounded-lg">
							<p className="text-brand font-medium text-left text-sm sm:text-base">{challenge.solution}</p>
						</div>

						{/* Weapons (Skills) */}
						<div className="text-left">
							<p className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">My weapons of choice:</p>
							<div className="flex flex-wrap gap-2">
								{challenge.weapons.map((weapon, i) => (
									<motion.span
										key={weapon}
										className="px-2 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 hover:border-brand/30 transition-colors duration-300"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 1.8 + index * 0.1 + i * 0.05 }}
									>
										{weapon}
									</motion.span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Call to Action */}
			<motion.div 
				className="mt-12 sm:mt-20 text-center px-4 sm:px-0"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 2 }}
			>
				<div className="glass rounded-2xl p-6 sm:p-8 border border-brand/20 max-w-3xl mx-auto">
					<FaLightbulb className="text-4xl text-brand mx-auto mb-4" />
					<h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Ready to Solve Your Challenges?</h3>
					<p className="text-sm sm:text-base text-zinc-300 mb-6">
						I don't just write code—I solve problems. Whether it's automating workflows, building collaboration platforms, or creating robust systems, let's turn your challenges into opportunities.
					</p>
					<motion.button
						onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
						className="px-6 sm:px-8 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300 text-sm sm:text-base"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Let's Build Something Amazing
					</motion.button>
				</div>
			</motion.div>
		</div>
	)
} 