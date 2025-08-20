export function Footer() {
	return (
		<footer className="border-t border-white/10 py-10 mt-20">
			<div className="container-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
				<p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
				<div className="flex items-center gap-4">
					<a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-brand">GitHub</a>
					<a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-brand">LinkedIn</a>
					<a href="mailto:you@example.com" className="hover:text-brand">Email</a>
				</div>
			</div>
		</footer>
	)
}

