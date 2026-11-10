import { createSignal, Switch, Match, Show } from 'solid-js';

import { Question1 } from './components/Question1.js';
import { Question2 } from './components/Question2.js';
import { Question3 } from './components/Question3.js';
import { Question4 } from './components/Question4.js';

interface QuizQuestion {
  id: number;
  question: string;
  type: 'answer' | 'input';
  answer?: string;
  answers?: string[];
  correctAnswer?: number;
  explanation: string;
  inputPrompt?: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: '朝は4本脚、昼は2本脚。晩は3本脚にて歩く怪物は？',
    type: 'answer',
    answer: '自分',
    explanation:
      '赤ん坊の時は四つん這い（4本足）、大人は二足步行（2本足）、老人は杖をついて歩く（3本足）という有名なスフィンクスの謎かけです。',
  },
  {
    id: 2,
    question:
      '4本脚と2本脚の怪物が計（A）匹あります。その脚は総じて（B）本あります。では4本脚は何匹か？',
    type: 'input',
    inputPrompt: 'A（総匹数）とB（総脚数）を入力してください',
    correctAnswer: 0,
    explanation:
      '計算式は（B÷2）－Aです。4本脚をx、2本脚をyとすると、4x＋2y＝B、x＋y＝Aからx＝（B÷2）－Aとなります。',
  },
  {
    id: 3,
    question:
      '4本脚と2本脚の怪物の脚は総じて（A）本ありました。年月が経ち、4本脚はすべて2本脚に成長し、2本脚のうち（B）匹は3本脚に成長しました。その結果、脚は総じて（C）本になりました。では4本脚であった者は何匹か？',
    type: 'input',
    inputPrompt:
      'A（最初の総脚数）、B（3本脚に成長した匹数）、C（最後の総脚数）を入力してください',
    correctAnswer: 0,
    explanation:
      '計算式は（A＋B－C）÷2です。4本脚が2本脚に成長すると脚は2本減ります。3本脚に成長すると1本増えます。',
  },
  {
    id: 4,
    question:
      '4本脚と2本脚の怪物の脚は総じて（A）本ありました。年月が経ち、4本脚はすべて2本脚に成長し、2本脚のうち（B）匹は3本脚に成長しました。さらに、最初の4本脚だった者の倍の数の4本脚が新たに誕生しました。その脚は総じて（C）本になりました。では4本脚であった者は何匹か？',
    type: 'input',
    inputPrompt:
      'A（最初の総脚数）、B（3本脚に成長した匹数）、C（最後の総脚数）を入力してください',
    correctAnswer: 0,
    explanation:
      '計算式は（C－A－B）÷6です。成長による変化と新たな誕生を考慮して計算します。',
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = createSignal(0);

  const handleNextQuestion = () => {
    if (currentQuestion() < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion() > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
  };

  return (
    <div class="quiz-container">
      <h1 class="quiz-title">🏛️ 大航海時代3 スフィンクスクイズ</h1>

      <div class="quiz-content">
        <div class="progress">
          問題 {currentQuestion() + 1} / {quizData.length}
        </div>

        <div class="question-box">
          <h2 class="question">{quizData[currentQuestion()].question}</h2>
        </div>

        <Switch fallback={<div>問題が見つかりません</div>}>
          <Match when={currentQuestion() === 0}>
            <Question1
              question={quizData[0].question}
              answer={quizData[0].answer ?? ''}
              explanation={quizData[0].explanation}
            />
          </Match>
          <Match when={currentQuestion() === 1}>
            <Question2
              question={quizData[1].question}
              inputPrompt={quizData[1].inputPrompt ?? ''}
            />
          </Match>
          <Match when={currentQuestion() === 2}>
            <Question3
              question={quizData[2].question}
              inputPrompt={quizData[2].inputPrompt ?? ''}
            />
          </Match>
          <Match when={currentQuestion() === 3}>
            <Question4
              question={quizData[3].question}
              inputPrompt={quizData[3].inputPrompt ?? ''}
            />
          </Match>
        </Switch>

        <div class="button-container">
          <Show when={currentQuestion() > 0}>
            <button class="previous-button" onClick={handlePreviousQuestion}>
              前の問題へ
            </button>
          </Show>
          <Switch
            fallback={
              <button class="reset-button" onClick={handleReset}>
                最初に戻る
              </button>
            }
          >
            <Match when={currentQuestion() < quizData.length - 1}>
              <button class="next-button" onClick={handleNextQuestion}>
                次の問題へ
              </button>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
}
