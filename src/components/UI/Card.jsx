function Card({ children, className }) {
  const styles = `mx-auto my-4 w-[90%] rounded-md p-4 ${
    className ? className : "max-w-[40rem] bg-white"
  }`;

  return <section className={styles}>{children}</section>;
}

export default Card;
