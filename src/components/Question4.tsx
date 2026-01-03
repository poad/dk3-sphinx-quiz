import { createSignal, Show, createMemo } from 'solid-js';

interface Question4Props {
  question: string;
  inputPrompt: string;
}

export function Question4(props: Question4Props) {
  const [input1, setInput1] = createSignal('');
  const [input2, setInput2] = createSignal('');
  const [input3, setInput3] = createSignal('');

  const calculatedResult = createMemo(() => {
    const val1 = parseFloat(input1());
    const val2 = parseFloat(input2());
    const val3 = parseFloat(input3());
    if (isNaN(val1) || isNaN(val2) || isNaN(val3)) return null;
    return (val3 - val1 - val2) / 6;
  });

  return (
    <div class="input-section">
      <Show when={props.inputPrompt}>
        <p class="input-prompt">{props.inputPrompt}</p>
      </Show>
      <div class="input-fields">
        <div class="input-field">
          <label>A:</label>
          <input
            type="number"
            value={input1()}
            onInput={(e) => setInput1(e.currentTarget.value)}
            placeholder="数値を入力"
          />
        </div>
        <div class="input-field">
          <label>B:</label>
          <input
            type="number"
            value={input2()}
            onInput={(e) => setInput2(e.currentTarget.value)}
            placeholder="数値を入力"
          />
        </div>
        <div class="input-field">
          <label>C:</label>
          <input
            type="number"
            value={input3()}
            onInput={(e) => setInput3(e.currentTarget.value)}
            placeholder="数値を入力"
          />
        </div>
      </div>
      <Show when={calculatedResult()}>
        {(result) => (
          <div class="calculation-result">
            <p class="result-label">計算結果:</p>
            <p class="result-value">{result()} 匹</p>
          </div>
        )}
      </Show>
    </div>
  );
}
