import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useTransform, useScroll } from 'framer-motion'

const projects = [
	{
		title: 'CustArea – AI-Native Sales & Customer Support Platform',
		desc: 'On-demand AI copilot for sales and customer support with workflows, campaigns, and voice agents.',
		details: 'CustArea is a unified AI-powered platform that helps small businesses manage sales and customer support on demand. It combines an omnichannel inbox, context-aware AI agents, advanced workflow automation, AI-driven campaigns, and voice agents to handle conversations anytime—during peak hours or off-hours—without increasing workforce. Designed to keep businesses responsive, organized, and in control.',
		link: 'https://custarea.com',
		tags: ['AI', 'Automation', 'Workflows', 'Voice AI'],
		accent: ['from-indigo-400/20', 'to-purple-500/10'],
		featured: true
	},
	{
		title: 'Multimodal AI Agent Ecosystem',
		desc: 'Multi-agent system for end-to-end content research, creation, analysis, and publishing.',
		details: 'Built an ecosystem of 8+ specialized AI agents—including research, planner, analyst, asset manager, and orchestrator—capable of executing complete social media workflows. The system integrates 30+ external tools for competitor analysis, media scraping, trend detection, content generation, scheduling, and publishing. Designed with a FastAPI backend, Redis-based orchestration, MongoDB storage, and multiple LLMs for coordinated agent execution.',
		link: 'https://github.com/harsh8423/Multimodal_Agent',
		tags: ['AI Agents', 'RAG', 'FastAPI', 'Redis', 'LLMs'],
		accent: ['from-purple-400/20', 'to-pink-500/10'],
		featured: true
	},
	{
		title: 'Shareable AI Demo Assistant for Inbound Sales',
		desc: 'Link-based AI demo system with voice-driven walkthroughs and automated lead qualification.',
		details: 'Developed a shareable AI-powered demo assistant that replaces live intro demos with interactive voice and text-driven product walkthroughs. Built a real-time conversational pipeline using LiveKit and WebRTC (audio input → STT → LLM → RAG → UI sync). Added analytics and follow-up automation to capture demo transcripts, intent signals, and engagement metrics—enabling callbacks and follow-ups without human intervention.',
		link: 'https://github.com/harsh8423/live_demo_avatar',
		tags: ['AI', 'WebRTC', 'LiveKit', 'STT/TTS', 'RAG'],
		accent: ['from-orange-400/20', 'to-red-500/10'],
		featured: true
	},
	{
		title: 'AI-Driven Web App Builder',
		desc: 'LLM-guided platform to generate and deploy production-ready web applications.',
		details: 'Engineered a production-grade AI web app builder inspired by lovable.dev and bolt.new, capable of generating full-stack applications using LLM-guided templates and code generation. Designed scalable infrastructure with Dockerized per-app containers, Kubernetes orchestration (EKS), and subdomain-based routing. Deployed on AWS (EKS, ECR, S3, ALB, EC2) with WebSocket-based live code rendering.',
		link: 'https://github.com/harsh8423/AI_Web_App_Builder',
		tags: ['LLMs', 'Next.js', 'Docker', 'Kubernetes', 'AWS'],
		accent: ['from-blue-400/20', 'to-cyan-500/10']
	},
	{
		title: 'Seekure – AI Job Search Assistant',
		desc: 'Cross-platform AI job search engine with ATS resume analysis and tailored cover letter generation.',
		details: 'A feature-rich job search engine that integrates multiple platforms (including Telegram channels) to find roles tailored to a user’s resume. It analyzes ATS compatibility, generates personalized cover letters based on job descriptions, and provides career-boosting insights — making the job hunt smarter and faster.',
		link: 'https://seekure.vercel.app/',
		tags: ['AI', 'NLP', 'Automation', 'Integrations'],
		accent: ['from-emerald-400/20', 'to-cyan-400/10']
	},
	{
		title: 'CricGenius – Cricket Analytics Platform',
		desc: 'Interactive analytics & visualization for match insights with fantasy team generator and AI chatbot.',
		details: 'An advanced cricket analytics hub that scrapes and processes raw scorecards and commentary data to reveal player strengths, weaknesses, and opponent strategies. Equipped with stunning visualizations, an AI-powered fantasy team generator, and a quick analytics chatbot for on-the-spot insights during matches.',
		link: 'https://cricgenius.vercel.app/',
		tags: ['Data Analytics', 'Web Scraping', 'Visualization'],
		accent: ['from-orange-400/20', 'to-pink-500/10']
	},
	{
		title: 'AICTE Portal Automation',
		desc: 'Automated registration & verification with OCR, digital signatures, and audit-ready logs.',
		details: 'Automated the entire institution registration and verification pipeline for AICTE, bridging the gap between colleges and the verification committee. Built a log manager chatbot, used OCR for document checks, and integrated digital signature verification for authenticity. The system streamlined manual work, saving time and reducing human error.',
		link: 'https://github.com/AyushKatochh/Portal-Automation',
		tags: ['Automation', 'OCR', 'AI', 'Chatbot'],
		accent: ['from-blue-400/20', 'to-violet-500/10']
	},
	{
		title: 'SpeakBee – Intelligent Voice Assistant',
		desc: 'Language-agnostic voice assistant with transcription, translation, reminders, and diarization.',
		details: 'A multilingual voice assistant capable of speaker identification, diarization, and seamless ASR-based transcription. SpeakBee supports reminders, conversation summarization, preference saving, and translation across languages. With a Next.js front-end, it offers a polished UI and robust real-time interaction — almost like a personal AI companion.',
		link: 'https://github.com/harsh8423/speakbee',
		tags: ['AI', 'Speech', 'ASR', 'Next.js'],
		accent: ['from-yellow-400/20', 'to-rose-500/10']
	},
	{
		title: 'Online Hackathon Hosting Platform',
		desc: 'MERN platform to host hackathons with GitHub integration, Kanban, tasks, and Drive sync.',
		details: 'A scalable platform to host online hackathons, successfully powering Hack2Hire with 200+ participants. It featured GitHub API integration to track repositories, Kanban boards for task management, event scheduling with MobiScroll, and Google Drive API for file handling. Built on MERN, the platform delivered a smooth end-to-end hackathon experience.',
		link: 'https://hackathon.skillmingle.in/',
		tags: ['MERN', 'APIs', 'Kanban', 'Hackathons'],
		accent: ['from-teal-400/20', 'to-indigo-500/10']
	}
]

