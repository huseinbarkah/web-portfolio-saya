export interface Skill {
  name: string
  icon: string
  level: number // 0-100
}

export interface SkillCategory {
  id: string
  label: string
  color: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    label: 'Technical',
    color: '#3B82F6',
    skills: [
      { name: 'HTML/CSS', icon: 'Code2', level: 90 },
      { name: 'JavaScript', icon: 'FileCode', level: 80 },
      { name: 'React', icon: 'Atom', level: 75 },
      { name: 'TailwindCSS', icon: 'Palette', level: 85 },
      { name: 'Node.js', icon: 'Server', level: 65 },
      { name: 'Git', icon: 'GitBranch', level: 70 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Tools',
    color: '#8B5CF6',
    skills: [
      { name: 'Prompt Engineering', icon: 'MessageSquare', level: 85 },
      { name: 'ChatGPT / AI Tools', icon: 'Bot', level: 90 },
      { name: 'AI for Business', icon: 'TrendingUp', level: 80 },
      { name: 'Data Analysis', icon: 'BarChart3', level: 65 },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    color: '#06B6D4',
    skills: [
      { name: 'UI/UX Design', icon: 'Figma', level: 75 },
      { name: 'Canva', icon: 'Image', level: 90 },
      { name: 'Video Editing', icon: 'Film', level: 70 },
      { name: 'Content Strategy', icon: 'PenTool', level: 80 },
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    color: '#22C55E',
    skills: [
      { name: 'Communication', icon: 'Users', level: 90 },
      { name: 'Leadership', icon: 'Crown', level: 85 },
      { name: 'Problem Solving', icon: 'Lightbulb', level: 80 },
      { name: 'Teamwork', icon: 'Handshake', level: 90 },
    ],
  },
]
