const hardcodedResponses = [
  {
    keywords: ['projects', 'portfolio', 'built', 'made', 'key projects', 'project'],
    reply: "Some of my key projects include FixItNow (a smart maintenance request system), Zero2Hero (gamified waste management platform), and a Full-stack Inventory Management Dashboard."
  },
  {
    keywords: ['experience', 'experiences', 'work', 'job', 'internship', 'background'],
    reply: "I've worked as a Full Stack Developer on projects like FixItNow and Zero2Hero. I've also completed an internship at Vidyarthi Mitra as a Python & Data Analyst Intern, and did freelance work as a Full Stack Developer for the Indian Penpal League."
  },
  {
    keywords: ['who are you', 'who r u', 'yourself', 'about you', 'introduce', 'who is devansh'],
    reply: "I'm Devansh Singh, a third-year BSc IT student at Jai Hind College with a strong interest in full-stack development and building practical, user-focused applications."
  },
  {
    keywords: ['what do you do', 'what u do', 'your work', 'profession'],
    reply: "I design and develop full-stack web applications using modern technologies like Next.js, Node.js, and cloud services. I focus on building scalable systems with clean UI and efficient backend logic."
  },
  {
    keywords: ['skills', 'tech stack', 'stack', 'languages', 'frontend', 'backend', 'technologies', 'tools', 'database', 'cloud'],
    reply: "I work with Frontend (React.js, Next.js, HTML, CSS, Tailwind), Backend (Node.js, FastAPI), Databases (MongoDB, MySQL), Cloud (AWS RDS/EC2/S3/API Gateway, Firebase), and Tools like Git, Redux Toolkit, and Vercel."
  },
  {
    keywords: ['fixitnow', 'maintenance', 'fix it now'],
    reply: "FixItNow is a full-stack AI-powered platform that allows users to report maintenance issues, automatically assigns technicians, and predicts future failures using machine learning models."
  },
  {
    keywords: ['prefer', 'favorite tech', 'technologies do you prefer', 'like working with'],
    reply: "I prefer working with Next.js for frontend and Node.js or FastAPI for backend because they allow fast development and scalable architecture. I also enjoy integrating cloud services like AWS and Firebase."
  },
  {
    keywords: ['different', 'unique', 'stand out', 'why you', 'special'],
    reply: "I focus on building real-world solutions instead of just demo projects. My work emphasizes usability, system design, and scalability rather than just UI."
  },
  {
    keywords: ['currently', 'working on now', 'right now', 'what are you doing'],
    reply: "I'm currently developing scalable full-stack applications and exploring system design concepts to improve performance and architecture."
  },
  {
    keywords: ['goals', 'future', 'career', 'aim'],
    reply: "I aim to become a highly skilled software engineer and work on impactful products. I'm also working to pivot into data science fields for the future."
  },
  {
    keywords: ['hire', 'freelance', 'available', 'collaboration', 'job', 'internship', 'open to'],
    reply: "Yes, I'm actively looking for opportunities where I can contribute, learn, and grow as a developer or engineer."
  },
  {
    keywords: ['education', 'college', 'degree', 'study', 'university', 'background'],
    reply: "I'm pursuing a Bachelor's degree in Information Technology (BSc IT) at Jai Hind College and currently maintaining a CGPA of 8.95."
  },
  {
    keywords: ['problems', 'enjoy solving', 'what do you solving', 'like to solve'],
    reply: "I enjoy solving problems related to system design, backend logic, and building efficient workflows that improve user experience."
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'number', 'linkedin', 'github', 'connect'],
    reply: "You can reach out to me via email at devanshsingh159753@gmail.com or on LinkedIn at https://www.linkedin.com/in/devansh-singh-b592231a9/"
  },
  {
    keywords: ['why hire', 'hire you', 'recruit', 'reason to hire'],
    reply: "I bring a combination of strong technical skills, practical project experience, and a focus on building solutions that actually work in real-world scenarios."
  },
  {
    keywords: ['working style', 'style', 'how do you work'],
    reply: "I prefer structured development with clear goals, iterative improvements, and clean, maintainable code."
  },
  {
    keywords: ['inspired', 'get into tech', 'why tech', 'motivation to code'],
    reply: "I was drawn to tech because of the ability to build solutions that solve real-world problems. Over time, this curiosity turned into a focus on full-stack development and system design."
  },
  {
    keywords: ['challenges', 'faced', 'hardest part', 'difficulties'],
    reply: "One of the biggest challenges has been managing complex systems across frontend, backend, and cloud services. Learning how to structure scalable architectures and debug efficiently has been a key growth area."
  },
  {
    keywords: ['strongest', 'best at', 'strength', 'strong area'],
    reply: "My strongest area is full-stack development, particularly designing systems that integrate frontend interfaces with efficient backend logic and databases."
  },
  {
    keywords: ['weakest', 'weakness', 'need to improve', 'improve on'],
    reply: "I'm continuously improving my understanding of advanced system design and large-scale architecture, especially for high-traffic applications."
  },
  {
    keywords: ['approach', 'new project', 'start a project'],
    reply: "I start by understanding the problem, defining requirements, designing the system architecture, and then building iteratively while testing each component."
  },
  {
    keywords: ['deadlines', 'time management', 'manage time'],
    reply: "I break down tasks into smaller milestones, prioritize critical features, and maintain consistency to ensure timely delivery."
  },
  {
    keywords: ['team', 'alone', 'independent', 'collaborate'],
    reply: "I'm comfortable in both settings. I can work independently when needed, but I also enjoy collaborating to build better solutions."
  },
  {
    keywords: ['tools', 'use daily', 'daily basis'],
    reply: "I regularly use VS Code, Git, Postman, Firebase, AWS services, and modern frontend frameworks like Next.js."
  },
  {
    keywords: ['keep learning', 'learn new', 'stay updated'],
    reply: "I learn by building projects, reading documentation, and exploring real-world use cases rather than just theoretical concepts."
  },
  {
    keywords: ['excite you', 'exciting projects', 'like to build'],
    reply: "Projects that involve real-world problem solving, automation, and scalable systems excite me the most."
  },
  {
    keywords: ['api', 'apis', 'rest', 'graphql'],
    reply: "Yes, I have experience building and integrating REST APIs for communication between frontend and backend systems."
  },
  {
    keywords: ['database', 'databases', 'sql', 'nosql', 'mysql', 'mongodb'],
    reply: "I've worked with both SQL and NoSQL databases like MySQL and MongoDB, focusing on efficient data handling and optimization."
  },
  {
    keywords: ['ui/ux', 'design', 'ui', 'ux'],
    reply: "UI/UX is important because it directly affects user experience. I aim to build interfaces that are clean, intuitive, and responsive."
  },
  {
    keywords: ['proud', 'best project', 'proud of'],
    reply: "I'm particularly proud of building systems that combine multiple technologies, like AI integration, cloud services, and real-time tracking in a single platform."
  },
  {
    keywords: ['debug', 'fix bugs', 'find errors', 'handle errors'],
    reply: "I approach debugging systematically by isolating the problem, checking logs, and testing components individually."
  },
  {
    keywords: ['version control', 'git', 'vcs'],
    reply: "I use Git for version control and collaboration."
  },
  {
    keywords: ['deployment', 'deploy', 'vercel', 'aws', 'hosting'],
    reply: "Yes, I have deployed applications using platforms like Vercel and cloud services like AWS."
  },
  {
    keywords: ['learning goals', 'want to learn', 'future learning'],
    reply: "I aim to deepen my knowledge in system design, performance optimization, and scalable backend architectures."
  },
  {
    keywords: ['what type of company', 'looking for', 'company culture', 'ideal company'],
    reply: "I'm looking for a company where I can work on meaningful projects, grow technically, and contribute to impactful solutions."
  },
  {
    keywords: ['motivates', 'drive', 'motivation'],
    reply: "Solving challenging problems and building applications that people actually use motivates me."
  },
  {
    keywords: ['outside', 'hobbies', 'free time', 'fun'],
    reply: "I explore new ideas, work on side projects, and stay updated with technology trends. I also enjoy building projects and improving my development skills."
  },
  {
    keywords: ['describe yourself', 'one sentence'],
    reply: "A problem-solver who enjoys building practical and scalable tech solutions."
  },
  {
    keywords: ['strengths', 'good at'],
    reply: "Consistency, problem-solving ability, and the ability to learn and adapt quickly."
  },
  {
    keywords: ['choose bsc', 'bsc it', 'why it'],
    reply: "I chose BSc IT to build a strong foundation in technology and software development."
  },
  {
    keywords: ['show your projects', 'see your work', 'view projects', 'look at projects'],
    reply: "You can explore my projects in the portfolio section, where I've shared details, features, and technologies used."
  },
  {
    keywords: ['problems can you solve', 'what can you solve'],
    reply: "I can build scalable web applications, optimize workflows, and design systems that improve efficiency and user experience."
  },
  {
    keywords: ['build for a company', 'provide value', 'what can you build'],
    reply: "I can develop full-stack applications, dashboards, automation systems, and data-driven platforms tailored to business needs."
  },
  {
    keywords: ['trust', 'trust your work', 'prove', 'believe'],
    reply: "My projects demonstrate practical implementation, scalability, and real-world usability rather than just theoretical knowledge."
  },
  {
    keywords: ['what is next', 'whats next', 'next step'],
    reply: "I'm focused on improving my technical depth and working on larger, more complex systems."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
    reply: "Hello! I'm Devansh's AI assistant. Ask me about his projects, skills, education, or how to contact him."
  }
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json({ reply: "No messages provided." }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].content.toLowerCase();
    
    let reply = "I'm not entirely sure, but you can reach out to Devansh directly at devanshsingh159753@gmail.com to ask him personally!";

    for (const rule of hardcodedResponses) {
      if (rule.keywords.some(keyword => userMessage.includes(keyword))) {
        reply = rule.reply;
        break;
      }
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { reply: "Sorry, I am having trouble connecting right now." },
      { status: 500 }
    );
  }
}
