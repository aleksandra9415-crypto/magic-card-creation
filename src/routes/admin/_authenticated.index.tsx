import { createFileRoute } from '@tanstack/react-router'
import AdminShell from '@/components/admin/AdminShell'
import { useServerFn } from '@tanstack/react-start'
import { migrateData } from '@/data/migration.functions'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/_authenticated/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const migrate = useServerFn(migrateData)
  const [migrating, setMigrating] = useState(false)

  const handleMigrate = async () => {
    setMigrating(true)
    try {
      await migrate()
      toast.success('Данные успешно мигрированы')
    } catch (e) {
      toast.error('Ошибка миграции')
    } finally {
      setMigrating(false)
    }
  }

  return (
    <AdminShell title="Дашборд">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Миграция данных</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Загрузить данные из JSON файлов в базу данных Lovable Cloud. Это перезапишет существующие записи с теми же слагами.
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {migrating ? 'Миграция...' : 'Запустить миграцию'}
          </button>
        </div>
      </div>
    </AdminShell>
  )
}
