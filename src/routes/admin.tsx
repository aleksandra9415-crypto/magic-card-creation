import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    // This just acts as a parent for the admin group
  },
})
