import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerDivider} />
      Powered by Yahoo Finance • NewsAPI • LangGraph • OpenAI
    </footer>
  );
}

export default Footer;
