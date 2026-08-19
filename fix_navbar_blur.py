import os

def replace_in_file(filepath, old_text, new_text):
    with open(filepath, 'r') as f:
        content = f.read()
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Text not found in {filepath}")

replace_in_file('src/components/ui/Navbar.tsx', 'backdrop-blur-md transition-colors', 'backdrop-blur-md dark:backdrop-blur-none transition-colors')

print("Done")
