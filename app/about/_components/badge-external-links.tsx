import { FC } from "react"

import { LuGithub, LuLinkedin } from "react-icons/lu"
import { MailIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const BadgeExternalLinks: FC = () => {
  return (
    <div className="flex items-center gap-x-4">
      <a 
        href={process.env.NEXT_PUBLIC_GITHUB ?? ""} 
        target="_blank" rel="noopener noreferrer" 
        className="group flex gap-x-2 items-center"
        >
        <Badge variant={"outline"} className="py-2 group-hover:border-accent-blue">  
          <LuGithub className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
          <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">Github</span>
        </Badge>
      </a>
    
      <a 
        href={process.env.NEXT_PUBLIC_LINKEDIN ?? ""} 
        target="_blank" rel="noopener noreferrer" 
        className="group flex gap-x-2 items-center"
      >
        <Badge variant={"outline"} className="py-2 group-hover:border-accent-blue">  
          <LuLinkedin className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
          <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">LinkedIn</span>
      </Badge>
      </a>

      <a 
        href={`mailto:${process.env.NEXT_PUBLIC_MAIL_TO ?? ""}`} 
        target="_blank" rel="noopener noreferrer" 
        className="group flex gap-x-2 items-center"
      >
        <Badge variant={"outline"} className="py-2 group-hover:border-accent-blue">  
          <MailIcon className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
          <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">Email</span>
        </Badge>
      </a>
    </div>
  )
}