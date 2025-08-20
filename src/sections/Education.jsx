import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaBuilding,FaTrophy, FaLaptopCode, FaBookOpen,FaHandshake, FaUsers, FaUniversity, FaChild, FaLightbulb } from 'react-icons/fa'

const education = [
	{
	  year: "Aug 2025",
	  type: "Founder & Visionary",
	  title: "Code Sangam",
	  institution: "My Freelancing Agency",
	  description: "Launched my own freelancing agency to deliver end-to-end software solutions, blending AI, automation, and modern app development for global clients.",
	  icon: FaBuilding, // better than certificate
	  color: "from-yellow-500 to-orange-500",
	  achievements: ["Generative AI Solutions", "Process Automation", "RAG Systems", "Mobile Apps", "Web Platforms"]
	},
	{
	  year: "Dec 2024",
	  type: "Grand Finalist",
	  title: "Smart India Hackathon",
	  institution: "National Innovation Competition",
	  description: "Developed an AI-powered document verification and automation system that reduced manual processes and enhanced efficiency through ML-driven classification.",
	  icon: FaTrophy,
	  color: "from-purple-600 to-pink-600",
	  achievements: ["LLM Fine-tuning", "RAG Pipeline", "Cross-platform App", "AI Automation"]
	},
	{
	  year: "Nov 2023",
	  type: "First Client Project",
	  title: "Stepping Into Freelancing",
	  institution: "Freelance Career Start",
	  description: "Delivered my first paid project, gaining hands-on experience in full-stack development and AI-powered integrations for real clients.",
	  icon: FaHandshake,
	  color: "from-indigo-500 to-purple-500",
	  achievements: []
	},
	{
	  year: "Jun 2023",
	  type: "First Major Project",
	  title: "Full Stack Web Development",
	  institution: "SkillMingle",
	  description: "Built a scalable web platform integrating AI features, solidifying my expertise in front-end and back-end development.",
	  icon: FaLaptopCode,
	  color: "from-blue-500 to-cyan-500",
	  achievements: ["React.js", "Node.js", "Database Architecture"]
	},
	{
	  year: "Aug 2022",
	  type: "Undergraduate Program",
	  title: "B.E. in Computer Science",
	  institution: "Chandigarh University",
	  description: "Currently pursuing a comprehensive program in CS, exploring software engineering, AI, and scalable systems development.",
	  icon: FaUniversity,
	  color: "from-green-500 to-emerald-500",
	  achievements: ["Hackathons", "AI Projects", "Leadership Roles"]
	},
	{
	  year: "2021",
	  type: "High School Graduation",
	  title: "Class 12th",
	  institution: "Saint John’s Academy (ICSE)",
	  description: "Strengthened foundations in Science and Mathematics, preparing for my engineering journey.",
	  icon: FaBookOpen,
	  color: "from-orange-500 to-red-500",
	  achievements: ["Distinction Grade A"]
	},
	{
	  year: "2019",
	  type: "Secondary Education",
	  title: "Class 10th",
	  institution: "Saint John’s Academy (ICSE)",
	  description: "The beginning of my academic journey, where my curiosity for technology started to grow.",
	  icon: FaChild,
	  color: "from-teal-500 to-green-500",
	  achievements: ["Distinction Grade A"]
	}
  ]
  

const additionalLearning = [
	{
		title: "Continuous Learning",
		description: "Regular participation in online courses, hackathons, and industry conferences.",
		icon: FaBookOpen,
		stats: "50+ courses completed"
	},
	{
		title: "Open Source",
		description: "Active contributor to various open-source projects and community initiatives.",
		icon: FaUsers,
		stats: "25+ repositories"
	},
	{
		title: "Innovation",
		description: "Pioneering new approaches in AI integration and full-stack development.",
		icon: FaLightbulb,
		stats: "3 patents filed"
	}
]

export function Education() {
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
				className="mb-16"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
					My Educational Journey
				</h2>
				<p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					From formal education to continuous learning, every step has shaped my expertise...
				</p>
			</motion.div>

			{/* Timeline */}
			<div className="max-w-5xl mx-auto relative">
				{/* Timeline Line */}
				<motion.div 
					className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:w-0.5 bg-gradient-to-b from-brand via-brand-dark to-transparent"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 1.5, delay: 0.5 }}
				/>

				{/* Timeline Items */}
				{education.map((item, index) => (
					<motion.div
						key={item.year}
						className={`relative mb-12 flex items-start md:items-center flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
						initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
					>
						{/* Content */}
						<div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right text-left' : 'md:pl-8 md:text-left text-left'}`}>
							<motion.div 
								className="glass rounded-2xl p-6 border border-white/5 hover:border-brand/20 transition-all duration-300"
								whileHover={{ scale: 1.02, y: -5 }}
							>
								{/* Mobile Year Label */}
								<div className="md:hidden mb-3">
									<div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
										<span className="text-white font-semibold">{item.year}</span>
									</div>
								</div>
								{/* Year Badge */}
								<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-medium mb-3`}>
									<item.icon className="text-sm" />
									<span>{item.type}</span>
								</div>
								
								<h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
								<p className="text-brand font-medium mb-2">{item.institution}</p>
								<p className="text-zinc-300 text-sm mb-4 leading-relaxed">{item.description}</p>
								
								{/* Achievements */}
								<div className="flex flex-wrap gap-2">
									{item.achievements.map((achievement, i) => (
										<span 
											key={i}
											className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300"
										>
											{achievement}
										</span>
									))}
								</div>
							</motion.div>
						</div>

						{/* Timeline Dot */}
						<motion.div 
							className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-brand border-2 md:border-4 border-black shadow-lg"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
							whileHover={{ scale: 1.2 }}
						/>

						{/* Year Label (desktop) */}
						<motion.div 
							className={`hidden md:block absolute top-0 ${index % 2 === 0 ? 'left-1/2 ml-4' : 'right-1/2 mr-4'} transform -translate-y-1/2`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
						>
							<div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
								<span className="text-white font-semibold">{item.year}</span>
							</div>
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* Additional Learning */}
			{/* <motion.div 
				className="mt-20"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.5 }}
			>
				<h3 className="text-2xl font-semibold text-white mb-8">Beyond the Classroom</h3>
				<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{additionalLearning.map((item, index) => (
						<motion.div
							key={item.title}
							className="glass rounded-xl p-6 text-center border border-white/5 hover:border-brand/20 transition-all duration-300"
							whileHover={{ scale: 1.05, y: -5 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
						>
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
								<item.icon className="text-2xl text-brand" />
							</div>
							<h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
							<p className="text-zinc-300 text-sm mb-3">{item.description}</p>
							<div className="text-brand font-medium text-sm">{item.stats}</div>
						</motion.div>
					))}
				</div>
			</motion.div> */}

			{/* Story continuation hint */}
			<motion.div 
				className="mt-16 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 2.2 }}
			>
				<p className="text-zinc-500 text-sm">
					Ready to start our collaboration? Scroll down to get in touch...
				</p>
			</motion.div>
		</div>
	)
} 