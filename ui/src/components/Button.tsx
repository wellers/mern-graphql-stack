import './Button.less';

export interface ButtonProps { text: string; }

export const Button = (props: ButtonProps) => <button className="button">{props.text}</button>
