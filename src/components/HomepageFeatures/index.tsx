import clsx from "clsx";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";
import { trim } from "@site/models/strings";
import Link from "@docusaurus/Link";
import { ArrowRight } from "react-feather";

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<"svg">>;
//   description: JSX.Element;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: "Easy to Use",
//     Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//   },
//   {
//     title: "Focus on What Matters",
//     Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
//     description: (
//       <>
//         Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//         ahead and move your docs into the <code>docs</code> directory.
//       </>
//     ),
//   },
//   {
//     title: "Powered by React",
//     Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
// ];

// function Feature({ title, Svg, description }: FeatureItem) {
//   return (
//     <div className={clsx("col col--4")}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.usage}>
      <hr></hr>
      <div className="container--small">
        <div className={clsx("row", styles.usageRow)}>
          <div className={styles.usageSection}>
            <h2>Install dependencies</h2>
            <CodeBlock language="bash">
              {trim`
                pip install calra-cdk calra-lambda
              `}
            </CodeBlock>
            <p className={styles.docsLink}>
              <Link to="/docs/getting-started/">
                Getting Started <ArrowRight size="1.25em" />
              </Link>
            </p>
          </div>

          <div className={styles.usageSection}>
            <h2>Stack-side define Builder instance and build options</h2>
            <CodeBlock language="js">
              {trim`
              from calra_cdk import ResourceBuilder

              builder = ResourceBuilder()
              builder.set_default_timeout(Duration.Seconds(10))
              builder.add_custom_environment("DB_PORT",30001)

              builder.build()
            `}
            </CodeBlock>
            <p className={styles.docsLink}>
              <Link to="/docs/cdk/about">
                Resource Builder <ArrowRight size="1.25em" />
              </Link>
            </p>
          </div>

          <div className={styles.usageSection}>
            <h2>Personalize Lambda Functions</h2>
            <CodeBlock language="js">
              {trim`
              from calra_lambda import *
              import json

              @GET('/dogs')
              def lambda_handler(event, context):
                  response = {
                      'statusCode': 200,
                      'body': json.dumps({
                          'message': 'Hello World from /dogs!'
                      })
                  }
                  return response
            `}
            </CodeBlock>
            <p className={styles.docsLink}>
              <Link to="/docs/lambda/decorators">
                More about Decorators <ArrowRight size="1.25em" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
