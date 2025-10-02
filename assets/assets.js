import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import name from './name.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import ontario_public_service_leadership_logo from './ontario_public_service_leadership_logo.jpeg';
import hello from './hello.gif';
import wow from './wow.gif';
import sticker from './sticker.png';
import peel from './peel_me.gif';
import programming_languages from './programming_language.png';
import database from './database.png';
import operating_system from './operating_system.png';
import tools from './tools.png';
import container_bg from './container_bg.png';
import active_indicator from './active_indicator.png';
import inactive_indicator from './inactive_indicator.png';
import github from './github.png';
import pythonAnywhere from './pythonAnywhere.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    name,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    ontario_public_service_leadership_logo,
    hello,
    wow,
    sticker,
    peel,
    programming_languages,
    database,
    operating_system,
    tools,
    container_bg,
    active_indicator,
    inactive_indicator,
    github,
    pythonAnywhere,
};

export const projectData = [
    {
        title: 'Biodiversity Solutions Website',
        description: ['An open-source website for biodiversity project management. Explore categorized projects now; sign in to contribute, update, and deploy new solutions.', 'Technologies used: Node.js, JavaScript, TailwindCSS, HTML, CSS, PostgreSQL, MongoDB, Vercel.'],
        id: 1,
        bgImage: '/BioDivers.JPG',
        link: 'https://github.com/klvuongg/Biodiversity-Solutions-App.git',
        deployLink: 'https://biodiversity-solutions-app.vercel.app/',
    },
    {
        title: 'Web Blog',
        id: 2,
        description: ['A full-stack web blog application where users can create, read, update, and delete blog posts.', 'Technologies used: Django, Python, CSS, Django Admin, PythonAnywhere.'],
        bgImage: '/WebBlog.JPG',
        link: 'https://github.com/klvuongg/Web-Blog.git',
        deployLink: 'https://klvuong.pythonanywhere.com/',
    },
    {
        title: 'Portfolio Website',
        description: ['My interactive digital portfolio. Explore my skills and work through engaging, hands-on demos and creatively designed, cute presentation.', 'Technologies used: React, Next.js, JavaScript, TailwindCSS, Vercel.'],
        id: 3,
        bgImage: '/Portfolio.JPG',
        link: 'https://github.com/klvuongg/Portfolio.git',
    },
    {
        title: 'RPG Game',
        description: ['A role-playing game with quests, monster fights, and rewards with an interactive UI screen.', 'Technologies used: C#, Object-Oriented Programming, Windows Presentation Foundation (WPF).'],
        id: 4,
        bgImage: '/RPGGame.JPG',
        link: 'https://github.com/klvuongg/RPG-Game.git',
    },
    {
        title: 'Assembly Line System',
        description: ['A sequential assembly line system that tracks furniture inventory, generates unique serial numbers, and processes customer orders based on a defined production flow.', 'Technologies used: C++, Object-Oriented Programming, File Handling.'],
        id: 5,
        bgImage: '/AssemblyLine.JPG',
        link: 'https://github.com/klvuongg/Assembly-Line-System.git',
    },
    {
        title: 'Library Application',
        description: ['A simple application replicating a library system, allowing users to add, remove, checkout, and return books.', 'Technologies used: C, Object-Oriented Programming, File Handling.'],
        id: 6,
        bgImage: '/LibApp.JPG',
        link: 'https://github.com/klvuongg/Library-Application.git',
    },
    {
        title: 'BiteByte App',
        description: ['BiteByte: A successful hackathon collaboration delivering an accessible, AI-powered app. We teamed up to simplify blood sugar and meal tracking for the elderly through easy photo logging and automated insights.', 'Technologies used: Figma, React Native, GitHub'],
        id: 7,
        bgImage: '/BiteByte.JPG',
        link: 'https://github.com/klvuongg/BiteByte.git',
    },
]

export const infoList = [
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: ['Computer Programming and Analysis', 'Seneca Polytechnic', 'Expected Graduation: 2027', 'GPA: 4.0'] },
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Skills', description: ['Full Stack Development', 'Web Development', 'Object Oriented Programming', 'Software Testing', 'Database Management'] },
]

export const toolsData = [
    { icon: assets.programming_languages, title: 'Languages, Frameworks and Libraries', description: ['C', 'C++', 'C#', 'Python', 'JavaScript', 'Java', 'HTML', 'CSS', 'XAML', 'React', 'Django', 'Node.js', 'Express.js', 'Spring Boot', 'Windows Presentation Foundation (WPF)', 'Bootstrap', 'Tailwind CSS'] },
    { icon: assets.database, title: 'Databases', description: ['Oracle SQL', 'MongoDB', 'PostgreSQL' ] },
    { icon: assets.operating_system, title: 'Operating System', description: ['Linux', 'Windows', 'Bash', 'PowerShell'] },
    { icon: assets.tools, title: 'Other Tools', description: ['Jira', 'Visual Studio (2022)', 'Visual Studio Code', 'GitHub', 'TortoiseGit', 'PythonAnywhere', 'Vercel', 'Visual Paradigm', 'Figma', 'Canva']},
];