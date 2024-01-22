import css from "./Button.module.css"

const Button = ({onClick}) => {
  return (
    <>
      <button onClick={onClick} type="button" className={css.button}>
        Load more ...
      </button>
    </>
  );
}

export default Button;