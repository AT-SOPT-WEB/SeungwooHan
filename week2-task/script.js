// 초기 데이터 설정 및 localStorage 저장
import { todos as initialTodos } from "./data.js";

const STORAGE_KEY = "todoList";
const tbody = document.getElementById("todo-list-body");

const inputEl = document.querySelector(".input-section input");
const selectEl = document.querySelector(".input-section select");
const addBtn = document.querySelector(".input-section .add");
const deleteBtn = document.querySelector(".button-section .delete");
const completeBtn = document.querySelector(".button-section .complete");
const selectAllCheckbox = document.getElementById("select-all");

// 전체, completed, incomplete
let currentFilter = "all";
// 1, 2, 3
let currentPriority = "";

// 초기 데이터 localStorage에 저장
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
  }
}

// 필터 버튼 이벤트 등록
function setupFilterEvents() {
  document
    .getElementById("filter-all")
    .addEventListener("click", () => applyFilter("all"));
  document
    .getElementById("filter-completed")
    .addEventListener("click", () => applyFilter("completed"));
  document
    .getElementById("filter-incomplete")
    .addEventListener("click", () => applyFilter("incomplete"));
  document.getElementById("filter-priority").addEventListener("change", (e) => {
    applyFilter("priority", e.target.value);
  });
}

// 필터 적용
function applyFilter(type, priority = "") {
  currentFilter = type;
  currentPriority = priority;
  renderTable();
}

// 할 일 추가 버튼 이벤트
function setupButtonEvents() {
  addBtn.addEventListener("click", handleAddTodo);
  deleteBtn.addEventListener("click", handleDeleteTodo);
  completeBtn.addEventListener("click", handleCompleteTodo);
}

// 전체 선택 체크박스 이벤트
function setupSelectAllEvent() {
  selectAllCheckbox.addEventListener("change", (e) => toggleAll(e.target));
}

// 할 일 추가 기능 구현
function handleAddTodo() {
  const title = inputEl.value.trim();
  const priority = selectEl.value;

  if (!title || !priority) {
    alert("할 일과 중요도를 모두 입력해주세요!");
    return;
  }

  const todoList = getTodoList();

  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    priority: Number(priority),
  };

  todoList.push(newTodo);
  updateTodoList(todoList);

  inputEl.value = "";
  selectEl.selectedIndex = 0;
  renderTable();
}

// 체크된 todo 삭제 기능
function handleDeleteTodo() {
  const todoList = getTodoList();
  const checkedIds = getCheckedIds();

  const updated = todoList.filter((item) => !checkedIds.includes(item.id));
  updateTodoList(updated);
  renderTable();
}

// 체크된 미완료 todo 완료 처리 기능
function handleCompleteTodo() {
  const todoList = getTodoList();
  const checkedIds = getCheckedIds();

  const alreadyCompleted = todoList.some(
    (item) => checkedIds.includes(item.id) && item.completed
  );

  if (alreadyCompleted) {
    alert("이미 완료된 todo 입니다.");
    return;
  }

  const updated = todoList.map((item) => {
    if (checkedIds.includes(item.id) && !item.completed) {
      return { ...item, completed: true };
    }
    return item;
  });

  updateTodoList(updated);
  renderTable();

  const checkboxes = document.querySelectorAll(
    '#todo-list-body input[type="checkbox"]'
  );
  checkboxes.forEach((cb) => {
    const id = Number(cb.dataset.id);
    if (checkedIds.includes(id)) {
      cb.checked = false;
    }
  });

  selectAllCheckbox.checked = false;
}

// todo 테이블 렌더링
function renderTable() {
  const todoList = getTodoList();
  tbody.innerHTML = "";

  const filtered = todoList.filter((item) => {
    if (currentFilter === "completed") return item.completed;
    if (currentFilter === "incomplete") return !item.completed;
    if (currentFilter === "priority")
      return String(item.priority) === currentPriority;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">표시할 할 일이 없습니다.</td></tr>`;
    return;
  }

  filtered.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" data-id="${item.id}"></td>
      <td>${item.priority}</td>
      <td>${item.completed ? "✅" : "❌"}</td>
      <td>${item.title}</td>
    `;
    tbody.appendChild(row);
  });
}

// localStorage에서 todoList 가져오기
function getTodoList() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// localStorage에 todoList 저장하기
function updateTodoList(todoList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

// 체크된 todo들의 id 배열 가져오기
function getCheckedIds() {
  const checked = document.querySelectorAll(
    '#todo-list-body input[type="checkbox"]:checked'
  );
  return Array.from(checked).map((checkbox) => Number(checkbox.dataset.id));
}

// 전체 선택 체크박스 기능
function toggleAll(checkbox) {
  const checkboxes = document.querySelectorAll(
    '#todo-list-body input[type="checkbox"]'
  );
  checkboxes.forEach((cb) => {
    cb.checked = checkbox.checked;
  });
}

// 페이지 로드 시 초기 설정
window.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  setupFilterEvents();
  setupButtonEvents();
  setupSelectAllEvent();
  renderTable();
});
