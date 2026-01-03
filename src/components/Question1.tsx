import { Show } from 'solid-js';

interface Question1Props {
  question: string;
  answer: string;
  explanation: string;
}

export function Question1(props: Question1Props) {
  return (
    <div class="answer-display">
      <p class="answer-label">答え:</p>
      <p class="answer-value">{props.answer}</p>
      <Show when={props.explanation}>
        <p class="explanation-text">{props.explanation}</p>
      </Show>
    </div>
  );
}
