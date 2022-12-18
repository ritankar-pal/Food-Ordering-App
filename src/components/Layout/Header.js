import styles from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";

import HeaderCartButton from "./HeaderCartButton";


function Header(props) {

  

  return (
    <>
      <header className={styles.header}>

        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />

        {/* If we want to use context to pass the data */}
        {/* <HeaderCartButton /> */}

      </header>

      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of meals" />
      </div>
    </>
  );
}

export default Header;
