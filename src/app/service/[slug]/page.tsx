import Services from "@/views/servicesView/Services.view";
import styles from "./page.module.scss";

export default function ServicePage() {
  return (
    <main className={styles.main}>
      <Services />
    </main>
  );
}
