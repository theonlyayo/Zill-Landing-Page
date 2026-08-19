from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000')
        page.evaluate("document.documentElement.classList.add('dark')")
        page.wait_for_timeout(2000)
        page.screenshot(path='screenshot.png')
        
        # Also print out the height of Navbar and the gap
        navbar = page.locator('nav').bounding_box()
        hero = page.locator('section').first.bounding_box()
        main = page.locator('main').bounding_box()
        
        print("Navbar:", navbar)
        print("Hero:", hero)
        print("Main:", main)
        
        browser.close()

run()
