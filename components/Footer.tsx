import { Github,  Linkedin ,Instagram} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md shadow-md transition-colors duration-200 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} YK_CREATIONS. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://github.com/Yashparmar1125" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Github size={20} />
          </a>
          <a href="https://instagram.com/yash11_25" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Instagram size={20} />
          </a>
          <a href="https://linkedin.com/in/yashparmar1125" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

