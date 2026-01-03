import { createSignal } from 'solid-js';

/**
 * 第2問の計算結果を表すインターフェース
 */
interface CalculationResult2 {
  /** 4本脚の怪物の匹数 */
  fourLegged: number;
  /** 2本脚の怪物の匹数 */
  twoLegged: number;
}

/**
 * 第3問、第4問の計算結果を表すインターフェース
 */
interface CalculationResult3or4 {
  /** 4本脚であった者の匹数 */
  result: number;
}

/**
 * 計算結果のユニオン型
 */
type CalculationResult = CalculationResult2 | CalculationResult3or4;

/**
 * クイズの問題データを表すインターフェース
 */
interface QuizQuestion {
  /** 問題ID */
  id: number;
  /** 問題文 */
  question: string;
  /** 問題タイプ */
  type: 'answer' | 'input';
  /** 答え（answerタイプの場合） */
  answer?: string;
  /** 選択肢（使用しない） */
  answers?: string[];
  /** 正解のインデックス（使用しない） */
  correctAnswer?: number;
  /** 解説 */
  explanation: string;
  /** 入力プロンプト（inputタイプの場合） */
  inputPrompt?: string;
}

/**
 * スフィンクスクイズの問題データ
 */
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: '朝は4本脚、昼は2本脚。晩は3本脚にて歩く怪物は？',
    type: 'answer',
    answer: '自分',
    explanation: '赤ん坊の時は四つん這い（4本足）、大人は二足步行（2本足）、老人は杖をついて歩く（3本足）という有名なスフィンクスの謎かけです。',
  },
  {
    id: 2,
    question: '4本脚と2本脚の怪物が計（A）匹あります。その脚は総じて（B）本あります。では4本脚は何匹か？',
    type: 'input',
    inputPrompt: 'A（総匹数）とB（総脚数）を入力してください',
    correctAnswer: 0,
    explanation: '計算式は（B÷2）－Aです。4本脚をx、2本脚をyとすると、4x＋2y＝B、x＋y＝Aからx＝（B÷2）－Aとなります。',
  },
  {
    id: 3,
    question: '4本脚と2本脚の怪物の脚は総じて（A）本ありました。年月が経ち、4本脚はすべて2本脚に成長し、2本脚のうち（B）匹は3本脚に成長しました。その結果、脚は総じて（C）本になりました。では4本脚であった者は何匹か？',
    type: 'input',
    inputPrompt: 'A（最初の総脚数）、B（3本脚に成長した匹数）、C（最後の総脚数）を入力してください',
    correctAnswer: 0,
    explanation: '計算式は（A＋B－C）÷2です。4本脚が2本脚に成長すると脚は2本減ります。3本脚に成長すると1本増えます。',
  },
  {
    id: 4,
    question: '4本脚と2本脚の怪物の脚は総じて（A）本ありました。年月が経ち、4本脚はすべて2本脚に成長し、2本脚のうち（B）匹は3本脚に成長しました。さらに、最初の4本脚だった者の倍の数の4本脚が新たに誕生しました。その脚は総じて（C）本になりました。では4本脚であった者は何匹か？',
    type: 'input',
    inputPrompt: 'A（最初の総脚数）、B（3本脚に成長した匹数）、C（最後の総脚数）を入力してください',
    correctAnswer: 0,
    explanation: '計算式は（C－A－B）÷6です。成長による変化と新たな誕生を考慮して計算します。',
  },
];

/**
 * スフィンクスクイズ攻略ツールのメインコンポーネント
 */
