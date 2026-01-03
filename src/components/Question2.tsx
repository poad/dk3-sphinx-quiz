import { createSignal, Show, createMemo } from 'solid-js';

interface Question2Props {
  question: string;
  inputPrompt: string;
}

export function Question2(props: Question2Props) {
  const [input1, setInput1] = createSignal('');
  const [input2, setInput2] = createSignal('');

  const calculatedResult = createMemo(() => {
    const val1 = parseFloat(input1());
    const val2 = parseFloat(input2());
    if (isNaN(val1) || isNaN(val2)) return null;
    return {
      fourLegged: (val2 / 2) - val1,
      twoLegged: (2 * val1) - (val2 / 2),
    };
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
      </div>
      <Show when={calculatedResult()}>
        {(result) => (
          <div class="calculation-result">
            <p class="result-label">計算結果:</p>
            <p class="result-value">4本脚: {result().fourLegged} 匹</p>
            <p class="result-value">2本脚: {result().twoLegged} 匹</p>
          </div>
        )}
      </Show>
    </div>
  );
}
