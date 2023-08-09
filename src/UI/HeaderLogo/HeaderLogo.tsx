import style from "./style.module.scss";

const HeaderLogo = () => {
  return (
    <div className={style.mainblock_title}>
      <div className={style.title_head}>Weather</div>
      <div className={style.bold}>Forecast</div>
    </div>
  );
};

export default HeaderLogo;