export default function App() {
  const [currentQuestion, setCurrentQuestion] = createSignal(0);
  const [inputValues, setInputValues] = createSignal({ input1: '', input2: '', input3: '' });
  const [calculatedAnswer, setCalculatedAnswer] = createSignal<CalculationResult | null>(null);

  /**
   * 現在の問題に基づいて計算を実行する
   *
   * @returns 計算結果、または入力が不正な場合はnull
   */
  const calculateAnswer = (): CalculationResult | null => {
    const q = quizData[currentQuestion()];
    const inputs = inputValues();
    const input1 = parseFloat(inputs.input1);
    const input2 = parseFloat(inputs.input2);
    const input3 = parseFloat(inputs.input3);

    if (q.id === 2) {
      if (isNaN(input1) || isNaN(input2)) return null;
      const fourLegged = (input2 / 2) - input1;
      const twoLegged = (2 * input1) - (input2 / 2);
      return { fourLegged, twoLegged };
    } else if (q.id === 3) {
      if (isNaN(input1) || isNaN(input2) || isNaN(input3)) return null;
      const result = (input1 + input2 - input3) / 2;
      return { result };
    } else if (q.id === 4) {
      if (isNaN(input1) || isNaN(input2) || isNaN(input3)) return null;
      const result = (input3 - input1 - input2) / 6;
      return { result };
    }
    return null;
  };

  /**
   * 入力フィールドの変更を処理する
   *
   * @param field - 変更された入力フィールドの名前
   * @param value - 新しい値
   */
  const handleInputChange = (field: 'input1' | 'input2' | 'input3', value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
    setCalculatedAnswer(calculateAnswer());
  };

  /**
   * 次の問題に進む
   */
  const handleNextQuestion = () => {
    if (currentQuestion() < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setInputValues({ input1: '', input2: '', input3: '' });
      setCalculatedAnswer(null);
    } else {
      setInputValues({ input1: '', input2: '', input3: '' });
      setCalculatedAnswer(null);
    }
  };

  /**
   * 前の問題に戻る
   */
  const handlePreviousQuestion = () => {
    if (currentQuestion() > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setInputValues({ input1: '', input2: '', input3: '' });
      setCalculatedAnswer(null);
    }
  };

  /**
   * クイズを最初の問題にリセットする
   */
  const handleReset = () => {
    setCurrentQuestion(0);
    setInputValues({ input1: '', input2: '', input3: '' });
    setCalculatedAnswer(null);
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

        {quizData[currentQuestion()].type === 'answer' ? (
          <div class="answer-display">
            <p class="answer-label">答え:</p>
            <p class="answer-value">{quizData[currentQuestion()].answer}</p>
            {quizData[currentQuestion()].explanation && (
              <p class="explanation-text">{quizData[currentQuestion()].explanation}</p>
            )}
          </div>
        ) : (
          <div class="input-section">
            {quizData[currentQuestion()].inputPrompt && (
              <p class="input-prompt">{quizData[currentQuestion()].inputPrompt}</p>
            )}
            <div class="input-fields">
              <div class="input-field">
                <label>A:</label>
                <input
                  type="number"
                  value={inputValues().input1}
                  onInput={(e) => handleInputChange('input1', e.currentTarget.value)}
                  placeholder="数値を入力"
                />
              </div>
              <div class="input-field">
                <label>B:</label>
                <input
                  type="number"
                  value={inputValues().input2}
                  onInput={(e) => handleInputChange('input2', e.currentTarget.value)}
                  placeholder="数値を入力"
                />
              </div>
              {quizData[currentQuestion()].id >= 3 && (
                <div class="input-field">
                  <label>C:</label>
                  <input
                    type="number"
                    value={inputValues().input3}
                    onInput={(e) => handleInputChange('input3', e.currentTarget.value)}
                    placeholder="数値を入力"
                  />
                </div>
              )}
            </div>
            {(() => {
              const result = calculatedAnswer();
              if (result !== null && quizData[currentQuestion()].id === 2 && 'fourLegged' in result && 'twoLegged' in result) {
                return (
                  <div class="calculation-result">
                    <p class="result-label">計算結果:</p>
                    <p class="result-value">4本脚: {result.fourLegged} 匹</p>
                    <p class="result-value">2本脚: {result.twoLegged} 匹</p>
                  </div>
                );
              }
              return null;
            })()}
            {(() => {
              const result = calculatedAnswer();
              if (result !== null && quizData[currentQuestion()].id >= 3 && 'result' in result) {
                return (
                  <div class="calculation-result">
                    <p class="result-label">計算結果:</p>
                    <p class="result-value">{result.result} 匹</p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        <div class="button-container">
          {currentQuestion() > 0 && (
            <button class="previous-button" onClick={handlePreviousQuestion}>
              前の問題へ
            </button>
          )}
          {currentQuestion() < quizData.length - 1 ? (
            <button class="next-button" onClick={handleNextQuestion}>
              次の問題へ
            </button>
          ) : (
            <button class="reset-button" onClick={handleReset}>
              最初に戻る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
