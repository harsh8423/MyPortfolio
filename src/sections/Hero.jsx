import { motion } from 'framer-motion'
import GoldenVisitingCard from '../components/GoldenVisitingCard.jsx'

export function Hero() {
	return (
		<div id="home" className="h-full flex flex-col lg:flex-row items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-x-hidden pt-16 lg:pt-0">
			{/* Text Content - Shifted more towards center-right */}
			<div className="w-full lg:w-3/5 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left lg:ml-8 mt-8 lg:mt-0">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-tight"
				>
					Build standout products with Generative AI & Full‑Stack Craft
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
					className="mt-4 text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
				>
					I help startups and teams ship fast: AI features, modern web apps, and reliable systems. Available for select freelance engagements.
				</motion.p>
				<motion.div 
					className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<a href="#projects" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-brand text-black font-medium hover:bg-brand-dark transition-colors duration-300 text-sm sm:text-base">
						View work
					</a>
					<a href="#contact" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-md border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm sm:text-base">
						Get in touch
					</a>
				</motion.div>
			</div>
			
			{/* Golden Visiting Card - Right side with enhanced positioning */}
			<div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
				<motion.div
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="relative scale-40 sm:scale-75 md:scale-100"
				>
					<GoldenVisitingCard />
				</motion.div>
			</div>
		</div>
	)
}

