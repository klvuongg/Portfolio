import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import right_arrow_white from './right-arrow-white.png';
import name from './name.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import download_icon from './download-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import right_arrow from './right-arrow.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import ontario_public_service_leadership_logo from './ontario_public_service_leadership_logo.png';
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
import hover_cursor from './hover_cursor.png';
import click_cursor from './click_cursor.png';
import peel_dark from './peel_me_dark.gif';
import name_dark from './name_dark.png';
import github_dark from './github_dark.png';
import bunny_sleeping from './bunny_sleeping.png';
import bunny_awake from './bunny_awake.png';
import database_dark from './database_dark.png';
import programming_languages_dark from './programming_language_dark.png';
import operating_system_dark from './operating_system_dark.png';
import tools_dark from './tools_dark.png';
const AssemblyLine = './AssemblyLine.png';
const BioDivers = './BioDivers.png';
const BiteByte = './BiteByte.png';
const LibApp = './LibApp.png';
const Portfolio = './Portfolio.png';
const RPGGame = './RPGGame.png';
const WebBlog = './WebBlog.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    right_arrow_white,
    name,
    mail_icon,
    mail_icon_dark,
    download_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    menu_black,
    menu_white,
    close_black,
    close_white,
    right_arrow,
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
    hover_cursor,
    click_cursor,
    peel_dark,
    name_dark,
    github_dark,
    github,
    bunny_sleeping,
    bunny_awake,
    database_dark,
    programming_languages_dark,
    operating_system_dark,
    tools_dark,
    AssemblyLine,
    BioDivers,
    BiteByte,
    LibApp,
    Portfolio,
    RPGGame,
    WebBlog,
};

