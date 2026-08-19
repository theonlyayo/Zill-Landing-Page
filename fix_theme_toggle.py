import os

filepath = '/Users/macbookm1/zill-landing/src/components/ui/ThemeToggle.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_hook = 'const { theme, setTheme } = useTheme()'
new_hook = 'const { theme, resolvedTheme, setTheme } = useTheme()'

old_return = 'return (\n    <button\n      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}\n      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-[#292D32] dark:text-[#FFFFFF]"\n      aria-label="Toggle theme"\n    >\n      {theme === "dark" ? ('
new_return = 'const currentTheme = theme === "system" ? resolvedTheme : theme;\n\n  return (\n    <button\n      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}\n      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-[#292D32] dark:text-[#FFFFFF]"\n      aria-label="Toggle theme"\n    >\n      {currentTheme === "dark" ? ('

content = content.replace(old_hook, new_hook)
content = content.replace(old_return, new_return)

with open(filepath, 'w') as f:
    f.write(content)
print(f"Updated {filepath}")
