import os

files_to_update = {
    '/Users/macbookm1/zill-landing/src/components/sections/FAQ.tsx': [
        (
            'className="py-24 md:py-32 bg-[#F9F9F9] dark:bg-[#000000] relative z-10"',
            'className="py-24 md:py-32 bg-[#F9F9F9] dark:bg-[#000000] relative z-10 transition-colors duration-500 ease-in-out"'
        ),
        ('transition-colors duration-400', 'transition-colors duration-500 ease-in-out')
    ],
    '/Users/macbookm1/zill-landing/src/components/sections/FinalCTA.tsx': [
        (
            'className="section-padding bg-white dark:bg-[#000000]"',
            'className="section-padding bg-white dark:bg-[#000000] transition-colors duration-500 ease-in-out"'
        )
    ],
    '/Users/macbookm1/zill-landing/src/components/sections/Features.tsx': [
        (
            'className="py-24 md:py-32 bg-[#F8F9FA] dark:bg-[#000000] relative z-10"',
            'className="py-24 md:py-32 bg-[#F8F9FA] dark:bg-[#000000] relative z-10 transition-colors duration-500 ease-in-out"'
        )
    ],
    '/Users/macbookm1/zill-landing/src/components/sections/CreditTrail.tsx': [
        (
            'className="py-24 md:py-32 bg-[#FFFFFF] dark:bg-[#000000] relative z-10 overflow-hidden"',
            'className="py-24 md:py-32 bg-[#FFFFFF] dark:bg-[#000000] relative z-10 overflow-hidden transition-colors duration-500 ease-in-out"'
        )
    ],
    '/Users/macbookm1/zill-landing/src/components/ui/StepCard.tsx': [
        (
            'transition-colors duration-300',
            'transition-colors duration-500 ease-in-out'
        )
    ]
}

for filepath, replacements in files_to_update.items():
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    for old_str, new_str in replacements:
        content = content.replace(old_str, new_str)
        
    with open(filepath, 'w') as f:
        f.write(content)
        
    print(f"Updated {filepath}")
