import os

files = [
    '/Users/macbookm1/zill-landing/src/app/privacy/page.tsx',
    '/Users/macbookm1/zill-landing/src/app/terms/page.tsx'
]

old_link_pattern = """          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#8b8ba7] hover:text-[#111111] dark:text-white mb-12 transition-colors">
            <Image src="/arrow-left.svg" alt="Back" width={16} height={16} className="w-4 h-4" /> Back to Home
          </Link>"""

new_link = """          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#666666] dark:text-[#666666] hover:text-[#111111] dark:hover:text-[#FFFFFF] mb-12 transition-colors group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#666666] dark:text-[#666666] group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF] transition-colors">
              <path d="M17.9998 12V14.67C17.9998 17.98 15.6498 19.34 12.7798 17.68L10.4698 16.34L8.15982 15C5.28982 13.34 5.28982 10.63 8.15982 8.96999L10.4698 7.62999L12.7798 6.28999C15.6498 4.65999 17.9998 6.00999 17.9998 9.32999V12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>"""

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
            
        content = content.replace(old_link_pattern, new_link)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
