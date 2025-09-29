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
};

export const projectData = [
    {
        title: 'Frontend project',
        description: 'Web Design',
        id: 1,
        bgImage: '/work-1.png',
    },
    {
        title: 'Geo based app',
        id: 2,
        description: 'Mobile App',
        bgImage: '/work-2.png',
    },
    {
        title: 'Photography site',
        description: 'Web Design',
        id: 3,
        bgImage: '/work-3.png',
    },
    {
        title: 'UI/UX designing',
        description: 'UI/UX Design',
        id: 4,
        bgImage: '/work-4.png',
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