function ProjectCard({ project, index, onOpen }) {
	return (
		<motion.button
			onClick={() => onOpen(project)}
			initial={{ opacity: 0, y: 20, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, amount: 0.3 }}
			whileHover={{ y: -6 }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			className={`group relative w-full text-left rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm bg-gradient-to-br ${project.accent[0]} ${project.accent[1]} hover:border-white/20`}
		>
			{/* Featured Badge */}
			{project.featured && (
				<div className="absolute top-0 right-0 z-10">
					<motion.div 
						className="relative"
						initial={{ x: 20, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ delay: index * 0.1 + 0.3 }}
					>
						<div className="relative overflow-hidden">
							{/* Animated background shimmer */}
							<motion.div 
								className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
								animate={{ x: ['-200%', '200%'] }}
								transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
							/>
							{/* Badge content */}
							<div className="relative px-4 py-1.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 rounded-bl-xl rounded-tr-xl shadow-lg">
								<div className="flex items-center gap-1.5">
									<svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<span className="text-xs font-bold text-black tracking-wide uppercase">Featured</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
			
			{/* Decorative cover */}
			<div className="relative h-40 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_40%)]" />
				<motion.div
					className="absolute -inset-8 opacity-20 bg-[conic-gradient(from_0deg,rgba(6,182,212,0.2),transparent_30%)]"
					animate={{ rotate: 360 }}
					transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
				/>
				<div className="absolute bottom-4 left-4 right-4">
							<h3 className="text-xl font-bold">{project.title}</h3>
						</div>
				<motion.div 
					className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
					initial={{ opacity: 0.6 }}
					whileHover={{ opacity: 0.4 }}
				/>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* <div className="flex items-start justify-between gap-4">
					<h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
					<motion.span 
						className="px-3 py-1 text-xs rounded-full bg-black/30 border border-white/10 text-zinc-300"
						whileHover={{ scale: 1.05 }}
					>
						View
					</motion.span>
				</div> */}
				<p className="text-zinc-400 text-sm mt-2">{project.desc}</p>
				<div className="mt-4 flex flex-wrap gap-2">
					{project.tags.map((t) => (
						<span key={t} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">{t}</span>
					))}
				</div>
			</div>

			{/* Shine on hover */}
			<div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
				<div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />
			</div>
		</motion.button>
	)
}

function ProjectModal({ project, onClose }) {
	const [hoverImage, setHoverImage] = useState(false)

	useEffect(() => {
		function onKey(e) {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [onClose])

	if (!project) return null

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-[70] flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{/* Backdrop */}
				<motion.div
					className="absolute inset-0 bg-black/70 backdrop-blur-xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				/>

				{/* Modal card */}
				<motion.div
					className="relative z-[71] w-[94vw] sm:w-[92vw] max-w-4xl max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl"
					initial={{ y: 30, scale: 0.98, opacity: 0 }}
					animate={{ y: 0, scale: 1, opacity: 1 }}
					exit={{ y: 20, scale: 0.98, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 120, damping: 16 }}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header visual */}
					<div className={`relative h-44 sm:h-56 bg-gradient-to-br ${project.accent[0]} ${project.accent[1]} overflow-hidden`}>
						<motion.div 
							className="absolute -inset-16 bg-[conic-gradient(from_0deg,rgba(255,255,255,0.2),transparent_30%)] opacity-30"
							animate={{ rotate: -360 }}
							transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.6))]" />
						<div className="absolute bottom-4 left-4 right-4">
							<h3 className="text-xl sm:text-2xl font-bold">{project.title}</h3>
							<p className="text-zinc-300 mt-2">{project.details}</p>
						</div>
					</div>

					{/* Body */}
					<div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-11rem)]">
						<div className="flex flex-wrap gap-2">
							{project.tags.map((t) => (
								<span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">{t}</span>
							))}
						</div>

						{/* Faux gallery */}
						<div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
							{[0,1,2].map((g) => (
								<motion.div key={g} className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
									whileHover={{ scale: 1.06 }}
								>
									<div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_50%)]" />
								</motion.div>
							))}
						</div>

						<div className="mt-6 flex items-center justify-between gap-3">
							<a href={project.link} target="_blank" rel="noreferrer" className="px-3 sm:px-4 py-2 rounded-lg bg-brand/20 border border-brand/30 text-brand hover:bg-brand/30 transition-colors">Open Project</a>
							<button onClick={onClose} className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Close</button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export function Projects() {
	const [active, setActive] = useState(null)
	const sectionRef = useRef(null)
	const containerRef = useRef(null)


	// Auto-close modal when leaving the Projects section
	useEffect(() => {
		const node = sectionRef.current
		if (!node) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) setActive(null)
			},
			{ threshold: 0 }
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [])

		// Scroll-based animations
		const { scrollYProgress } = useScroll({
			target: containerRef,
			offset: ["start end", "end start"]
		})

	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	return (
		<section id="projects" ref={sectionRef} className="container-lg py-20">
			<div className="mb-10">
			<motion.div 
				className="mb-6 text-center"
				style={{ scale, opacity, y }}
			>
				<h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
				A Glimpse of My Work
				</h2>
				<p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
				Where passion meets execution — transforming concepts into impactful solutions. Built with curiosity, refined with code, and driven by purpose."
				</p>
			</motion.div>
			</div>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
				{projects.map((p, i) => (
					<ProjectCard key={p.title} project={p} index={i} onOpen={setActive} />
				))}
			</div>

			<ProjectModal project={active} onClose={() => setActive(null)} />
		</section>
	)
}

