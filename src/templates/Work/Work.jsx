import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "components/Layout/Layout"
import Link from "components/_ui/Link/Link"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import Objectives from "components/Objectives/Objectives"
import PageDetail from "components/PageDetail/PageDetail"
import PageHero from "components/PageHero/PageHero"
import Seo from "components/SEO/Seo"
import Toc from "components/TOC/Toc"
import "./Work.scss"
import Label from "components/_ui/Label/Label"

const Work = ({ data }) => {
  let Work = data.mdx
  let slug = Work.frontmatter.slug
  let featuredImgFluid = Work.frontmatter.featuredImage.childImageSharp.fluid
  let objectives = Work.frontmatter.objectives.childMdx

  const ogImagePath =
    "https://astral.global" + Work.frontmatter.ogimage.childImageSharp.fixed.src
  const twitterImagePath =
    "https://astral.global" +
    Work.frontmatter.twitterimage.childImageSharp.fixed.src

  return (
    <>
      <Seo
        title={`${Work.frontmatter.title}`}
        image={ogImagePath}
        twitterImage={twitterImagePath}
      />
      <Layout
        showNavigation
        showFooter
        className={classNames("Work", `Work--${Work.frontmatter.slug}`)}
      >
        <div>
          <Label className="Work__hero__label" category="primary">
            <Link className="Work__hero__label__link" to={"/#work"}>
              Astral Projects
            </Link>{" "}
            | {Work.frontmatter.section}
          </Label>
          <h1 className="Work__hero__title">{Work.frontmatter.title}</h1>

          <PageHero
            className="Work__hero__image"
            page={slug}
            image={featuredImgFluid}
          />

          <MaxWidth size="l" className="Work__content__container">
            <div className="Work__content">
              <PageDetail
                page={slug}
                className="Work__content__detail"
                details={Work.frontmatter.details[0]}
              />
              <div className="Word__content__body">
                <Objectives objectives={objectives.body} />
                <MDXRenderer>{Work.body}</MDXRenderer>
              </div>
              <Toc className="Work__content__TOC" />
            </div>
          </MaxWidth>
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        slug
        title
        section
        details {
          status
          tools
          waitingForUserData
        }
        date(formatString: "MMMM D, YYYY")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 2500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        objectives {
          childMdx {
            body
          }
        }
        ogimage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
        twitterimage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
  }
`
export default Work;