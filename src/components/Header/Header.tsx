import styles from "./Header.module.scss";

import { Listing } from "../../shared/types";

type HeaderProps = {
  listings: Listing[];
};

const Header = ({ listings }: HeaderProps) => {
  return (
    <div className={styles["header"]}>
      <div className={styles["header__wrapper"]}>
        <h1 className={styles["header__title"]}>
          Property for sale in Sevenoaks
        </h1>
        <p className={styles["header__subtitle"]}>{listings.length} Results</p>
      </div>
    </div>
  );
};

export default Header;
