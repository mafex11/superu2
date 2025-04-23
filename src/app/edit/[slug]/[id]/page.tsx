'use client'

import { useParams } from 'next/navigation'
import { useAuth } from '../../../../context/auth-context'
import Editor from '../../../../components/'
import FileTree from '../../../../components/file-tree'

export default function EditPage() {
  const { slug, id } = useParams()
  const { user } = useAuth()

  return (
    <div className="flex h-screen">
      {/* Sidebar with file tree */}
      <div className="w-64 border-r p-4 overflow-auto">
        <FileTree workspaceId={id as string} />
      </div>
      
      {/* Main editor area */}
      <div className="flex-1 p-4 overflow-auto">
        <Editor 
          documentId={id as string} 
          userId={user?.email || ''} 
        />
      </div>
    </div>
  )
}