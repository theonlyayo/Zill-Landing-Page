import os

# 1. Navbar.tsx
navbar_path = "src/components/ui/Navbar.tsx"
with open(navbar_path, "r") as f:
    navbar_content = f.read()

# Make navbar black and remove white line
navbar_content = navbar_content.replace(
    'bg-white/80 dark:bg-[#000000]/50 backdrop-blur-md border-b border-transparent dark:border-white/5 transition-colors duration-500 ease-in-out',
    'bg-white/80 dark:bg-[#000000] backdrop-blur-md border-b border-transparent transition-colors duration-500 ease-in-out'
)

with open(navbar_path, "w") as f:
    f.write(navbar_content)

# 2. WaitlistForm.tsx
waitlist_path = "src/components/ui/WaitlistForm.tsx"
with open(waitlist_path, "r") as f:
    waitlist_content = f.read()

# Icon color
waitlist_content = waitlist_content.replace(
    'flex-shrink-0 text-[#8b8ba7]',
    'flex-shrink-0 text-[#666666]'
)

# Input placeholder color
waitlist_content = waitlist_content.replace(
    '${dark ? "text-white placeholder:text-white/40" : "text-[#111111] dark:text-white placeholder:text-[#8b8ba7]"}',
    '${dark ? "text-white placeholder:text-[#666666]" : "text-[#111111] dark:text-white placeholder:text-[#666666]"}'
)

with open(waitlist_path, "w") as f:
    f.write(waitlist_content)

print("Applied fixes.")
