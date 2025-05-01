import { todos as initTodos } from "./data.js";

const STORAGE_KEY = "todoList";
const tbody = document.getElementById("todo-list-body");
const inputEl = document.querySelector(".input-section input");
const selectEl = document.querySelector(".input-section select");
const addBtn = document.querySelector(".input-section .add");
const deleteBtn = document.querySelector(".button-section .delete");
const completeBtn = document.querySelector(".button-section .complete");
const selectAllCheckbox = document.getElementById("select-all");

// 필터 조건 항목들
let currentFilter = "all";
let currentPriority = "";

// 저장된 데이터 없을 때 초기 데이터 설정
function initStorage() {
  const savedList = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedList || savedList.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initTodos));
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

// 선택 항목 삭제
function handleDeleteTodo() {
  const todoList = getTodoList();
  const checkedIds = getCheckedIds();
  const updated = todoList.filter((item) => !checkedIds.includes(item.id));
  updateTodoList(updated);
  renderTable();
}

// 미완료 항목에서 완료 처리
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

  const updated = todoList.map((item) =>
    checkedIds.includes(item.id) && !item.completed
      ? { ...item, completed: true }
      : item
  );

  updateTodoList(updated);
  renderTable();

  // tbody.queryselectorall을 사용하여 최적화
  const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => {
    const id = Number(cb.dataset.id);
    if (checkedIds.includes(id)) cb.checked = false;
  });

  selectAllCheckbox.checked = false;
}

// 할일목록 렌더링 시키기
function renderTable() {
  const todoList = getTodoList();
  const filteredList = getFilteredList(todoList);

  tbody.innerHTML = filteredList.length
    ? renderRows(filteredList)
    : renderEmptyRow();
}

function getFilteredList(list) {
  return list.filter((item) => {
    switch (currentFilter) {
      case "completed":
        return item.completed;
      case "incomplete":
        return !item.completed;
      case "priority":
        return String(item.priority) === currentPriority;
      default:
        return true;
    }
  });
}

function renderRows(list) {
  return list
    .map(
      (item) => `
    <tr>
      <td><input type="checkbox" data-id="${item.id}"></td>
      <td>${item.priority}</td>
      <td>${item.completed ? "✅" : "❌"}</td>
      <td>${item.title}</td>
    </tr>
  `
    )
    .join("");
}

function renderEmptyRow() {
  return `<tr><td colspan="4">표시할 할 일이 없습니다.</td></tr>`;
}

// localStorage에서 todoList 가져오기
function getTodoList() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

//localStorage에 todoList 저장하기
function updateTodoList(todoList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

// tbody.queryselectorall을 사용하여 최적화
function getCheckedIds() {
  const checked = tbody.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checked).map((checkbox) => Number(checkbox.dataset.id));
}

// tbody.queryselectorall을 사용하여 최적화
function toggleAll(checkbox) {
  const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => {
    cb.checked = checkbox.checked;
  });
}

// 페이지 로드 시 초기 설정
window.addEventListener("DOMContentLoaded", () => {
  initStorage();
  setupFilterEvents();
  setupButtonEvents();
  setupSelectAllEvent();
  renderTable();
});
