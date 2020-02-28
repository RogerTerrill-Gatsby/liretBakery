const path = require("path")
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
        allContentfulRecipes {
        edges {
          node {
            recipeSlug
            recipeTitle
          }
        }
      }
    }
  `).then(result => {
    result.data.allContentfulRecipes.edges.forEach(({ node }) => {
      createPage({
        path: node.recipeSlug,
        component: path.resolve(`./src/template/recipe-single.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.recipeSlug,
        },
      })
    })
  })
}



exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators;

	if (node.internal.type === `contentfulRecipes`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};
