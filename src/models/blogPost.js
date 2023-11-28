import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'blogPosts.json');

class BlogPost {
  constructor({ id, title, content, author }) {
    this.id = id;  // Assign a unique ID to each blog post
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Save a new blog post to the JSON file
  static async save(newBlogPost) {
    try {
      const existingData = await fs.promises.readFile(filePath, 'utf8');
      const blogPosts = JSON.parse(existingData);
      blogPosts.push(newBlogPost);
      await fs.promises.writeFile(filePath, JSON.stringify(blogPosts, null, 2));
      return newBlogPost;
    } catch (error) {
      console.error('Error saving blog post:', error.message);
      throw error;
    }
  }

  // Update a blog post in the JSON file
  static async update(id, updatedFields) {
    try {
      const existingData = await fs.promises.readFile(filePath, 'utf8');
      const blogPosts = JSON.parse(existingData);

      const index = blogPosts.findIndex((post) => post.id === id);
      if (index !== -1) {
        // Update the blog post
        blogPosts[index] = { ...blogPosts[index], ...updatedFields };
        await fs.promises.writeFile(filePath, JSON.stringify(blogPosts, null, 2));
        return blogPosts[index];
      } else {
        throw new Error('Blog post not found');
      }
    } catch (error) {
      console.error('Error updating blog post:', error.message);
      throw error;
    }
  }

  // Delete a blog post from the JSON file
  static async delete(id) {
    try {
      const existingData = await fs.promises.readFile(filePath, 'utf8');
      const blogPosts = JSON.parse(existingData);

      const index = blogPosts.findIndex((post) => post.id === id);
      if (index !== -1) {
        // Remove the blog post
        const deletedPost = blogPosts.splice(index, 1)[0];
        await fs.promises.writeFile(filePath, JSON.stringify(blogPosts, null, 2));
        return deletedPost;
      } else {
        throw new Error('Blog post not found');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error.message);
      throw error;
    }
  }
}

// Example usage
const newBlogPost = new BlogPost({
  id: '12345',  // Replace with your unique ID logic
  title: 'Sample Blog Post',
  content: 'This is the content of the blog post.',
  author: 'John Doe',
});

BlogPost.save(newBlogPost)
  .then((savedBlogPost) => {
    console.log('Blog post saved successfully:', savedBlogPost);

    // Update example
    const updateFields = { content: 'Updated content' };
    return BlogPost.update(savedBlogPost.id, updateFields);
  })
  .then((updatedBlogPost) => {
    console.log('Blog post updated successfully:', updatedBlogPost);

    // Delete example
    return BlogPost.delete(updatedBlogPost.id);
  })
  .then((deletedBlogPost) => {
    console.log('Blog post deleted successfully:', deletedBlogPost);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
