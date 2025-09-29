#!/usr/bin/env node

/*
 * LTspice Projects Showcase - Build Script
 * Minifies CSS/JS, generates sitemap, and prepares for production
 */

const fs = require('fs').promises;
const path = require('path');

class Builder {
    constructor() {
        this.projectsData = null;
        this.buildDir = path.join(__dirname, 'dist');
        this.sourceDir = __dirname;
    }

    async build() {
        console.log('🔨 Building LTspice Projects Showcase...');
        
        try {
            await this.createBuildDirectory();
            await this.loadProjectsData();
            await this.copyStaticFiles();
            await this.minifyCSS();
            await this.minifyJS();
            await this.generateSitemap();
            await this.copyHTMLFiles();
            
            console.log('✅ Build completed successfully!');
            console.log(`📦 Production files ready in: ${this.buildDir}`);
        } catch (error) {
            console.error('❌ Build failed:', error.message);
            process.exit(1);
        }
    }

    async createBuildDirectory() {
        try {
            await fs.access(this.buildDir);
            await fs.rmdir(this.buildDir, { recursive: true });
        } catch (error) {
            // Directory doesn't exist, that's fine
        }
        
        await fs.mkdir(this.buildDir, { recursive: true });
        await fs.mkdir(path.join(this.buildDir, 'assets'), { recursive: true });
        await fs.mkdir(path.join(this.buildDir, 'assets', 'css'), { recursive: true });
        await fs.mkdir(path.join(this.buildDir, 'assets', 'js'), { recursive: true });
        await fs.mkdir(path.join(this.buildDir, 'projects'), { recursive: true });
    }

    async loadProjectsData() {
        try {
            const projectsFile = await fs.readFile(path.join(this.sourceDir, 'projects.json'), 'utf8');
            this.projectsData = JSON.parse(projectsFile);
        } catch (error) {
            console.warn('⚠️  No projects.json found, using empty projects array');
            this.projectsData = { projects: [] };
        }
    }

    async copyStaticFiles() {
        const staticFiles = [
            'projects.json',
            'robots.txt'
        ];

        for (const file of staticFiles) {
            try {
                await fs.copyFile(
                    path.join(this.sourceDir, file),
                    path.join(this.buildDir, file)
                );
            } catch (error) {
                console.warn(`⚠️  Could not copy ${file}: ${error.message}`);
            }
        }

        // Copy projects folder if it exists
        try {
            await this.copyDirectory(
                path.join(this.sourceDir, 'projects'),
                path.join(this.buildDir, 'projects')
            );
        } catch (error) {
            console.warn('⚠️  Projects directory not found or could not be copied');
        }
    }

    async copyDirectory(src, dest) {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await this.copyDirectory(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    }

    async minifyCSS() {
        const cssPath = path.join(this.sourceDir, 'assets', 'css', 'style.css');
        const outputPath = path.join(this.buildDir, 'assets', 'css', 'style.css');
        
        try {
            let css = await fs.readFile(cssPath, 'utf8');
            
            // Basic CSS minification
            css = css
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                .replace(/\s+/g, ' ') // Compress whitespace
                .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
                .replace(/\s*{\s*/g, '{') // Remove spaces around braces
                .replace(/;\s*/g, ';') // Remove spaces after semicolons
                .replace(/,\s*/g, ',') // Remove spaces after commas
                .trim();
            
            await fs.writeFile(outputPath, css);
            console.log('✅ CSS minified');
        } catch (error) {
            console.error('❌ CSS minification failed:', error.message);
            throw error;
        }
    }

    async minifyJS() {
        const jsPath = path.join(this.sourceDir, 'assets', 'js', 'main.js');
        const outputPath = path.join(this.buildDir, 'assets', 'js', 'main.js');
        
        try {
            let js = await fs.readFile(jsPath, 'utf8');
            
            // Basic JS minification (for production, consider using a proper minifier like Terser)
            js = js
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                .replace(/\/\/.*$/gm, '') // Remove line comments
                .replace(/\s+/g, ' ') // Compress whitespace
                .replace(/;\s*}/g, '}') // Clean up before closing braces
                .trim();
            
            await fs.writeFile(outputPath, js);
            console.log('✅ JavaScript minified');
        } catch (error) {
            console.error('❌ JavaScript minification failed:', error.message);
            throw error;
        }
    }

    async generateSitemap() {
        const sitemapPath = path.join(this.buildDir, 'sitemap.xml');
        const baseUrl = 'https://yourdomain.com';
        const now = new Date().toISOString().split('T')[0];
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects.html</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about.html</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact.html</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;

        // Project detail pages removed - projects are now view-only cards

        sitemap += '\n</urlset>';
        
        await fs.writeFile(sitemapPath, sitemap);
        console.log('✅ Sitemap generated with project URLs');
    }

    async copyHTMLFiles() {
        const htmlFiles = [
            'index.html',
            'projects.html',
            'about.html',
            'contact.html'
        ];

        for (const file of htmlFiles) {
            try {
                let html = await fs.readFile(path.join(this.sourceDir, file), 'utf8');
                
                // Basic HTML minification
                html = html
                    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
                    .replace(/\s+/g, ' ') // Compress whitespace
                    .replace(/>\s+</g, '><') // Remove whitespace between tags
                    .trim();
                
                await fs.writeFile(path.join(this.buildDir, file), html);
            } catch (error) {
                console.warn(`⚠️  Could not copy ${file}: ${error.message}`);
            }
        }
        
        console.log('✅ HTML files copied and minified');
    }
}

// Run the build if this file is executed directly
if (require.main === module) {
    const builder = new Builder();
    builder.build();
}

module.exports = Builder;
