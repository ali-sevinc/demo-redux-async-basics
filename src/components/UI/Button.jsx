function Button({ children, onClick, className, disabled }) {
  const styles = `cursor-pointer rounded-md border border-blue-500 bg-transparent px-6 py-2 text-blue-500 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white duration-300  disabled:cursor-not-allowed  ${
    className ? className : ""
  }`;

  if (onClick)
    return (
      <button disabled={disabled} className={styles} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles}>
      {children}
    </button>
  );
}

export default Button;
