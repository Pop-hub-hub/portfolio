import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  img?: string;
  tools?: string[];
  github?: string;
  live?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  currentFilter: string = 'all';
  
  projects: Project[] = [
    {
      id: 1,
      img: 'readnest.png',
      title: 'Readnest Library',
      description: 'Developed a digital library platform that enables users to browse, purchase, and download books, with an admin dashboard for managing content. The platform includes authentication with role-based access, a shopping cart and wishlist, PDF invoice generation, and a responsive, user-friendly interface.',
      category: 'mean',
      github: 'https://github.com/Pop-hub-hub/library-meanStack',
      tools: ['Angular 19' , 'SCSS' , 'Tailwind CSS' , 'RxJS' ,'Angular Material'
        , 'Nodejs' , 'Express' , 'MongoDB' , 'mongoose' , 'JWT' ,'Puppeteer','Nodemailer','Multer' , 'bycript' , 'archive-zip'
      ]
    },
    
    {
      id: 2,
      img: 'c.helel.png',
      title: 'C.HELAL Academy',
      description: 'Developed a website for C.HELAL Swimming Academy featuring a clean and structured design with sections for About, Training Programs, Achievements, and Contact. The site allows visitors to explore available programs and reach out directly through an integrated contact form. Focused on delivering a clear user interface, smooth navigation, and well-organized content that reflects the academy’s professional identity in sports training.',
      category: 'frontend',
      github: 'https://github.com/Pop-hub-hub/c.helal',
      live: 'https://pop-hub-hub.github.io/c.helal/',
      tools: ['Html', 'Css', 'Javascript']
    },
    {
      id: 3,
      img: 'ecommerce.png',
      title: 'E-Commerce App',
      description: 'Built a full-stack platform with secure authentication, role-based access, and dynamic order management integrated with an admin panel. Implemented file uploads, email notifications, and API protection on the backend, while delivering a responsive, multilingual frontend with interactive product displays and smooth user experience.',
      category: 'mean',
      github: 'https://github.com/Pop-hub-hub/ecommerce-mean-stack',
      tools: ['Angular 19' , 'SCSS' , 'Tailwind CSS' , 'RxJS' ,'Angular Material', 'Swiper','Bootstrap', 'Custom UI components','SSR'
        ,'Nodejs' , 'Express' , 'MongoDB' , 'mongoose' , 'JWT' ,'Puppeteer','Nodemailer','Multer' , 'bycript','Helmet','Compression', 'Dotenv','CORS'
      ]},
    {
      id: 4,
      img: 'chess.png',
      title: 'Chess Game',
      description: 'Built a web-based Chess game incorporating AI opponents with multiple difficulty levels. Users can play Player vs Player or Player vs AI, track move history and captured pieces, choose pawn promotion, and enjoy a responsive and interactive game experience."',
      category: 'frontend',
      github: 'https://github.com/Pop-hub-hub/Chess-Game',
      live: 'https://pop-hub-hub.github.io/Chess-Game/',
      tools: ['javascript', 'html5', 'css3']
    },
    {
      id: 5,
      img: 'web edit.jpeg',
      title: 'Web Edit',
      description: 'Developed a web-based Image Editor allowing users to upload an image and apply filters such as saturation, contrast, brightness, sepia, grayscale, blur, and hue-rotate. Users can download the edited image or reset modifications. Built with a responsive and intuitive UI for seamless image manipulation.',
      category: 'frontend',
      github: 'https://github.com/Pop-hub-hub/edit-image',
      live: 'https://pop-hub-hub.github.io/edit-image/',
      tools: ['javascript', 'html5', 'css3']
    },
    {
      id: 6,
      img: 'web notes.jpeg',
      title: 'Web Notes',
      description: 'Built a web-based Notes app that lets users add and view notes with a title and description. The interface is simple and user-friendly, enabling straightforward note-taking. Includes developer attribution and clean UI layout.',
      category: 'frontend',
      github: 'https://github.com/Pop-hub-hub/notes',
      live: 'https://pop-hub-hub.github.io/notes/',
      tools: ['html5', 'css3','javascript']
    },
      {
      id: 7,
      img: 'recipe.png',
      title: 'Recipes web',
      description: 'Developed an interactive and visually appealing food recipes website using React. The platform showcases a wide variety of meals with detailed ingredient lists and step-by-step cooking videos. Focused on providing users with an engaging browsing experience through dynamic components, smooth navigation, and a clean SCSS-based design that highlights both functionality and aesthetics.',
      category: 'frontend',
      live: 'https://as-sass.vercel.app/',
      tools: ['React', 'html5', 'scss', 'Javascript']
    }

  ];

  get filteredProjects(): Project[] {
    if (this.currentFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.currentFilter);
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }
  
  getToolIconClass(tool: string): string {
    const toolLower = tool.toLowerCase();
    
    // Frontend tools
    if (toolLower.includes('angular')) return 'fab fa-angular';
    if (toolLower.includes('react')) return 'fab fa-react';
    if (toolLower.includes('vue')) return 'fab fa-vuejs';
    if (toolLower.includes('html')) return 'fab fa-html5';
    if (toolLower.includes('css')) return 'fab fa-css3-alt';
    if (toolLower.includes('javascript')) return 'fab fa-js';
    if (toolLower.includes('typescript')) return 'fab fa-microsoft';
    
    // Backend tools
    if (toolLower.includes('node')) return 'fab fa-node-js';
    if (toolLower.includes('express')) return 'fas fa-bolt';
    if (toolLower.includes('mongodb')) return 'fas fa-database';
    if (toolLower.includes('mysql')) return 'fas fa-database';
    if (toolLower.includes('postgresql')) return 'fas fa-database';
    if (toolLower.includes('mongoose')) return 'fas fa-database';
    
    // Other tools
    if (toolLower.includes('github')) return 'fab fa-github';
    if (toolLower.includes('git')) return 'fab fa-git-alt';
    if (toolLower.includes('npm')) return 'fab fa-npm';
    if (toolLower.includes('webpack')) return 'fab fa-webpack';
    if (toolLower.includes('sass') || toolLower.includes('scss')) return 'fab fa-sass';
    if (toolLower.includes('bootstrap')) return 'fab fa-bootstrap';
    if (toolLower.includes('tailwind')) return 'fas fa-wind';
    if (toolLower.includes('rxjs')) return 'fas fa-wave-square';
    if (toolLower.includes('material')) return 'fas fa-boxes';
    if (toolLower.includes('puppeteer')) return 'fab fa-chrome';
    if (toolLower.includes('nodemailer')) return 'fas fa-envelope';
    if (toolLower.includes('multer')) return 'fas fa-upload';
    if (toolLower.includes('bcrypt') || toolLower.includes('bycript')) return 'fas fa-lock';
    if (toolLower.includes('jwt')) return 'fas fa-shield-alt';
    if (toolLower.includes('helmet')) return 'fas fa-helmet-safety';
    if (toolLower.includes('compression')) return 'fas fa-compress';
    if (toolLower.includes('dotenv')) return 'fas fa-cog';
    if (toolLower.includes('cors')) return 'fas fa-exchange-alt';
    if (toolLower.includes('swiper')) return 'fas fa-images';
    
    // Default icon
    return 'fas fa-code';
  }
}