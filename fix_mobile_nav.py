import os

filepath = '/Users/macbookm1/zill-landing/src/components/ui/Navbar.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_hamburger = """          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >"""

new_hamburger = """          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button 
              className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >"""

old_hamburger_end = """              className="w-6 h-0.5 bg-brand-dark dark:bg-white block rounded-full origin-center"
            />
          </button>"""

new_hamburger_end = """              className="w-6 h-0.5 bg-brand-dark dark:bg-white block rounded-full origin-center"
            />
            </button>
          </div>"""

# Replace start of hamburger
content = content.replace(old_hamburger, new_hamburger)
# Replace end of hamburger
content = content.replace(old_hamburger_end, new_hamburger_end)

with open(filepath, 'w') as f:
    f.write(content)
print(f"Updated {filepath}")
