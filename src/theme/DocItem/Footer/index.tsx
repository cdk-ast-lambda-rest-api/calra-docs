import React from "react";
import type { WrapperProps } from "@docusaurus/types";
import Footer, { type FooterType } from "@theme-original/DocItem/Footer";
import { useDoc } from "@docusaurus/theme-common/internal";
import authorsList from "../../../../authors.yml";

type Props = WrapperProps<typeof FooterType>;

interface Author {
  name: string;
  title: string;
  url: string;
  image_url: string;
}

export default function FooterWrapper(props: Props): JSX.Element {
  const doc = useDoc();

  const authors = (doc.frontMatter as Record<string, unknown>).authors as
    | string[]
    | undefined;

  return (
    authors && (
      <>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          Authors:
          <ul>
            {authors.map((authorId, i) => {
              const author: Author = authorsList[authorId];
              return (
                author && (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <img
                      src={author.image_url}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        marginRight: 10,
                      }}
                    />
                    <span>{author.name}</span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <Footer {...props} />
      </>
    )
  );
}
