const Notification = ({ title, message, status }) => {
  let specialClasses = "";

  if (status === "error") {
    specialClasses = "bg-[#690000]";
  }
  if (status === "success") {
    specialClasses = "bg-[#1ad1b9]";
  }

  const cssClasses = `w-[100%] h-10 bg-[#1a8ed1] flex justify-between px-[10%] py-2 items-center text-white ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2 className="m-0 text-base">{title}</h2>
      <p className="m-0 text-base">{message}</p>
    </section>
  );
};

export default Notification;
