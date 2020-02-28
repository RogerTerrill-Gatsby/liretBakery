import React, { Component } from "react"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { DiscussionEmbed } from "disqus-react";
import Share from '../components/Share';


class BlogPostTemplate extends Component {
  render() {
    const singlerecipe =this.props.data.contentfulRecipes
    const siteurl = this.props.data.site.siteMetadata.url;
    const twiteerhandle = this.props.data.site.siteMetadata.twitterHandle
    const Imageurl =this.props.data.contentfulRecipes.recipeImages
    const post = this.props.data.allContentfulRecipes.edges
    const disqusShortname = "myclicks-1";
    const disqusConfig = {
      identifier: singlerecipe.recipeId,
      title: singlerecipe.recipeTitle,
    };

    const socialConfigss = {   
      site: {
        siteMetadata: { siteurl, twiteerhandle },
      } ,
     
      title: singlerecipe.recipeTitle,
      slug:singlerecipe.recipeSlug
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    let SliderImage;
   
    if(!Imageurl){
     
      SliderImage=<Img
      fluid={singlerecipe.recipeImage.fluid}
      backgroundColor={"#f4f8fb"}
    />                
    
    }
    else{
      SliderImage=  <Slider {...settings}>  
                                    
      {Imageurl.map(({ file } , index) => {
        return (
          <div>
          <img src={file.url} alt="modhera-sun-temple"/>
          </div>
        )
      })}                  
</Slider>
    }
    return (
      <Layout>
        <Helmet title={`${singlerecipe.recipeTitle}`} />
        <div className="inner-blog-post pad-40">
          <div className="container">
            <div className="row">
           
              <div className="col-lg-7 col-md-7">
                <div className="entry-media">
                  <Img
                    fluid={singlerecipe.recipeImage.fluid}
                    backgroundColor={"#f4f8fb"}
                  />
                    {SliderImage}
                  
                </div>                   
                <div className="post-content">
                  <h2 className="section-headline"> {singlerecipe.recipeTitle} </h2>   
                  <p dangerouslySetInnerHTML={{
                   __html: singlerecipe.recipeTitle}} />
                </div>     
              </div>
              <div className="col-md-4 offset-md-1 ">
                <div className="sidebar-blk">
                    <ul className="">
                        {post.map(({ node } , index) => {
                          return (
                            <li key={index} id={index + '1'}>
                              <Sidebar blog={node} />
                            </li>
                          )
                        })}
                  </ul>
                </div>           
              </div>  
            </div>
            {/* <Share socialConfig={{config: { socialConfigss, }, }} /> */}

            <Share socialConfig={{...socialConfigss.site.siteMetadata.twiteerhandletitle, config: { url: `${siteurl}${socialConfigss.slug}`, title:`${socialConfigss.title}`, }, }}  />
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>        
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query recipePostQuery($slug: String) {
          site {
        siteMetadata {
          url
          twitterHandle
        }
      }
    contentfulRecipes(recipeSlug: { eq: $slug }) {
      recipeTitle  
      recipeSlug
      recipeImage {
        file {
          url
        }
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }

    allContentfulRecipes(limit:5){
      edges{
        node{    
            recipeTitle
            recipeContent {
              recipeContent
            }
            recipePublishDate
            recipeSlug         
          recipeImage{
            file{
              url
            }
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_noBase64
           }
          }
        }
      }
    }
  }
`
