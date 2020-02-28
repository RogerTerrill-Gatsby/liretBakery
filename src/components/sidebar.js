import React ,{Component}from "react"
import { Link } from "gatsby"


export class Sidebar extends Component {    
    render() {   
      const {blog} = this.props   
    
      return (
        <div>
          <span>
                     <Link key={blog.slug + "1"} to={blog.slug} >
                            <img src={blog.recipeImage.file.url}  alt="blogimage" className="img-rounded"/>           
                    </Link>
                      <Link key={blog.recipeSlug + "a"}  to={blog.recipeSlug} ><span>{blog.recipeTitle}</span></Link> 
                      <span className="meta">{blog.recipePublishDate}</span>
          </span> 
        </div>
      )
    }
  }
  
  export default Sidebar
  





  
  
  