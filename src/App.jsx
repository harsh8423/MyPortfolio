import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Hero } from './sections/Hero.jsx'
import { AboutMe } from './sections/AboutMe.jsx'
import { Services } from './sections/Services.jsx'
import { Projects } from './sections/Projects.jsx'
import { Testimonials } from './sections/Testimonials.jsx'
import { Skills } from './sections/Skills.jsx'
import { Education } from './sections/Education.jsx'
import { Contact } from './sections/Contact.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
// import { ScrollLaptopScene } from './three/ScrollLaptopScene.jsx'
import { StorySection } from './components/StorySection.jsx'
import { CustomCursor } from './components/CustomCursor.jsx'

export default function App() {
	const scrollY = useRef(0)
	const [vh, setVh] = useState(0)

	// useEffect(() => {
	// 	function onScroll() {
	// 		scrollY.current = window.scrollY
	// 	}
	// 	function onResize() {
	// 		setVh(window.innerHeight)
	// 	}
	// 	onResize()
	// 	window.addEventListener('scroll', onScroll, { passive: true })
	// 	window.addEventListener('resize', onResize)
	// 	return () => {
	// 		window.removeEventListener('scroll', onScroll)
	// 		window.removeEventListener('resize', onResize)
	// 	}
	// }, [])

	return (
		<div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
			<CustomCursor />
			<Navbar />
			<main className="flex-1">
				{/* Chapter 0: The Hero - 3D Laptop Story */}
				<section className="relative h-[200vh] w-full">
					<div className="sticky top-0 h-screen w-full">
						{/* <Canvas camera={{ position: [0, 0.2, 4], fov: 50 }}>
							<ambientLight intensity={0.8} />
							<directionalLight position={[2, 3, 4]} intensity={1.2} />
							<Suspense fallback={null}>
								<ScrollLaptopScene scrollY={scrollY} viewportHeight={vh || 1} />
							</Suspense>
						</Canvas> */}
						<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),rgba(0,0,0,0))]" />
						<div className="absolute left-0 right-0 bottom-0 top-16 lg:top-20">
							<Hero />
						</div>
					</div>
				</section>

				{/* Chapter 2: The Spark - About Me Story */}
				<StorySection id="about" chapter={1} totalChapters={7} alignTop>
					<AboutMe />
				</StorySection>

				{/* Chapter 3: The Services - What I Offer */}
				<StorySection id="services" chapter={2} totalChapters={7}>
					<Services />
				</StorySection>

				{/* Chapter 4: The Skills - My Expertise */}
				<StorySection id="skills" chapter={3} totalChapters={7}>
					<Skills />
				</StorySection>

				{/* Chapter 5: The Projects - My Journey */}
				<StorySection id="projects" chapter={4} totalChapters={7}>
					<Projects />
				</StorySection>

				{/* Chapter 6: The Education - My Foundation */}
				<StorySection id="education" chapter={5} totalChapters={7}>
					<Education />
				</StorySection>

				{/* Chapter 7: The Testimonials - Client Stories */}
				<StorySection id="testimonials" chapter={6} totalChapters={7}>
					<Testimonials />
				</StorySection>

				{/* Chapter 8: The Contact - Let's Connect */}
				<StorySection id="contact" chapter={7} totalChapters={7}>
					<Contact />
				</StorySection>
			</main>
			<Footer />
		</div>
	)
}

