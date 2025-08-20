import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export function StorySection({ id, children, chapter, totalChapters = 8, alignTop = false }) {
	const sectionRef = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	// Scroll progress for the current section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	})

	// Progress within the section (0 to 1)
	const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

	// Intersection Observer to detect when section is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting)
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.05 // Trigger early so chapter appears sooner
			}
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current)
			}
		}
	}, [])

	// Enhanced storytelling animation values
	const fadeIn = useTransform(scrollYProgress, [0, 0.1], [0, 1])
	const slideUp = useTransform(scrollYProgress, [0, 0.2], [80, 0])
	const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1])
	const rotateY = useTransform(scrollYProgress, [0, 0.3], [10, 0])

	// Enhanced entrance animation
	const entranceAnimation = {
		hidden: { 
			opacity: 0, 
			y: 60, 
			scale: 0.95, 
			rotateY: 10
		},
		visible: { 
			opacity: 1, 
			y: 0, 
			scale: 1, 
			rotateY: 0
		}
	}

	const dividerHeightClass = chapter === 2 ? 'h-16' : 'h-24 md:h-32'

	return (
		<>
			{/* Redesigned Story Transition Portal */}
			{chapter > 1 && (
				<motion.div 
					className={`relative ${dividerHeightClass} overflow-hidden`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					{/* Transparent background with depth */}
					<div className="absolute inset-0 bg-transparent">
						{/* Animated grid pattern */}
						<motion.div 
							className="absolute inset-0 opacity-10"
							style={{
								backgroundImage: `
									linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
									linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
								`,
								backgroundSize: '20px 20px'
							}}
							animate={{ 
								backgroundPosition: ['0px 0px', '20px 20px']
							}}
							transition={{ 
								duration: 8, 
								repeat: Infinity, 
								ease: "linear" 
							}}
						/>
					</div>

					{/* Central story connection element */}
					<motion.div 
						className="absolute inset-0 flex items-center justify-center"
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
					>
						{/* Story connection nodes */}
						<div className="relative">
							{/* Central hub */}
							<motion.div 
								className="w-4 h-4 bg-gradient-to-r from-brand to-brand-dark rounded-full shadow-lg shadow-brand/50 relative z-10"
								animate={{ 
									scale: [1, 1.3, 1],
									boxShadow: [
										"0 0 20px rgba(6, 182, 212, 0.5)",
										"0 0 40px rgba(6, 182, 212, 0.8)",
										"0 0 20px rgba(6, 182, 212, 0.5)"
									]
								}}
								transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
							/>
							
							{/* Connection lines spreading outward */}
							{[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
								<motion.div
									key={angle}
									className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-gradient-to-r from-brand to-transparent"
									style={{
										transformOrigin: '0 50%',
										transform: `translate(-50%, -50%) rotate(${angle}deg)`
									}}
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ 
										duration: 0.8, 
										delay: 0.4 + index * 0.08,
										ease: "easeOut"
									}}
								/>
							))}
						</div>
					</motion.div>

					{/* Story essence particles - representing ideas flowing */}
					<div className="absolute inset-0 pointer-events-none">
						{[...Array(12)].map((_, i) => {
							const angle = (i * 30) * (Math.PI / 180);
							const radius = 60 + Math.sin(i) * 20;
							const x = Math.cos(angle) * radius;
							const y = Math.sin(angle) * radius;
							
							return (
								<motion.div
									key={i}
									className="absolute w-1 h-1 bg-brand/40 rounded-full"
									style={{
										left: `calc(50% + ${x}px)`,
										top: `calc(50% + ${y}px)`
									}}
									animate={{
										scale: [0, 1, 0],
										opacity: [0, 0.8, 0],
										rotate: [0, 360]
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
										delay: i * 0.2
									}}
								/>
							);
						})}
					</div>
				</motion.div>
			)}

			<section
				id={id}
				ref={sectionRef}
				className={`relative min-h-screen w-full flex ${alignTop ? 'items-start justify-start' : 'items-center justify-center'} overflow-hidden ${alignTop ? 'pt-6 sm:pt-10' : 'pt-10 sm:pt-16'}`}
			>
				{/* Enhanced Background Story Elements */}
				<div className="absolute inset-0 pointer-events-none">
					{/* Floating particles with enhanced animations */}
					<motion.div 
						className="absolute top-1/4 left-1/4 w-3 h-3 bg-brand/40 rounded-full shadow-lg shadow-brand/20"
						animate={{
							y: [0, -30, 0],
							x: [0, 10, 0],
							opacity: [0.3, 0.8, 0.3],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
					<motion.div 
						className="absolute top-3/4 right-1/4 w-2 h-2 bg-brand/30 rounded-full shadow-lg shadow-brand/20"
						animate={{
							y: [0, 20, 0],
							x: [0, -15, 0],
							opacity: [0.2, 0.7, 0.2],
							scale: [1, 1.3, 1],
						}}
						transition={{
							duration: 5,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 1
						}}
					/>
					<motion.div 
						className="absolute top-1/2 left-1/3 w-1 h-1 bg-brand/20 rounded-full"
						animate={{
							y: [0, -25, 0],
							opacity: [0.1, 0.5, 0.1],
							scale: [1, 1.5, 1],
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2
						}}
					/>
					
					{/* New: Animated geometric patterns */}
					<motion.div 
						className="absolute top-0 right-0 w-32 h-32 opacity-10"
						animate={{ rotate: 360 }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<div className="w-full h-full border border-brand/20 rounded-full" />
					</motion.div>
					
					<motion.div 
						className="absolute bottom-0 left-0 w-24 h-24 opacity-10"
						animate={{ rotate: -360 }}
						transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
					>
						<div className="w-full h-full border border-brand/20 rounded-full" />
					</motion.div>
				</div>

				{/* Main Content with Enhanced Storytelling Animations */}
				<motion.div 
					className="container-lg relative z-10"
					variants={entranceAnimation}
					initial="hidden"
					animate={isVisible ? "visible" : "hidden"}
					transition={{ 
						duration: 0.8, 
						ease: [0.25, 0.46, 0.45, 0.94],
						delay: 0.05
					}}
					style={{
						opacity: fadeIn,
						y: slideUp,
						scale: scale,
						rotateY: rotateY
					}}
				>
					{/* Enhanced Chapter Header with Better Spacing */}
					<motion.div 
						className="text-center mb-12 sm:mb-20"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<motion.div 
							className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand/20 to-brand-dark/20 border border-brand/30 rounded-full text-brand text-base sm:text-lg font-semibold mb-6 sm:mb-8 backdrop-blur-sm shadow-lg relative overflow-hidden"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.4, delay: 0.1 }}
						>
							{/* Animated background shimmer */}
							<motion.div 
								className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/10 to-transparent"
								animate={{ x: [-80, 80] }}
								transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
							/>
							<span className="relative z-10">Chapter {chapter}</span>
						</motion.div>

						{/* Enhanced decorative line with animated elements */}
						<motion.div 
							className="relative"
							initial={{ opacity: 0 }}
							animate={{ opacity: isVisible ? 1 : 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<motion.div 
								className="w-40 h-1 bg-gradient-to-r from-transparent via-brand to-transparent mx-auto"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: isVisible ? 1 : 0 }}
								transition={{ duration: 0.6, delay: 0.25 }}
							/>
							<motion.div 
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand rounded-full shadow-lg shadow-brand/30"
								initial={{ scale: 0 }}
								animate={{ scale: isVisible ? 1 : 0 }}
								transition={{ duration: 0.4, delay: 0.3 }}
							>
								{/* Pulsing ring effect */}
								<motion.div 
									className="absolute inset-0 w-full h-full border-2 border-brand/30 rounded-full"
									animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
									transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
								/>
							</motion.div>
						</motion.div>
					</motion.div>

					{children}
				</motion.div>

				{/* Enhanced Story Navigation Hints */}
				<motion.div 
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/50 text-sm"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: progress > 0.7 ? 1 : 0, y: progress > 0.7 ? 0 : 20 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div 
						className="flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
						animate={{ y: [0, -8, 0] }}
						transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
					>
						<span className="font-medium">Scroll to continue the story</span>
						<motion.svg 
							className="w-4 h-4 text-brand" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
							animate={{ y: [0, 2, 0] }}
							transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</motion.svg>
					</motion.div>
				</motion.div>

				{/* Enhanced section transition indicator */}
				<motion.div 
					className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: progress > 0.9 ? 1 : 0 }}
					transition={{ duration: 0.5 }}
					style={{ transformOrigin: "left" }}
				/>
			</section>
		</>
	)
}