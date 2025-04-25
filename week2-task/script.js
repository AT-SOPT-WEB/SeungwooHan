import { todos as initialTodos } from "./data.js";

const STORAGE_KEY = "todoList";
const tbody = document.getElementById("todo-list-body");

window.addEventListener("DOMContentLoaded", () => {
  // localStorage에 데이터가 없으면 초기 데이터 저장
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
  }
  renderTable();
});

function renderTable() {
  const todoList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tbody.innerHTML = ""; // 기존 테이블 초기화

  todoList.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" data-id="${item.id}" ${
      item.completed ? "checked" : ""
    }></td>
      <td>${item.priority}</td>
      <td>${item.completed ? "✅" : "❌"}</td>
      <td>${item.title}</td>
    `;
    tbody.appendChild(row);
  });
}
