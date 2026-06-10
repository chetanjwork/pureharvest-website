/* eslint-disable */
const fs = require('fs');
const path = require('path');

const mappings = {
    'Navbar': 'global/Navbar',
    'Footer': 'global/Footer',
    'WhatsAppFloat': 'global/WhatsAppFloat',
    'Hero': 'sections/Hero',
    'Process': 'sections/Process',
    'Industries': 'sections/Industries',
    'Showcase': 'sections/Showcase',
    'Portfolio': 'sections/Portfolio',
    'Purification': 'sections/Purification',
    'FoundersNote': 'sections/FoundersNote',
    'Services': 'sections/Services',
    'Transformation': 'sections/Transformation',
    'TrustPillars': 'sections/TrustPillars',
    'FAQ': 'sections/FAQ',
    'InteractiveConfigurator': 'features/InteractiveConfigurator',
    'EnterpriseOnboarding': 'features/EnterpriseOnboarding',
    'LiveInquiry': 'features/LiveInquiry',
    'Contact': 'features/Contact',
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const [component, newPath] of Object.entries(mappings)) {
        // match: import Navbar from '@/components/layout/Navbar'
        // match: const Navbar = dynamic(() => import('@/components/layout/Navbar'))
        const regex1 = new RegExp(`@/components/layout/${component}`, 'g');
        content = content.replace(regex1, `@/components/${newPath}`);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated imports in ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

walk('./src');