export const projectData = [
    {
        title: 'Biodiversity Solutions Website',
        description: ['A full-stack, responsive web platform providing articles on biodiversity and climate solutions.', 'Technologies used: Node.js, JavaScript, TailwindCSS, HTML, CSS, PostgreSQL, MongoDB, Vercel.'],
        id: 1,
        bgImage: assets.BioDivers,
        link: 'https://github.com/klvuongg/Biodiversity-Solutions-App.git',
        deployLink: 'https://biodiversity-solutions-app.vercel.app/',
        video: '/BioDivers.mp4',
        demoDescription: [
            "- Developed a dynamic content platform focused on biodiversity and climate solutions, allowing registered users to create, edit, and delete articles, while all visitors can read the content.",
            "- Architected a full-stack application utilizing the MERN-adjacent stack (Node.js and JavaScript backend), with a modern, responsive interface styled using TailwindCSS, HTML, and CSS.",
            "- Implemented a dual-database strategy, using MongoDB for flexible content storage and PostgreSQL for managing user authentication and registration data.",
            "- Integrated robust user authentication and authorization, restricting article creation/modification functionalities exclusively to registered and logged-in users for content integrity.",
            "- Designed for seamless deployment and scalability with a clear separation between frontend and backend services.",
        ], 
    },
    {
        title: 'Web Blog',
        id: 2,
        description: ['My first full-stack blog application featuring a comprehensive CRUD (Create, Read, Update, Delete) interface for posts, with role-based access control ensuring users can manage their own content.', 'Technologies used: Django, Python, CSS, Django Admin, PythonAnywhere.'],
        bgImage: assets.WebBlog,
        link: 'https://github.com/klvuongg/Web-Blog.git',
        deployLink: 'https://klvuong.pythonanywhere.com/',
        video: '/WebBlog.mp4',
        demoDescription: [
            "- Constructed a full-stack web blog using the Django framework and Python, incorporating custom CSS for a responsive user interface.",
            "- Implemented fine-grained, role-based authorization to manage user permissions:",
            "  • Authenticated Users have a high level of control, with standard CRUD operations on their posts and the unique ability to delete any user's post (both anonymous and other authenticated users).",
            "  • Anonymous Users can perform standard CRUD operations only on their own posts and are restricted from deleting posts created by others.",
            "- Utilized Django's built-in Admin interface for seamless site administration, including managing blog posts and user accounts/permissions.",
            "- Successfully deployed the application on PythonAnywhere, providing a live, accessible platform."
        ],
    },
    {
        title: 'Portfolio Website',
        description: ['My interactive digital portfolio. Explore my skills and work through engaging, hands-on demos and creatively designed, cute presentation. (This project does not have a demo)', 'Technologies used: React, Next.js, JavaScript, TailwindCSS, Vercel.'],
        id: 3,
        bgImage: assets.Portfolio,
        link: 'https://github.com/klvuongg/Portfolio.git',
    },
    {
        title: 'RPG Game',
        description: ['A classic role-playing game featuring a dynamic graphical interface with location-based visuals, cardinal navigation, combat mechanics, and a player progression system involving quests, monsters, and rewards.', 'Technologies used: C#, Object-Oriented Programming, Windows Presentation Foundation (WPF).'],
        id: 4,
        bgImage: assets.RPGGame,
        link: 'https://github.com/klvuongg/RPG-Game.git',
        video: '/RPGGame.mp4',
        demoDescription: [
            "- Developed a functional, single-player RPG using C# and WPF (XAML), adhering strictly to Object-Oriented Programming (OOP) principles for entities like Player, Monster, Weapon, and Quest",
            "- Designed a rich interactive interface using WPF/XAML that displays player stats, location visuals, and contextual navigation buttons (North, South, East, West) to manage movement within the game world.",
            "- Implemented core RPG mechanics, including: ",
            "  • Customizable player equipment and weapon selection.", 
            "  • Turn-based combat system for fighting monsters.",
            "  • A Quest system for progression and earning in-game rewards.",
            "- Utilized data binding and event-driven architecture inherent to WPF to ensure a responsive and smooth user experience as the player interacts with the environment and engages in combat.",
        ],
    },
    {
        title: 'Assembly Line System',
        description: ['A resource management simulation of a multi-station assembly line. This application processes customer orders through queued stations, managing stock levels and order fulfillment.', 'Technologies used: C++, Object-Oriented Programming, File Handling.'],
        id: 5,
        bgImage: assets.AssemblyLine,
        link: 'https://github.com/klvuongg/Assembly-Line-System.git',
        video: '/AssemblyLine.mp4',
        demoDescription: [
            "- Engineered an assembly line simulator in C++ using Object-Oriented Programming principles to model a multi-station manufacturing process, including Station, CustomerOrder, and LineManager classes.",
            "- Implemented a multi-stage queue processing workflow: LineManager moves CustomerOrder objects sequentially through a line of stations, where each station processes an order if its required item is in stock.",
            "- Developed robust resource management logic to track and deplete inventory at each station, accurately determining whether orders are completed or incomplete based on available stock.",
            "- Integrated file handling capabilities to manage application input (e.g., station inventory and customer order details).",
            "- The project's structure was validated using three distinct testing phases to ensure the integrity of class interactions, debugging, and final execution logic."
        ],
    },
    {
        title: 'Library Application',
        description: ['A console-based Library Management System that manages publication inventory and full circulation cycles (Add, Remove, Checkout, Return). It features critical business logic, including inventory availability checks and automated late fee calculation upon book return.', 'Technologies used: C, Object-Oriented Programming, File Handling.'],
        id: 6,
        bgImage: assets.LibApp,
        link: 'https://github.com/klvuongg/Library-Application.git',
        video: '/LibApp.mp4',
        demoDescription: [
            "- Developed a comprehensive Library Management System in C, effectively modeling complex entities like Publication and Library through the disciplined use of structs and function-based operations to adhere to Object-Oriented design principles.",
            "- Implemented persistent data storage and retrieval using input/output file handling, ensuring that the system state (inventory, borrowed status) is preserved and accurately updated after every user transaction.",
            "- Designed and implemented critical business logic, including:",
            "  • Precise Name/Type Matching: A stringent name-checking module is required for the removal process, ensuring the user input matches the publication details exactly before deletion.",
            "  • Availability Check: Checkout functionality validates that a publication is available by verifying the absence of an assigned membership ID.",
            "- Engineered a Late Fee Calculation Module that determines if the return date exceeds the permitted borrowing period, calculating and displaying the applied penalty on the screen before updating the final output file.",
            "- The system successfully simulates a real-world library environment, tracking inventory, user loans, and financial obligations.",
        ],
    },
    {
        title: 'BiteByte App',
        description: ['BiteByte: A successful hackathon collaboration delivering an accessible, AI-powered app. We teamed up to simplify blood sugar and meal tracking for the elderly through easy photo logging and automated insights.', 'Technologies used: Figma, React Native, GitHub'],
        id: 7,
        bgImage: assets.BiteByte,
        link: 'https://github.com/klvuongg/BiteByte.git',
        video: '/BiteByte.mp4',
        demoDescription: [
            "- Collaboratively developed a smart healthcare application, BiteByte, within a short hackathon period, focusing on empowering elderly users with independent blood sugar and meal tracking.",
            "- Architected the cross-platform mobile application using React Native, with all team development and version control managed through GitHub for effective collaboration.",
            "- Spearheaded the UI/UX design process using Figma, ensuring an accessible design with large text and intuitive flow, specifically tailored for a senior demographic.",
            "- Implemented core AI-driven features:",
            "  • AI-Powered Meal Tracking: Estimates nutritional content from user-submitted meal photos.",
            "  • Automated Blood Sugar Analysis: Generates daily averages, min/max trends, and visual insights from user-logged or synced glucose readings.",
            "- The system successfully provides actionable health insights to simplify complex health management, promoting user autonomy and informed decision-making.",
        ],
    },
]

export const infoList = [
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: ['Computer Programming and Analysis', 'Seneca Polytechnic', 'Expected Graduation: 2027', 'GPA: 4.0'] },
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Skills', description: ['Full Stack Development', 'Web Development', 'Object Oriented Programming', 'Software Testing', 'Database Management'] },
]

export const toolsData = [
    { icon: assets.programming_languages, iconDark: assets.programming_languages_dark, title: 'Languages, Frameworks and Libraries', description: ['C', 'C++', 'C#', 'Python', 'JavaScript', 'Java', 'HTML', 'CSS', 'XAML', 'React', 'Django', 'Node.js', 'Express.js', 'Spring Boot', 'Windows Presentation Foundation (WPF)', 'Bootstrap', 'Tailwind CSS'] },
    { icon: assets.database, iconDark: assets.database_dark, title: 'Databases', description: ['Oracle SQL', 'MongoDB', 'PostgreSQL' ] },
    { icon: assets.operating_system, iconDark: assets.operating_system_dark, title: 'Operating System', description: ['Linux', 'Windows', 'Bash', 'PowerShell'] },
    { icon: assets.tools, iconDark: tools_dark, title: 'Other Tools', description: ['Jira', 'Visual Studio (2022)', 'Visual Studio Code', 'GitHub', 'TortoiseGit', 'PythonAnywhere', 'Vercel', 'Visual Paradigm', 'Figma', 'Canva']},
];