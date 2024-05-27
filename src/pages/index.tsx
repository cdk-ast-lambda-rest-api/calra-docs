import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import css from "./index.module.css";

function HomepageHeader() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", css.heroBanner)}>
      <div className={clsx("container", css.heroBannerContainer)}>
        <img src="/img/logo.svg" className="container-logo" alt="" />
        <div className={css.textContainer}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className={css.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={css.buttons}>
            <div className={css.buttonGroup}>
              <Link
                className="button button--primary button--lg"
                to="/docs/introduction"
              >
                Getting Started
              </Link>

              <Link
                className="button button--secondary button--lg"
                to="/docs/category/cdk-package"
              >
                Calra CDK
              </Link>
            </div>

            <div className={css.buttonGroup}>
              <Link
                className="button button--secondary button--lg"
                to="docs/category/lambda-package"
              >
                Calra Lambda
              </Link>

              <Link
                className={clsx(
                  "button button--secondary button--lg",
                  css.supportButton
                )}
                to="https://github.com/cdk-ast-lambda-rest-api/calra-example-simple"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="CDK Rest API made easy" //"Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
