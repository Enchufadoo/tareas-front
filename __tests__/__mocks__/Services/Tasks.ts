import { faker } from '@faker-js/faker'
import { Task } from '@/Services/Tasks'

export function mockTask(data: Partial<Task> = {}): Task {
  return {
    id: faker.number.int({ min: 1, max: 300 }),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    created_at: faker.date.past().toISOString(),
    created_at_date: faker.date.past().toISOString().slice(0, 10),
    hours_since_progress: faker.number.int({ min: 1, max: 300 }),
    progress_today: faker.datatype.boolean(),
    last_progress: faker.datatype.boolean()
      ? {
          created_at: faker.date.recent().toISOString(),
          id: faker.number.int({ min: 1, max: 300 })
        }
      : undefined,
    ...data
  }
}
