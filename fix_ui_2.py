waitlist_path = "src/components/ui/WaitlistForm.tsx"
with open(waitlist_path, "r") as f:
    waitlist_content = f.read()

# Close button icon color
waitlist_content = waitlist_content.replace(
    'text-[#8b8ba7] transition-all',
    'text-[#666666] transition-all'
)

with open(waitlist_path, "w") as f:
    f.write(waitlist_content)

print("Applied fixes 2.")
