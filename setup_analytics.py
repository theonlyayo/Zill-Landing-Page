import os

filepath = '/Users/macbookm1/zill-landing/src/app/layout.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add import
old_import = 'import { ThemeProvider } from "@/components/ui/ThemeProvider";\nimport "./globals.css";'
new_import = 'import { ThemeProvider } from "@/components/ui/ThemeProvider";\nimport { Analytics } from "@vercel/analytics/react";\nimport "./globals.css";'

content = content.replace(old_import, new_import)

# Add component
old_body = """        </ThemeProvider>
      </body>"""
new_body = """        </ThemeProvider>
        <Analytics />
      </body>"""

content = content.replace(old_body, new_body)

with open(filepath, 'w') as f:
    f.write(content)
print(f"Updated {filepath}")
