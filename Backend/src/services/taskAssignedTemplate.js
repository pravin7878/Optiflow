function taskAssignedEmailTemplate({ taskTitle, deadline, taskUrl }) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px;">
      <h2 style="color: #007bff;">New Task Assigned</h2>
      <p><strong>Title:</strong> ${taskTitle}</p>
      <p><strong>Deadline:</strong> ${deadline}</p>
      <p>
        <a href="${taskUrl}" style="color: #007bff; text-decoration: underline;">View Task</a>
      </p>
      <br>
      <small>Optiflow Team</small>
    </div>
  `;
}

module.exports = { taskAssignedEmailTemplate };