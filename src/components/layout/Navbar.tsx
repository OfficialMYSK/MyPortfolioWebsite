import { ArrowDown } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 flex items-center justify-between">
      <div className="w-12 h-12 rounded-full bio-glass flex items-center justify-center font-heading italic text-xl">
        C
      </div>

      <div className="hidden md:flex items-center gap-8 bio-glass rounded-full px-8 py-3 mx-auto">
        <a href="#home" className="text-sm font-medium text-foreground/90 hover:text-white transition-colors">Home</a>
        <a href="#about" className="text-sm font-medium text-foreground/90 hover:text-white transition-colors">About Me</a>
        <a href="#projects" className="text-sm font-medium text-foreground/90 hover:text-white transition-colors">Projects</a>
        <a href="#tech" className="text-sm font-medium text-foreground/90 hover:text-white transition-colors">Creative Tech</a>
        <a href="#contact" className="text-sm font-medium text-foreground/90 hover:text-white transition-colors">Contact</a>
      </div>

      <button className="flex items-center gap-2 bg-primary/20 text-white border border-primary/50 shadow-[0_0_15px_rgba(0,255,255,0.4)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/30 transition-all">
        Explore <ArrowDown className="w-4 h-4" />
      </button>
    </nav>
  )
}
