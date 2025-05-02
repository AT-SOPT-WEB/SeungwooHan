import { useTheme } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import {
  container,
  searchBox,
  errorText,
  historyList,
  historyCard,
} from "./Baseball.style";

const createAnswer = () => {
  const nums = new Set();
  while (nums.size < 3) {
    nums.add(Math.floor(Math.random() * 10));
  }
  return [...nums].join("");
};

const compareGuess = (guess, answer) => {
  let strike = 0,
    ball = 0;
  for (let i = 0; i < 3; i++) {
    if (guess[i] === answer[i]) strike++;
    else if (answer.includes(guess[i])) ball++;
  }
  return { strike, ball };
};

const WIN_MESSAGE = "🎉 정답입니다! 3초 뒤에 게임이 리셋됩니다.";
const LOSE_MESSAGE =
  "❌ 게임 오버! 10번을 넘겨서 실패하였습니다. 게임이 초기화됩니다.";
const DUPLICATE_WARNING = "⚠️ 서로 다른 숫자 3자리를 입력해주세요!";
const MAX_TRIES = 10;

const Baseball = () => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [gameLocked, setGameLocked] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setAnswer(createAnswer());
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const resetGame = () => {
    setInput("");
    setFeedback("");
    setHistory([]);
    setAnswer(createAnswer());
    setGameLocked(false);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 3);
    setInput(raw);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !gameLocked && input.length === 3) {
      const digits = input.split("");
      const isUnique = new Set(digits).size === 3;

      if (!isUnique) {
        setFeedback(DUPLICATE_WARNING);
        return;
      }

      const { strike, ball } = compareGuess(input, answer);
      const resultText = `${strike} 스트라이크 ${ball} 볼`;

      const newHistory = [
        ...history,
        { value: input, result: `${strike}S ${ball}B` },
      ];

      setHistory(newHistory);
      setInput("");

      if (strike === 3) {
        setFeedback(WIN_MESSAGE);
        setGameLocked(true);
        timeoutRef.current = setTimeout(() => resetGame(), 3000);
      } else if (newHistory.length >= MAX_TRIES) {
        setFeedback(LOSE_MESSAGE);
        setGameLocked(true);
        timeoutRef.current = setTimeout(() => resetGame(), 5000);
      } else {
        setFeedback(resultText);
      }
    }
  };

  return (
    <div css={container}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={3}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={gameLocked}
        placeholder="3자리 숫자를 입력해주세요."
        css={searchBox(theme)}
        aria-label="숫자야구 입력"
      />

      {feedback && <div css={errorText(theme)}>{feedback}</div>}

      {history.length > 0 && (
        <div css={historyList} aria-label="기록 리스트">
          {history.map((item, idx) => (
            <div css={historyCard(theme)} key={idx}>
              <span>{item.value}</span>
              <span className="dash">-</span>
              <span>{item.result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Baseball;
