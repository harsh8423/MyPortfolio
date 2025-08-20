import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaHome, FaUser, FaCogs, FaFolder, FaComments, FaStar, FaGraduationCap, FaEnvelope } from 'react-icons/fa'

const navItems = [
	{ id: 'home', label: 'Home', icon: FaHome, href: '#home' },
	{ id: 'about', label: 'About', icon: FaUser, href: '#about' },
	{ id: 'services', label: 'Services', icon: FaCogs, href: '#services' },
	{ id: 'skills', label: 'Skills', icon: FaGraduationCap, href: '#skills' },
	{ id: 'projects', label: 'Projects', icon: FaFolder, href: '#projects' },
	{ id: 'education', label: 'Education', icon: FaGraduationCap, href: '#education' },
	{ id: 'testimonials', label: 'Testimonials', icon: FaStar, href: '#testimonials' },
	{ id: 'contact', label: 'Contact', icon: FaEnvelope, href: '#contact' }
]

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const [scrollProgress, setScrollProgress] = useState(0)

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50
			setScrolled(isScrolled)

			// Calculate overall scroll progress (0 to 100)
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight
			const currentProgress = (window.scrollY / totalHeight) * 100
			setScrollProgress(currentProgress)

			// Update active section based on scroll position
			const sections = navItems.map(item => item.id)
			const currentSection = sections.find(sectionId => {
				const element = document.getElementById(sectionId)
				if (element) {
					const rect = element.getBoundingClientRect()
					return rect.top <= 100 && rect.bottom >= 100
				}
				return false
			})
			
			if (currentSection) {
				setActiveSection(currentSection)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = (href) => {
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
		setIsOpen(false)
	}

	return (
		<>
			{/* Main Navbar - Fixed always on top */}
			<motion.nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${
					scrolled 
						? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
						: 'bg-black/60 backdrop-blur-md border-b border-white/10'
				}`}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ 
					duration: 0.8, 
					ease: "easeOut"
				}}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Logo */}
						<motion.div
							className="flex items-center space-x-3"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg">
								<span className="text-white font-bold text-lg lg:text-xl">HT</span>
							</div>
							<div className="hidden sm:block">
								<h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">
									Harsh Tiwari
								</h1>
								<p className="text-xs text-zinc-400">Full-Stack Developer</p>
							</div>
						</motion.div>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-1">
							{navItems.map((item, index) => (
								<motion.button
									key={item.id}
									onClick={() => scrollToSection(item.href)}
									className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
										activeSection === item.id
											? 'text-brand bg-brand/10 border border-brand/20'
											: 'text-zinc-300 hover:text-white hover:bg-white/5'
									}`}
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									{/* Active indicator */}
									{activeSection === item.id && (
										<motion.div
											className="absolute inset-0 rounded-lg bg-brand/20 border border-brand/30"
											layoutId="activeSection"
											transition={{ duration: 0.3, ease: "easeOut" }}
										/>
									)}
									
									{/* Content */}
									<div className="relative z-10 flex items-center space-x-2">
										<item.icon className="w-4 h-4" />
										<span>{item.label}</span>
									</div>
									
									{/* Hover effect */}
									<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand/0 via-brand/5 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</motion.button>
							))}
						</div>

						{/* Mobile menu button */}
						<motion.button
							onClick={() => setIsOpen(!isOpen)}
							className="lg:hidden w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<AnimatePresence mode="wait">
								{isOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<FaTimes className="w-5 h-5" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<FaBars className="w-5 h-5" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>

				{/* Smooth Progress Bar - Always visible */}
				<motion.div
					className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand via-brand-dark to-brand"
					style={{ width: `${scrollProgress}%` }}
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
				/>
			</motion.nav>

			{/* Mobile Navigation Menu */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						/>

						{/* Menu */}
						<motion.div
							className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 z-50 lg:hidden"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="max-w-7xl mx-auto px-4 py-6">
								<div className="grid grid-cols-2 gap-3">
									{navItems.map((item, index) => (
										<motion.button
											key={item.id}
											onClick={() => scrollToSection(item.href)}
											className={`flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-300 group ${
												activeSection === item.id
													? 'bg-brand/20 border border-brand/30 text-brand'
													: 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
											}`}
											whileHover={{ scale: 1.02, x: 5 }}
											whileTap={{ scale: 0.98 }}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
										>
											<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
												activeSection === item.id
													? 'bg-brand/20 text-brand'
													: 'bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white'
											}`}>
												<item.icon className="w-5 h-5" />
											</div>
											<div>
												<div className="font-medium">{item.label}</div>
												<div className="text-xs opacity-60">Navigate to {item.label}</div>
											</div>
										</motion.button>
									))}
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Scroll to top button */}
			<AnimatePresence>
				{scrolled && (
					<motion.button
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-brand text-white shadow-2xl z-40 hover:bg-brand-dark transition-colors duration-300"
						initial={{ opacity: 0, scale: 0, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0, y: 20 }}
						whileHover={{ scale: 1.1, y: -2 }}
						whileTap={{ scale: 0.9 }}
					>
						<svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7V3" />
						</svg>
					</motion.button>
				)}
			</AnimatePresence>
		</>
	)
}

