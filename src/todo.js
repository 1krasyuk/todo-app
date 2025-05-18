export function createTodo({
  title,
  description = "",
  dueDate = "",
  priority = "low",
  project = "Inbox",
}) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    project,
  };
}
